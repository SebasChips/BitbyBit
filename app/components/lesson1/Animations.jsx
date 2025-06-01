import { Animated, Easing } from 'react-native';

export const startStarAnimation = (starScaleAnims) => {
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

  return Animated.loop(
    Animated.stagger(100, [
      createStarAnimation(0),
      createStarAnimation(1),
      createStarAnimation(2)
    ]),
    { iterations: 3 }
  );
};

export const startWinAnimation = (
  positionAnim,
  opacityAnim,
  rotateAnim,
  scaleAnim,
  starScaleAnims,
  confettiRef
) => {
  const starAnimation = startStarAnimation(starScaleAnims);
  
  return Animated.parallel([
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
    ),
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
    ),
    starAnimation
  ]);
};