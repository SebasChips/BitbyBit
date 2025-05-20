import React from 'react';
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const EpicFinalBackground = ({ children }) => {
  // Animaciones principales
  const pulseAnim = new Animated.Value(0);
  const portalRotation = new Animated.Value(0);
  const starAnim = new Animated.Value(0);

  // Inicializar múltiples animaciones
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

  // Generar estrellas estáticas
  const stars = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * width,
    y: Math.random() * (height * 0.8),
    opacity: 0.5 + Math.random() * 0.5
  }));

  // Generar estrellas fugaces
  const shootingStars = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    startX: Math.random() * width,
    startY: Math.random() * height * 0.5,
    length: 50 + Math.random() * 100,
    angle: Math.random() * 60 - 30,
    delay: i * 2000,
    duration: 2000 + Math.random() * 3000
  }));

  return (
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
        const anim = new Animated.Value(0);
        
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

      {/* Nebulosas */}
      <View style={styles.nebulaContainer}>
        {[1, 2, 3].map(i => (
          <Animated.View
            key={`nebula-${i}`}
            style={[
              styles.nebula,
              {
                backgroundColor: `hsla(${Math.random() * 60 + 200}, 80%, 50%, 0.1)`,
                width: width * (0.5 + Math.random() * 0.5),
                height: width * (0.5 + Math.random() * 0.5),
                left: Math.random() * width * 0.5,
                top: Math.random() * height * 0.5,
                transform: [
                  {
                    rotate: portalRotation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', `${Math.random() * 360}deg`]
                    })
                  },
                  {
                    scale: pulseAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1 + Math.random() * 0.2]
                    })
                  }
                ]
              }
            ]}
          />
        ))}
      </View>

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
        
        {/* Efectos de energía del portal */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
          <Animated.View
            key={`energy-${angle}`}
            style={[
              styles.portalEnergy,
              {
                transform: [
                  { rotate: `${angle}deg` },
                  {
                    translateY: pulseAnim.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [-30, -50, -30]
                    })
                  }
                ]
              }
            ]}
          />
        ))}
      </View>

      {/* Rayos cósmicos */}
      <View style={styles.cosmicRays}>
        {[0, 30, 60, 90, 120, 150].map(angle => (
          <Animated.View
            key={`ray-${angle}`}
            style={[
              styles.cosmicRay,
              {
                transform: [
                  { rotate: `${angle}deg` },
                  {
                    scaleY: pulseAnim.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [1, 1.3, 1]
                    })
                  }
                ]
              }
            ]}
          />
        ))}
      </View>

      {/* Planeta lejano */}
      <View style={styles.planet}>
        <LinearGradient
          colors={['#3a1c71', '#d76d77', '#ffaf7b']}
          style={styles.planetSurface}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <Animated.View
          style={[
            styles.planetGlow,
            {
              opacity: pulseAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.7]
              })
            }
          ]}
        />
      </View>

      {/* Área de contenido */}
      <View style={styles.contentArea}>
        {children}
      </View>

      {/* Efecto de polvo estelar */}
      <View style={styles.stardust}>
        {Array.from({ length: 50 }).map((_, i) => (
          <Animated.View
            key={`dust-${i}`}
            style={[
              styles.dustParticle,
              {
                left: Math.random() * width,
                top: Math.random() * height,
                width: Math.random() * 5 + 1,
                height: Math.random() * 5 + 1,
                opacity: Math.random() * 0.5 + 0.1,
                transform: [
                  {
                    translateY: pulseAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, (Math.random() - 0.5) * 20]
                    })
                  }
                ]
              }
            ]}
          />
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
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
  nebulaContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  nebula: {
    position: 'absolute',
    borderRadius: 200,
    opacity: 0.3,
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
  portalEnergy: {
    position: 'absolute',
    width: 10,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
    top: -20,
    left: width * 0.2 - 5,
  },
  cosmicRays: {
    position: 'absolute',
    top: height * 0.3,
    left: width * 0.5,
    width: width * 0.6,
    height: width * 0.6,
    zIndex: 5,
  },
  cosmicRay: {
    position: 'absolute',
    left: 0,
    top: width * 0.3,
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  planet: {
    position: 'absolute',
    top: height * 0.1,
    right: width * 0.1,
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.075,
    overflow: 'hidden',
    zIndex: 2,
  },
  planetSurface: {
    width: '100%',
    height: '100%',
  },
  planetGlow: {
    position: 'absolute',
    width: '120%',
    height: '120%',
    borderRadius: width * 0.09,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    top: '-10%',
    left: '-10%',
  },
  contentArea: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.4,
    zIndex: 20,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    pointerEvents: 'box-none',
  },
  stardust: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  dustParticle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 50,
  },
});

export default EpicFinalBackground;