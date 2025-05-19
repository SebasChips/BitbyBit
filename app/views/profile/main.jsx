import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebaseConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';

const avatars = [
  require('../../assets/images/avatars/tigres.png'),
  /*require('../../assets/avatars/avatar2.png'),
  require('../../assets/avatars/avatar3.png'),
  require('../../assets/avatars/avatar4.png'),*/
];


const Main = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState('');
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <Text style={{ padding: 20 }}>Cargando...</Text>;
  }

  const renderLessonNode = (lesson, index) => {
    const prevLesson = lessons[index - 1];
    const isFirst = index === 0;
    const isUnlocked = isFirst || prevLesson?.completed;
    const isCompleted = lesson.completed;

    let iconName = 'lock-closed';
    if (isCompleted) iconName = 'checkmark-circle';
    else if (isUnlocked) iconName = 'play';

    return (
      <TouchableOpacity
        key={lesson.id}
        style={[
          styles.node,
          isCompleted && styles.nodeCompleted,
          !isUnlocked && styles.nodeLocked
        ]}
        onPress={() => isUnlocked && navigation.navigate(lesson.rute)}
        disabled={!isUnlocked}
      >
        <Ionicons
          name={iconName}
          size={30}
          color={isCompleted ? '#4CAF50' : isUnlocked ? '#2196F3' : '#aaa'}
        />
        <Text style={styles.nodeText}>{lesson.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
              {user && (
          <View style={styles.profileContainer}>
            <Image
              source={avatars[user.avatarIndex || 0]}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.nameKid}</Text>
              <Text style={styles.userData}>Racha: {user.streak} días</Text>
              <Text style={styles.userData}>XP: {user.xp}</Text>
            </View>
          </View>
        )}

      <Text style={styles.title}>Tu Camino de Aprendizaje</Text>

      <View style={styles.path}>
        {lessons.slice(0, 3).map((lesson, index) => (
          <React.Fragment key={lesson.id}>
            {renderLessonNode(lesson, index)}
            {index < 2 && <View style={styles.connector} />}
          </React.Fragment>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  path: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userData: {
    fontSize: 16,
    color: '#666',
  },

  node: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    width: 180,
  },
  nodeCompleted: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  nodeLocked: {
    opacity: 0.5,
  },
  nodeText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  connector: {
    height: 30,
    width: 4,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
});

export default Main;
