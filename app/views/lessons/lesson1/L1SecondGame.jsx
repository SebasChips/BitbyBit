import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Platform, Animated, Easing, StyleSheet, Modal, TouchableOpacity, Dimensions } from 'react-native';
import Tower from '../../../components/lesson1/tower';
import VibrantBackground from '../../../components/lesson1/Background2';
import { db, auth } from '../../../firebase/firebaseConfig';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { Video } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import ConfettiCannon from 'react-native-confetti-cannon';

const isWeb = Platform.OS === 'web';
const windowHeight = Dimensions.get('window').height;
let ExpoAudio;
if (!isWeb) {
  ExpoAudio = require('expo-av').Audio;
}

const SecondGame = ({ navigation, route }) => {
  //torres
  const [selectedTower, setSelectedTower] = useState(null);
  const [counter, setCounter] = useState(0);
  const [won, setWon] = useState(false);

  //sonidos
  const selectSoundRef = useRef(null);
  const dropSoundRef = useRef(null);
  const wrongSoundRef = useRef(null);
  const winSoundRef = useRef(null);

  //Animacion
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const positionAnim = useRef(new Animated.Value(-100)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const confettiRef = useRef(null);
  const starScaleAnims = useRef([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1)
  ]).current;

  //Video
  const [visible, setVisible] = useState(false);
  const video = useRef(null);

  const [towers, setTowers] = useState([
    [4, 3, 2, 1],
    [],
    []
  ]);


  useEffect(() => {
    let isMounted = true;
    setVisible(true); 

    const loadSounds = async () => {
      try {
        const { sound: selectSound } = await ExpoAudio.Sound.createAsync(require('../../../assets/audio/select.mp3'));
        const { sound: dropSound } = await ExpoAudio.Sound.createAsync(require('../../../assets/audio/drop.mp3'));
        const { sound: wrongSound } = await ExpoAudio.Sound.createAsync(require('../../../assets/audio/wrong.mp3'));
        const { sound: winSound } = await ExpoAudio.Sound.createAsync(require('../../../assets/audio/win.mp3'));


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
        winSoundRef.current?.unloadAsync().catch(e => console.warn("Error al descargar win:", e));
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

  const playWinSound = async () => {
    try {
      if (isWeb) {
        const audio = new window.Audio(require('../../../assets/audio/win.mp3'));
        await audio.play();
      } else if (winSoundRef.current) {
        await winSoundRef.current.replayAsync();
      }
    } catch (error) {
      console.error("Error al reproducir sonido:", error);
    }
  };

  const startStarAnimation = () => {
    // Animación de estrellas que saltan
    const createStarAnimation = (index) => {
      return Animated.sequence([
        Animated.timing(starScaleAnims[index], {
          toValue: 1.5,
          duration: 300,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true
        }),
        Animated.timing(starScaleAnims[index], {
          toValue: 1,
          duration: 300,
          easing: Easing.bounce,
          useNativeDriver: true
        }),
        Animated.delay(index * 200)
      ]);
    };

    Animated.loop(
      Animated.stagger(100, [
        createStarAnimation(0),
        createStarAnimation(1),
        createStarAnimation(2)
      ]),
      { iterations: 3 }
    ).start();
  };

  const startWinAnimation = () => {
    // Animación de entrada desde arriba
    Animated.parallel([
      Animated.timing(positionAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.elastic(1)),
            useNativeDriver: true
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 1500,
            easing: Easing.inOut(Easing.elastic(1)),
            useNativeDriver: true
          })
        ])
      ).start(),
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.95,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
          })
        ])
      ).start()
    ]).start();

    // Animación de estrellas
    startStarAnimation();

    // Disparar confeti
    if (confettiRef.current) {
      confettiRef.current.start();
    }
  };

  const checkWinCondition = (newTowers) => {
    return newTowers[2].length === 4;
  };

  const handleSelectTower = async (towerIndex) => {
    if (won) return;

    setCounter(prev => prev + 1);
    await playSelectSound();
    setSelectedTower(towerIndex);
  };



