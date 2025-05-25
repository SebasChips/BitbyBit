import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebaseConfig.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Main = ({ navigation }) => {
  const bittyAvatar = require('../../assets/images/bitty.png');
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
    return (
      <View>
        <Ionicons name="book" size={60} color="#4FC3F7" />
        <Text>Cargando aventuras...</Text>
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

    return (
      <View key={lesson.id}>
        <TouchableOpacity
          onPress={() => isUnlocked && navigation.navigate(lesson.rute)}
          disabled={!isUnlocked}
        >
          <Ionicons name={iconName} size={30} color="black" />
          <Text>{lesson.title}</Text>
          {isCurrent && (
            <View>
              <Ionicons name="star" size={16} color="#FFC107" />
              <Text>¡Tu misión!</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const renderConnector = () => (
    <View>
      <Ionicons name="chevron-down" size={30} color="#4FC3F7" />
    </View>
  );

  return (
    <ScrollView>
      {user && (
        <View>
          <Image source={bittyAvatar} />
          <View>
            <Text>¡Hola, {user.nameKid}!</Text>
            <View>
              <View>
                <Ionicons name="flame" size={20} color="#FF5722" />
                <Text>{user.streak} días</Text>
              </View>
              <View>
                <Ionicons name="star" size={20} color="#FFC107" />
                <Text>{user.xp} XP</Text>
              </View>
              <View>
                <Text>Nv. {Math.floor(user.xp / 100) + 1}</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      <View>
        <Text>Tu Camino de Aprendizaje</Text>
      </View>

      <View>
        {lessons.slice(0, 3).map((lesson, index) => (
          <React.Fragment key={lesson.id}>
            {renderLessonNode(lesson, index)}
            {index < 2 && renderConnector()}
          </React.Fragment>
        ))}
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Rewards')}>
        <View>
          <Ionicons name="trophy" size={24} color="white" />
          <Text>Ver mis recompensas</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Main;