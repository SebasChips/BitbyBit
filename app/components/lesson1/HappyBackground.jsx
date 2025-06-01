import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const HappyBackground = ({ children }) => {
  return (
    <View style={styles.outerContainer}>
    <LinearGradient
      colors={['#0f2027', '#203a43', '#2c5364']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Estrellas */}
      <View style={styles.starField}>
        {[...Array(50)].map((_, i) => (
          <View 
            key={i}
            style={[
              styles.star,
              {
                top: Math.random() * height,
                left: Math.random() * width,
                opacity: Math.random(),
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
              }
            ]}
          />
        ))}
      </View>

      {/* Montañas */}
      <View style={[styles.mountain, styles.mountainFar]} />
      <View style={[styles.mountain, styles.mountainMid]} />
      <View style={[styles.mountain, styles.mountainClose]} />

      {/* Lago */}
      <View style={styles.lake}>
        <LinearGradient
          colors={['rgba(64, 164, 223, 0.3)', 'rgba(32, 58, 67, 0.7)']}
          style={styles.lakeSurface}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </View>

      {/* Área de contenido (torres) */}
      <View style={styles.contentArea}>
        {children}
      </View>

      {/* Suelo con efecto de neblina */}
      <LinearGradient
        colors={['rgba(15, 32, 39, 0)', 'rgba(15, 32, 39, 0.8)']}
        style={styles.groundFog}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
    </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    position: 'relative', 
  },
  container: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  starField: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  star: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 50,
  },
  mountain: {
    position: 'absolute',
    bottom: height * 0.35,
    width: '100%',
    borderLeftWidth: width/2,
    borderRightWidth: width/2,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  mountainFar: {
    borderBottomWidth: height * 0.3,
    borderBottomColor: '#1a3a4a',
    zIndex: 1,
  },
  mountainMid: {
    borderBottomWidth: height * 0.4,
    borderBottomColor: '#24495d',
    bottom: height * 0.3,
    zIndex: 2,
  },
  mountainClose: {
    borderBottomWidth: height * 0.5,
    borderBottomColor: '#2c5364',
    bottom: height * 0.25,
    zIndex: 3,
  },
  lake: {
    position: 'absolute',
    bottom: height * 0.25,
    width: '100%',
    height: height * 0.1,
    zIndex: 4,
  },
  lakeSurface: {
    width: '100%',
    height: '100%',
  },
 contentArea: {  
    flex: 1,
    width: '100%',
    zIndex: 15,
    justifyContent: 'flex-start',
    paddingTop: 60,
    paddingBottom: 20,
  },
  groundFog: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.4,
    zIndex: 6,
  },
});

export default HappyBackground;