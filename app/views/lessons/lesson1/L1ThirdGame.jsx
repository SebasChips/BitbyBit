  import React, { useEffect, useState, useRef } from 'react';
  import { View, Text, Platform } from 'react-native';
  import Tower from '../../../components/lesson1/tower';
  import HappyBackground from '../../../components/lesson1/HappyBackground';

  const isWeb = Platform.OS === 'web';
  let ExpoAudio;
  if (!isWeb) {
    ExpoAudio = require('expo-av').Audio;
  }

  const GameContainer = () => {
    const [selectedTower, setSelectedTower] = useState(null);
    const [counter, setCounter] = useState(0);
    const selectSoundRef = useRef(null);
    const dropSoundRef = useRef(null);
    const wrongSoundRef = useRef(null);

    const [towers, setTowers] = useState([
      [5 , 4, 3, 2, 1],
      [],
      []
    ]);

    // Cargar sonido en móvil
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
          require('../../../assets/audio/drop.mp3')
        );
        

        if (isMounted) {
          selectSoundRef.current = selectSound;
          dropSoundRef.current = dropSound;
          wrongSoundRef.current = wrongSound;
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

    const handleSelectTower = async (towerIndex) => {
      setCounter(prev => prev + 1);
      await playSelectSound();
      setSelectedTower(towerIndex);
    };

    const handleMoveDisc = async (targetTowerIndex) => {
      if (selectedTower === null) return;

      const newTowers = [...towers];
      const fromDisc = newTowers[selectedTower].at(-1);
      const toDisc = newTowers[targetTowerIndex].at(-1);
      if (fromDisc < toDisc || toDisc === undefined) {
        await playDropSound();
        newTowers[targetTowerIndex].push(newTowers[selectedTower].pop());
        setTowers(newTowers);
      }else if(fromDisc === toDisc){
        return;
      }else {
        await playWrongSound();
      }

      setSelectedTower(null);
    };

    return (
      <HappyBackground>
        <Text style={{ color: 'white', fontSize: 50 }}>Movimientos: {counter}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
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

  export default GameContainer;
