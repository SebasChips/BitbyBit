import React from 'react';
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const VibrantBackground = ({ children }) => {
  // Animaciones para los elementos dinámicos
  const pulseAnim = React.useRef(new Animated.Value(0)).current;
  const sunAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Animación de pulso para el sol
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      ])
    ).start();

    // Animación de rotación para el sol
    Animated.loop(
      Animated.timing(sunAnim, {
        toValue: 1,
        duration: 20000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
  }, []);

  const sunScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05]
  });

  const sunRotation = sunAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.outerContainer}>
      <LinearGradient
        colors={['#FF512F', '#DD2476', '#8A2BE2']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Sol animado */}
        <Animated.View style={[
          styles.sun, 
          { 
            transform: [
              { scale: sunScale },
              { rotate: sunRotation }
            ] 
          }
        ]}>
          <LinearGradient
            colors={['#FFD700', '#FF8C00']}
            style={styles.sunInner}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
        </Animated.View>

        {/* Rayos de sol */}
        <View style={styles.sunRays}>
          {[...Array(12)].map((_, i) => (
            <Animated.View 
              key={i}
              style={[
                styles.sunRay,
                { 
                  transform: [
                    { rotate: `${i * 30}deg` },
                    { translateY: -50 }
                  ] 
                }
              ]}
            />
          ))}
        </View>

        {/* Nubes animadas */}
        <View style={styles.cloudsContainer}>
          {[...Array(5)].map((_, i) => (
            <Animated.View 
              key={i}
              style={[
                styles.cloud,
                {
                  left: Math.random() * width,
                  top: Math.random() * (height * 0.3),
                  opacity: 0.7 + Math.random() * 0.3,
                  transform: [{
                    translateX: pulseAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, (Math.random() - 0.5) * 20]
                    })
                  }]
                }
              ]}
            />
          ))}
        </View>

        {/* Montañas vibrantes */}
        <View style={[styles.mountain, styles.mountainFar]} />
        <View style={[styles.mountain, styles.mountainMid]} />
        <View style={[styles.mountain, styles.mountainClose]} />

        {/* Río luminoso */}
        <View style={styles.river}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.4)', 'rgba(255, 215, 0, 0.3)']}
            style={styles.riverSurface}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
          <Animated.View 
            style={[
              styles.riverLight,
              {
                transform: [{
                  translateX: pulseAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-width, width]
                  })
                }]
              }
            ]}
          />
        </View>

        {/* Área de contenido */}
        <View style={styles.contentArea}>
          {children}
        </View>

        {/* Efecto de brillo en el suelo */}
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.1)', 'rgba(221, 36, 118, 0.3)']}
          style={styles.groundGlow}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />

        {/* Partículas flotantes */}
        <View style={styles.particles}>
          {[...Array(30)].map((_, i) => (
            <Animated.View 
              key={i}
              style={[
                styles.particle,
                {
                  left: Math.random() * width,
                  top: Math.random() * height,
                  backgroundColor: `hsl(${Math.random() * 60 + 20}, 100%, 70%)`,
                  width: Math.random() * 8 + 2,
                  height: Math.random() * 8 + 2,
                  transform: [{
                    translateY: pulseAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, (Math.random() - 0.5) * 10]
                    })
                  }]
                }
              ]}
            />
          ))}
        </View>
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
  sun: {
    position: 'absolute',
    top: height * 0.1,
    right: width * 0.15,
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.1,
    zIndex: 1,
    overflow: 'hidden',
  },
  sunInner: {
    width: '100%',
    height: '100%',
  },
  sunRays: {
    position: 'absolute',
    top: height * 0.1 - 50,
    right: width * 0.15 - 50,
    width: width * 0.2 + 100,
    height: width * 0.2 + 100,
    zIndex: 0,
  },
  sunRay: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: 4,
    height: width * 0.15,
    backgroundColor: 'rgba(255, 215, 0, 0.4)',
    borderRadius: 2,
  },
  cloudsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
    zIndex: 2,
  },
  cloud: {
    position: 'absolute',
    width: width * 0.3,
    height: width * 0.1,
    borderRadius: width * 0.05,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
    borderBottomColor: 'rgba(139, 0, 139, 0.7)',
    zIndex: 3,
  },
  mountainMid: {
    borderBottomWidth: height * 0.4,
    borderBottomColor: 'rgba(148, 0, 211, 0.8)',
    bottom: height * 0.3,
    zIndex: 4,
  },
  mountainClose: {
    borderBottomWidth: height * 0.5,
    borderBottomColor: 'rgba(75, 0, 130, 0.9)',
    bottom: height * 0.25,
    zIndex: 5,
  },
  river: {
    position: 'absolute',
    bottom: height * 0.25,
    width: '100%',
    height: height * 0.1,
    zIndex: 6,
    overflow: 'hidden',
  },
  riverSurface: {
    width: '100%',
    height: '100%',
  },
  riverLight: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  contentArea: {
    flex: 1,
    width: '100%',
    zIndex: 15,
    justifyContent: 'flex-start',
    paddingTop: 60, 
    paddingBottom: 20,
  },
  groundGlow: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.4,
    zIndex: 7,
  },
  particles: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 8,
  },
  particle: {
    position: 'absolute',
    borderRadius: 50,
  },
});

export default VibrantBackground;