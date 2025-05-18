import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const Tower = ({ discs = [], towerIndex, selectedTower, onSelectTower, onMoveDisc }) => {
  const handlePress = () => {
    if (selectedTower === null) {
      if (discs.length > 0) {
        onSelectTower(towerIndex);
      }
    } else {
      onMoveDisc(towerIndex);
    }
  };

  // Colores para los discos
  const discColors = ['#35546F', '#B0BEC5', '#D9EFFF'];

  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
      style={styles.towerContainer}
    >
      {/* Base y poste con efecto de selección */}
      <View style={[
        styles.towerBase,
        selectedTower === towerIndex && styles.selectedTower
      ]} />
      
      <View style={[
        styles.towerPole,
        selectedTower === towerIndex && styles.selectedTower
      ]} />
      
      {/* Discos con efecto de selección */}
      <View style={styles.discsContainer}>
        {discs.slice().reverse().map((discSize, index) => (
          <View
            key={index}
            style={[
              styles.disc,
              {
                width: discSize * 30 + 20,
                backgroundColor: discColors[discSize - 1] || '#4CAF50',
                zIndex: discs.length - index,
                elevation: discs.length - index,
                opacity: selectedTower === towerIndex ? 0.6 : 1,
                marginVertical: 4,
              }
            ]}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  towerContainer: {
    width: 120,
    height: 300,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 10,
    position: 'relative',
  },
  towerBase: {
    width: 120,
    height: 15,
    backgroundColor: '#5D4037',
    borderRadius: 5,
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
  towerPole: {
    width: 10,
    height: '70%',
    backgroundColor: '#5D4037',
    position: 'absolute',
    bottom: 15,
    borderRadius: 5,
    zIndex: 1,
  },
  discsContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 25,
    zIndex: 2,
  },
  disc: {
    height: 45,
    borderRadius: 12,
    marginVertical: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  selectedTower: {
    opacity: 0.6,
  },
});

export default Tower;