import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Platform, Animated, Easing, StyleSheet } from 'react-native';
import Tower from '../../../components/lesson1/tower';
import EpicFinalBackground from '../../../components/lesson1/Background3';
import { db, auth } from '../../../firebase/firebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';


const isWeb = Platform.OS === 'web';
let ExpoAudio;
if (!isWeb) {
  ExpoAudio = require('expo-av').Audio;
}

const GameContainer = ({ navigation, route }) => {
  const [selectedTower, setSelectedTower] = useState(null);
  const [counter, setCounter] = useState(0);
  const [won, setWon] = useState(false);
  const selectSoundRef = useRef(null);
  const dropSoundRef = useRef(null);
  const wrongSoundRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const [towers, setTowers] = useState([
    [5 , 4, 3, 2, 1],
    [],
    []
  ]);

  // Cargar sonidos existentes
  useEffect(() => {
    let isMounted = true;

    const loadSounds = async () => {
      try {
        const { sound: selectSound } = await ExpoAudio.Sound.createAsync(
          require('../../../assets/audio/select.mp3')
        );
        const { sound: dropSound } = await ExpoAudio.Sound.createAsync(
          require('../../../assets/audio/drop.mp3')
        );
        const { sound: wrongSound } = await ExpoAudio.Sound.createAsync(
          require('../../../assets/audio/wrong.mp3')
        );

        if (isMounted) {
          selectSoundRef.current = selectSound;
          dropSoundRef.current = dropSound;
          wrongSoundRef.current = wrongSound;
          winSoundRef.current = winSound;

        }
      } catch (error) {
        console.error('Error al cargar sonidos:', error);
      }
    };

    if (!isWeb) loadSounds();

    return () => {
      isMounted = false;
      if (!isWeb) {
        selectSoundRef.current?.unloadAsync().catch(e => console.warn("Error al descargar select:", e));
        dropSoundRef.current?.unloadAsync().catch(e => console.warn("Error al descargar drop:", e));
        wrongSoundRef.current?.unloadAsync().catch(e => console.warn("Error al descargar wrong:", e));
      }
    };
  }, []);

  const playSelectSound = async () => {
    try {
      if (isWeb) {
        const audio = new window.Audio(require('../../../assets/audio/select.mp3'));
        await audio.play();
      } else if (selectSoundRef.current) {
        await selectSoundRef.current.replayAsync();
      }
    } catch (error) {
      console.error("Error al reproducir sonido:", error);
    }
  };

  const playDropSound = async () => {
    try {
      if (isWeb) {
        const audio = new window.Audio(require('../../../assets/audio/drop.mp3'));
        await audio.play();
      } else if (dropSoundRef.current) {
        await dropSoundRef.current.replayAsync();
      }
    } catch (error) {
      console.error("Error al reproducir sonido:", error);
    }
  };

  const playWrongSound = async () => {
    try {
      if (isWeb) {
        const audio = new window.Audio(require('../../../assets/audio/wrong.mp3'));
        await audio.play();
      } else if (wrongSoundRef.current) {
        await wrongSoundRef.current.replayAsync();
      }
    } catch (error) {
      console.error("Error al reproducir sonido:", error);
    }
  };

  const startWinAnimation = () => {
    // Animación de pulso para el mensaje de victoria
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      ]),
      { iterations: 4 }
    ).start();

    // Animación de aparición
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  };

  const checkWinCondition = (newTowers) => {
    return newTowers[1].length === 5  || newTowers[2].length === 5;
  };

  const handleSelectTower = async (towerIndex) => {
    if (won) return;
    
    setCounter(prev => prev + 1);
    await playSelectSound();
    setSelectedTower(towerIndex);
  };
  const markLessonCompletedAndRedirect = async () => {
  try {
    const lessonId = route.params?.lessonId || 'lesson3';
    const lessonDocRef = doc(db, 'lessons', lessonId);
    const lessonSnap = await getDoc(lessonDocRef);
    const alreadyCompleted = lessonSnap.exists() ? lessonSnap.data().completed : false;

    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return;
    const userData = userSnap.data();

    const currentXp = userData.xp || 0;
    let xpEarned = alreadyCompleted ? 500 : 1000;

    const updates = {
      xp: currentXp + xpEarned
    };

    if (!alreadyCompleted) {
      updates.completed = true;
      await updateDoc(lessonDocRef, { completed: true });

      // Cálculo de streak si es PRIMERA VEZ que la completa
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      const lastActivity = userData.lastActivity || null;
      const currentStreak = userData.streak || 0;

      let newStreak = 1;
      if (lastActivity) {
        const lastDate = new Date(lastActivity);
        const diffTime = today.getTime() - lastDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) newStreak = currentStreak + 1;
        else if (diffDays === 0) newStreak = currentStreak;
      }

      updates.streak = newStreak;
      updates.lastActivity = todayStr;
    }

    await updateDoc(userRef, updates);

    setTimeout(() => {
      navigation.navigate('main');
    }, 1500);

  } catch (error) {
    console.error("Error al actualizar progreso o XP:", error);
  }
};


  const handleMoveDisc = async (targetTowerIndex) => {
    if (won || selectedTower === null) return;

    const newTowers = [...towers];
    const fromDisc = newTowers[selectedTower].at(-1);
    const toDisc = newTowers[targetTowerIndex].at(-1);
    
    if (fromDisc < toDisc || toDisc === undefined) {
      await playDropSound();
      newTowers[targetTowerIndex].push(newTowers[selectedTower].pop());
      setTowers(newTowers);
      
      if (checkWinCondition(newTowers)) {
        setWon(true);
        startWinAnimation();
        markLessonCompletedAndRedirect();
      }
    } else if (fromDisc === toDisc) {
      return;
    } else {
      await playWrongSound();
    }

    setSelectedTower(null);
  };

  return (
    <EpicFinalBackground>
      {won && (
        <Animated.View 
          style={[
            styles.winContainer,
            { 
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }] 
            }
          ]}
        >
          <Text style={styles.winText}>¡Felicidades!</Text>
          <Text style={styles.winSubText}>Completado en {counter} movimientos</Text>
        </Animated.View>
      )}
      
      <Text style={styles.counterText}>Movimientos: {counter}</Text>
      <View style={styles.towersContainer}>
        {towers.map((discs, index) => (
          <Tower
            key={index}
            discs={discs}
            towerIndex={index}
            selectedTower={selectedTower}
            onSelectTower={handleSelectTower}
            onMoveDisc={handleMoveDisc}
          />
        ))}
      </View>
    </EpicFinalBackground>
  );
};

const styles = StyleSheet.create({
  counterText: {
    color: 'white', 
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  towersContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width: '100%'
  },
  winContainer: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 100
  },
  winText: {
    color: 'gold',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10
  },
  winSubText: {
    color: 'white',
    fontSize: 20
  }
});

export default GameContainer;