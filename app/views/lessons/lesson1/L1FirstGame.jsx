import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Platform, Animated, Easing, Modal, TouchableOpacity } from 'react-native';
import Tower from '../../../components/lesson1/tower';
import HappyBackground from '../../../components/lesson1/HappyBackground';
import { lessonComplete } from "../../../controllers/lessons";
import { Video } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import ConfettiCannon from 'react-native-confetti-cannon';
import { getStyles } from '../../../constants/gamesLesson1';
import {startWinAnimation} from '../../../components/lesson1/Animations';
const isWeb = Platform.OS === 'web';
const styles = getStyles(Platform.OS);

let ExpoAudio;
if (!isWeb) {
  ExpoAudio = require('expo-av').Audio;
}

const FirstGame = ({ navigation }) => {
  //torres
  const [selectedTower, setSelectedTower] = useState(null);
  const [counter, setCounter] = useState(0);
  const [won, setWon] = useState(false);
  const [xp, setXp]=  useState(0);

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
    [3, 2, 1],
    [],
    []
  ]);
  
  const RestartLevel = () => {
    navigation.replace('firstgame');
  }

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

 
  const checkWinCondition = (newTowers) => {
    return newTowers[2].length === 3;
  };

  const handleSelectTower = async (towerIndex) => {
    if (won) return;

    setCounter(prev => prev + 1);
    await playSelectSound();
    setSelectedTower(towerIndex);
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

      const winAnimation = startWinAnimation(
        positionAnim,    
        opacityAnim,      
        rotateAnim,      
        scaleAnim,       
        starScaleAnims,  
        confettiRef      
      );

      winAnimation.start();
      if (confettiRef.current) {
        confettiRef.current.start();
      }

      (async () => {
        await playWinSound();
        const xpEarned = await lessonComplete('lesson1', 'lesson2');
        setXp(xpEarned);
      })();

      setTimeout(() => {
        navigation.navigate('Main');
      }, 3000);
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
    <HappyBackground>
      <TouchableOpacity 
        onPress={RestartLevel} 
        style={styles.restartButtonContainer}
        activeOpacity={0.7}
      >
        <AntDesign name="reload1" size={24} color="white" />
        <Text style={styles.restartButtonText}>Reiniciar</Text>
      </TouchableOpacity>


      <TouchableOpacity 
        onPress={() => navigation.navigate("Main")}
        style={styles.backButtonContainer}

        activeOpacity={0.7}
      >
        <AntDesign name="stepbackward" size={24} color="white" />
        <Text style={styles.restartButtonText}>Regresar</Text>
      </TouchableOpacity>
     

      <Modal visible={visible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.videoContainer}>
              {isWeb ? (
                <video
                  src={require('../../../assets/video/firstvideo.mp4')}
                  style={styles.webVideo}
                  controls
                  autoPlay
                  loop={false}
                />
              ) : (
                <Video
                  ref={video}
                  source={require('../../../assets/video/firstvideo.mp4')}
                  style={styles.video}
                  resizeMode="contain"
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
            <AntDesign name="Trophy" size={80} color="#FFD700" style={styles.trophyIcon} />
            <Text style={styles.winText}>¡Felicidades!</Text>
            <Text style={styles.winSubText}>Lo has completado en solo {counter} movimientos</Text>
            <Text style={styles.winXpText}>+{xp} XP ganados</Text>
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
    </HappyBackground>
  );
};


export default FirstGame;