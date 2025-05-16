import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';

const Tower = ({ discs = [], towerIndex, selectedTower, onSelectTower, onMoveDisc }) => {
  const handlePress = () => {
    if (selectedTower === null) {
      // Primera selección: seleccionar esta torre si tiene discos
      if (discs.length > 0) {
        onSelectTower(towerIndex);
      }
    } else {
      // Segunda selección: intentar mover el disco
      onMoveDisc(towerIndex);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{ 
        width: 100, // Ancho suficiente
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        opacity: selectedTower === towerIndex ? 0.6 : 1,
        
      }}>
        {discs.slice().reverse().map((discSize, index) => (
          <View
            key={index}
            style={{
              width: discSize * 80,
              height: 50,
              backgroundColor: 'white',
              marginVertical: 2,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: '#734f47'
            }}
          />
        ))}
        <View
          style={{
            width: 4,
            height: '100%',
            backgroundColor: '#734f47',
            position: 'absolute',
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Tower;