const markLessonCompletedAndRedirect = async () => {
  try {
    const lessonId ='lesson2';

    const userId = auth.currentUser?.uid;
    if (!userId) return;
    const lessonProgressRef = doc(db, 'users', userId, 'lessonsProgress', lessonId);
    const lessonSnap = await getDoc(lessonProgressRef);
    const alreadyCompleted = lessonSnap.exists() ? lessonSnap.data().completed : false;

    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) return;
    const userData = userSnap.data();

    const currentXp = userData.xp || 0;
    const xpEarned = alreadyCompleted ? 500 : 1000;

    const updates = {
      xp: currentXp + xpEarned
    };

    if (!alreadyCompleted) {
      //  Marcar como completado en la subcolección lessonProgress
      await updateDoc(lessonProgressRef, { completed: true });


      //  Lógica de racha (streak)
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


      // Agregar nueva lección
    const lesson3Ref = doc(db, 'users', userId, 'lessonsProgress', 'lesson3');
    const lesson3Snap = await getDoc(lesson3Ref);      
    if (!lesson3Snap.exists()) {
        await setDoc(lesson3Ref, {
          attempts: 0,
          completed: false,
          levelLesson: 3,
          score: 0
        });
      }
    }

    await updateDoc(userRef, updates);

    setTimeout(() => {
      navigation.navigate('Main');
    }, 3000);

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
        await playWinSound();
        setWon(true);
        startWinAnimation();
        markLessonCompletedAndRedirect();
      }
    } else if (fromDisc !== toDisc) {


      await playWrongSound();
    }

    setSelectedTower(null);
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-15deg', '15deg']
  });

  return (
    <VibrantBackground>
      <Modal visible={visible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.videoContainer}>
              {isWeb ? (
                <video
                  src={require('../../../assets/video/firstvideo.mp4')}
                  style={styles.webVideo}
                  controls
                  shouldPlay
                  autoPlay
                  loop={false}
                />
              ) : (
                <Video
                  ref={video}
                  source={require('../../../assets/video/firstvideo.mp4')}
                  style={styles.video}
                  resizeMode="contain"
                  shouldPlay
                  isLooping={false}
                  useNativeControls
                />
              )}
            </View>

            <View style={styles.instructionsBox}>
              <Text style={styles.instructionsTitle}>¡Bienvenido al Juego de las Torres de Hanoi!</Text>
              
              <View style={styles.instructionItem}>
                <View style={styles.instructionIcon}>
                  <AntDesign name="Trophy" size={20} color="#FFD700" />
                </View>
                <Text style={styles.instructionText}>
                  <Text style={styles.instructionBold}>Objetivo:</Text> Mueve todos los discos de la torre izquierda a la torre derecha
                </Text>
              </View>
              
              <View style={styles.instructionItem}>
                <View style={styles.instructionIcon}>
                  <AntDesign name="warning" size={20} color="#FF6B6B" />
                </View>
                <Text style={styles.instructionText}>
                  <Text style={styles.instructionBold}>Regla 1:</Text> No puedes colocar un disco grande sobre uno pequeño
                </Text>
              </View>
              
              <View style={styles.instructionItem}>
                <View style={styles.instructionIcon}>
                  <AntDesign name="question" size={20} color="#4ECDC4" />
                </View>
                <Text style={styles.instructionText}>
                  <Text style={styles.instructionBold}>Regla 2:</Text> Solo puedes mover un disco a la vez
                </Text>
              </View>

              <TouchableOpacity 
                style={styles.startButton}
                onPress={() => setVisible(false)}
              >
                <Text style={styles.startButtonText}>¡Empezar Juego!</Text>
                <AntDesign name="play" size={20} color="white" style={styles.buttonIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {won && (
        <View style={styles.winContainer}>
          <Animated.View style={[
            styles.winContent, 
            {
              opacity: opacityAnim,
              transform: [
                { translateY: positionAnim },
                { scale: scaleAnim },
                { rotate: rotateInterpolate }
              ]
            }
          ]}>
            <AntDesign name="trophy" size={80} color="#FFD700" style={styles.trophyIcon} />
            <Text style={styles.winText}>¡Felicidades!</Text>
            <Text style={styles.winSubText}>Has completado el puzzle en {counter} movimientos</Text>
            <Text style={styles.winXpText}>+ XP ganados</Text>
            <View style={styles.starsContainer}>
              <Animated.View style={{ transform: [{ scale: starScaleAnims[0] }] }}>
                <AntDesign name="star" size={30} color="#FFD700" />
              </Animated.View>
              <Animated.View style={{ transform: [{ scale: starScaleAnims[1] }], marginHorizontal: 10 }}>
                <AntDesign name="star" size={40} color="#FFD700" />
              </Animated.View>
              <Animated.View style={{ transform: [{ scale: starScaleAnims[2] }] }}>
                <AntDesign name="star" size={30} color="#FFD700" />
              </Animated.View>
            </View>
          </Animated.View>
          <ConfettiCannon
            ref={confettiRef}
            count={200}
            origin={{x: -10, y: 0}}
            explosionSpeed={500}
            fallSpeed={3000}
            fadeOut={true}
          />
        </View>
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
    </VibrantBackground>
  );
};

const styles = StyleSheet.create({
  counterText: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3
  },
  towersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10
  }, 
  winContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  winContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    width: '80%',
    maxWidth: 400,
  },
  trophyIcon: {
    marginBottom: 10,
  },
  winText: {
    fontSize: 32,

    fontWeight: 'bold',
    color: '#4a6da7',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2
  },
  winSubText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center'
  },
  winXpText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 10,
  },
  closeModalButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16/9,
    backgroundColor: 'black',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
    ...(isWeb && {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }),
  },
  video: {
    width: '100%',
    height: '100%',
    ...(!isWeb && {
      alignSelf: 'center',
    }),
  },
  webVideo: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  instructionsBox: {
    padding: 25,
    paddingTop: 15
  },
  instructionsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a6da7',
    marginBottom: 20,
    textAlign: 'center',
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  instructionIcon: {
    width: 30,
    alignItems: 'center',
    marginRight: 10
  },
  instructionText: {
    fontSize: 16,
    color: '#555',
    flex: 1,
    lineHeight: 22
  },
  instructionBold: {
    fontWeight: 'bold',
    color: '#333'
  },
  startButton: {
    backgroundColor: '#4a6da7',
    padding: 15,
    borderRadius: 12,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10
  },
  buttonIcon: {
    marginLeft: 5
  }
});

export default SecondGame;