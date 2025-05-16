import React, { useState } from 'react';
import { View } from 'react-native';
import Tower from '../../../components/tower';
import HappyBackground from '../../../components/HappyBackground'; 

const GameContainer = () => {
  const [selectedTower, setSelectedTower] = useState(null);
  const [towers, setTowers] = useState([
    [5, 4 , 3, 2, 1],  // Torre 0
    [],         // Torre 1
    []          // Torre 2
  ]);

  const handleSelectTower = (towerIndex) => {
    setSelectedTower(towerIndex);
  };

  const handleMoveDisc = (targetTowerIndex) => {
    let discToMove = null;
    if (selectedTower === null) return;
  
    const newTowers = [...towers]; // copia de las torres 
    const diskFirstTower = newTowers[selectedTower][newTowers[selectedTower].length - 1];
    const diskSecondTower = newTowers[targetTowerIndex][newTowers[targetTowerIndex].length - 1];
console.log(diskFirstTower, diskSecondTower);
    if(diskFirstTower < diskSecondTower || diskSecondTower === undefined){
      discToMove = newTowers[selectedTower].pop();
      newTowers[targetTowerIndex].push(discToMove);
      setTowers(newTowers);
      setSelectedTower(null);
    }  else {
      setSelectedTower(null);
    }
   
  };

  return (
    <HappyBackground>
    <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
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