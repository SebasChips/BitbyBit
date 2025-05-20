import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Animated, Easing } from 'react-native';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebaseConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { baseStyles, textStyles, formStyles, buttonStyles, imageStyles, scrollStyles, tagStyles, cardStyles, modalStyles } from "./styles.js";
import { colors, spacing, fontSizes, fontWeights, radii, opacities, layout, dimensions, imageSizes, shadows, zIndices, lineHeights, fontFamilies } from "../../constants/theme";


const Main = ({ navigation }) => {
  const bittyAvatar = require('../../assets/images/bitty.png');
  const [user, setUser] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState('');
  const [loading, setLoading] = useState(true);
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    const loadData = async () => {
      const userId = auth.currentUser?.uid;
      const userDocRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setCurrentLesson(userData.currentLesson || 'lesson1');
        setUser(userData);

        const lessonsCol = await getDocs(collection(db, 'lessons'));
        const lessonsData = [];

        lessonsCol.forEach((doc) => {
          lessonsData.push({ id: doc.id, ...doc.data() });
        });

        const sortedLessons = lessonsData.sort((a, b) => {
          const n1 = parseInt(a.id.replace('lesson', ''));
          const n2 = parseInt(b.id.replace('lesson', ''));
          return n1 - n2;
        });

        setLessons(sortedLessons);
      }

      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      ])
    ).start();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Ionicons name="book" size={60} color="#4FC3F7" />
        <Text style={styles.loadingText}>Cargando aventuras...</Text>
      </View>
    );
  }

  const renderLessonNode = (lesson, index) => {
    const prevLesson = lessons[index - 1];
    const isFirst = index === 0;
    const isUnlocked = isFirst || prevLesson?.completed;
    const isCompleted = lesson.completed;
    const isCurrent = lesson.id === currentLesson;

    let iconName = 'lock-closed';
    if (isCompleted) iconName = 'checkmark-circle';
    else if (isUnlocked) iconName = 'play';

    const animatedStyle = isCurrent && isUnlocked ? {
      transform: [{ scale: pulseAnim }]
    } : {};

    return (
      <Animated.View key={lesson.id} style={[animatedStyle]}>
        <TouchableOpacity
          style={[
            styles.node,
            isCompleted && styles.nodeCompleted,
            !isUnlocked && styles.nodeLocked,
            isCurrent && styles.nodeCurrent
          ]}
          onPress={() => isUnlocked && navigation.navigate(lesson.rute)}
          disabled={!isUnlocked}
        >
          <LinearGradient
            colors={isCompleted ? [colors.info] : isUnlocked ? [colors.success] : ['#aaa', '#ccc']}
            style={styles.nodeGradient}
          >
            <Ionicons
              name={iconName}
              size={30}
              color="white"
            />
          </LinearGradient>
          <Text style={styles.nodeText}>{lesson.title}</Text>
          {isCurrent && (
            <View style={styles.currentLabel}>
              <Ionicons name="star" size={16} color="#FFC107" />
              <Text style={styles.currentLabelText}>¡Tu misión!</Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderConnector = () => (
    <View style={styles.connectorContainer}>
      <Ionicons name="chevron-down" size={30} color="#4FC3F7" />
    </View>
  );

  return (
    <LinearGradient colors={['#FFFBEA', '#FFFBEA']} style={styles.gradientContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        {user && (
          <View style={styles.profileContainer}>
            <Image
              source={bittyAvatar}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>¡Hola, {user.nameKid}!</Text>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Ionicons name="flame" size={20} color="#FF5722" />
                  <Text style={styles.statText}>{user.streak} días</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="star" size={20} color="#FFC107" />
                  <Text style={styles.statText}>{user.xp} XP</Text>
                </View>
                <View style={styles.levelBadge}>
                  <Text style={styles.levelText}>Nv. {Math.floor(user.xp / 100) + 1}</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Tu Camino de Aprendizaje</Text>
        </View>

        <View style={styles.path}>
          {lessons.slice(0, 3).map((lesson, index) => (
            <React.Fragment key={lesson.id}>
              {renderLessonNode(lesson, index)}
              {index < 2 && renderConnector()}
            </React.Fragment>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.rewardsButton}
          onPress={() => navigation.navigate('Rewards')}
        >
          <LinearGradient 
            colors={['#0EA5E9', '#0EA5E9']} 
            style={styles.rewardsButtonGradient}
          >
            <Ionicons name="trophy" size={24} color="white" />
            <Text style={styles.rewardsButtonText}>Ver mis recompensas</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    fontSize: 18,
    color: colors.text,
    marginTop: 20,
    fontFamily: 'KidsFont',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: colors.surface,
    padding: 15,
    borderRadius: 20,
    width: '100%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
    fontFamily: 'KidsFont',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  statText: {
    fontSize: 16,
    color: '#424242',
    marginLeft: 5,
    fontFamily: 'KidsFont',
  },avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40 },
  levelBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: colors.info,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  levelText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginHorizontal: 10,
    fontFamily: 'KidsFont',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  path: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 30,
  },
  node: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    elevation: 5,
    width: 200,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  nodeGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  nodeCompleted: {
    borderColor: colors.success,
  },
  nodeLocked: {
    opacity: 0.7,
  },
  nodeCurrent: {
    borderColor: colors.info,
  },
  nodeText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.text,
    fontFamily: 'KidsFont',
  },
  currentLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  currentLabelText: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: 'bold',
    marginLeft: 5,
    fontFamily: 'KidsFont',
  },
  connectorContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardsButton: {
    width: '90%',
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
  },
  rewardsButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardsButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: 'KidsFont',
  },
});

export default Main;