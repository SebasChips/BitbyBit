import React from 'react';
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const EpicFinalBackground = ({ children }) => {
  // Usamos useRef para las animaciones
  const pulseAnim = React.useRef(new Animated.Value(0)).current;
  const portalRotation = React.useRef(new Animated.Value(0)).current;
  const starAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Animación de pulso para el portal
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 5000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 5000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      ])
    ).start();

    // Rotación del portal
    Animated.loop(
      Animated.timing(portalRotation, {
        toValue: 1,
        duration: 30000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();

    // Animación de estrellas fugaces
    Animated.loop(
      Animated.timing(starAnim, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
  }, []);

  // Interpolaciones
  const portalScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1]
  });

  const portalRotate = portalRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const portalGlow = pulseAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.7, 1, 0.7]
  });

  // Generar estrellas estáticas (optimizado)
  const stars = React.useMemo(() => 
    Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * width,
      y: Math.random() * (height * 0.8),
      opacity: 0.5 + Math.random() * 0.5
    }))
  , []);

  // Generar estrellas fugaces (optimizado)
  const shootingStars = React.useMemo(() => 
    Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      startX: Math.random() * width,
      startY: Math.random() * height * 0.5,
      length: 50 + Math.random() * 100,
      angle: Math.random() * 60 - 30,
      delay: i * 2000,
      duration: 2000 + Math.random() * 3000
    }))
  , []);

  return (
    <View style={styles.outerContainer}>
      <LinearGradient
        colors={['#0f0c29', '#1a1a3a', '#24243e']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Estrellas de fondo */}
        {stars.map(star => (
          <View
            key={`star-${star.id}`}
            style={[
              styles.star,
              {
                left: star.x,
                top: star.y,
                width: star.size,
                height: star.size,
                opacity: star.opacity
              }
            ]}
          />
        ))}

        {/* Estrellas fugaces */}
        {shootingStars.map(star => {
          const anim = React.useRef(new Animated.Value(0)).current;
          
          React.useEffect(() => {
            Animated.loop(
              Animated.sequence([
                Animated.delay(star.delay),
                Animated.timing(anim, {
                  toValue: 1,
                  duration: star.duration,
                  easing: Easing.linear,
                  useNativeDriver: true
                })
              ])
            ).start();
          }, []);

          return (
            <Animated.View
              key={`shooting-${star.id}`}
              style={[
                styles.shootingStar,
                {
                  left: star.startX,
                  top: star.startY,
                  width: star.length,
                  transform: [
                    { rotate: `${star.angle}deg` },
                    {
                      translateX: anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, width * 2]
                      })
                    },
                    {
                      translateY: anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, height]
                      })
                    }
                  ]
                }
              ]}
            />
          );
        })}

        {/* Portal dimensional central */}
        <View style={styles.portalContainer}>
          <Animated.View
            style={[
              styles.portalOuter,
              {
                transform: [
                  { scale: portalScale },
                  { rotate: portalRotate }
                ]
              }
            ]}
          >
            <LinearGradient
              colors={['#00d2ff', '#3a7bd5', '#8700ff']}
              style={styles.portalGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          </Animated.View>
          
          <Animated.View
            style={[
              styles.portalInner,
              {
                opacity: portalGlow,
                transform: [
                  { scale: pulseAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1.1]
                  })}
                ]
              }
            ]}
          >
            <LinearGradient
              colors={['rgba(255,255,255,0.8)', 'rgba(200,200,255,0.2)']}
              style={styles.portalCore}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </Animated.View>
        </View>

        <View style={styles.contentArea}>
          {children}
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
  star: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  shootingStar: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  portalContainer: {
    position: 'absolute',
    top: height * 0.3,
    left: width * 0.5 - width * 0.2,
    width: width * 0.4,
    height: width * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  portalOuter: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.2,
    overflow: 'hidden',
  },
  portalGradient: {
    width: '100%',
    height: '100%',
  },
  portalInner: {
    position: 'absolute',
    width: '70%',
    height: '70%',
    borderRadius: width * 0.14,
    overflow: 'hidden',
  },
  portalCore: {
    width: '100%',
    height: '100%',
  },
  contentArea: {
    flex: 1,
    width: '100%',
    zIndex: 20,
    justifyContent: 'flex-start',
    paddingTop: 60, 
    paddingBottom: 20,
  },
});

export default EpicFinalBackground;