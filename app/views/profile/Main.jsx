import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Image, StatusBar } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase/firebaseConfig.jsx";
import Ionicons from "react-native-vector-icons/Ionicons";

import useBreakpoint from "../../hooks/useBreakpoint";
import getStyles from "../../constants/styles";
import theme from "@/app/constants/theme";

const Main = () => {
  const navigation = useNavigation();
  const breakpointData = useBreakpoint();
  if (!breakpointData.breakpoint) return null;

  const styles = getStyles(breakpointData);

  const [user, setUser] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const userId = auth.currentUser?.uid;
      const userDocRef = doc(db, "users", userId);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setCurrentLesson(userData.currentLesson || "lesson1");
        setUser(userData);

        const lessonsCol = await getDocs(collection(db, "lessons"));
        const lessonsData = [];

        lessonsCol.forEach((doc) => {
          lessonsData.push({ id: doc.id, ...doc.data() });
        });

        const sortedLessons = lessonsData.sort((a, b) => {
          const n1 = parseInt(a.id.replace("lesson", ""));
          const n2 = parseInt(b.id.replace("lesson", ""));
          return n1 - n2;
        });

        setLessons(sortedLessons);
      }

      setLoading(false);
    };

    loadData();
  }, []);

  const renderLessonNode = (lesson, index) => {
    const prevLesson = lessons[index - 1];
    const isFirst = index === 0;
    const isUnlocked = isFirst || prevLesson?.completed;
    const isCompleted = lesson.completed;
    const isCurrent = lesson.id === currentLesson;

    let backgroundColor = theme.colors.gray[300];
    let iconName = "lock-closed";
    let iconColor = "gray";
    let borderColor = theme.colors.gray[400];

    if (isCompleted) {
      backgroundColor = theme.colors.success;
      iconName = "checkmark-circle";
      iconColor = theme.colors.success;
      borderColor = theme.colors.success;
    } else if (isUnlocked) {
      backgroundColor = theme.colors.warning;
      iconName = "play";
      iconColor = theme.colors.warning;
      borderColor = theme.colors.warning;
    }

    return (
      <View key={lesson.id} style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => isUnlocked && navigation.navigate(lesson.rute)}
          disabled={!isUnlocked}
          style={{
            width: "70%",
            backgroundColor,
            borderWidth: 1,
            borderRadius: theme.radius.circular,
            marginVertical: 8,
            alignItems: "center",
          }}
        >
          <Ionicons name={iconName} size={36} color={iconColor} style={{ marginBottom: 8 }} />
          <Text style={[styles.text, { fontWeight: "bold" }]}>{lesson.title}</Text>
          {isCurrent && (
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
              <Ionicons name="star" size={16} color="#FFC107" />
              <Text style={[styles.caption, { marginLeft: 4 }]}>¡Tu misión!</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const renderConnector = () => (
    <View style={{ height: 50, alignItems: "center", justifyContent: "center" }}>
      <View
        style={{
          width: 10,
          height: "100%",
          backgroundColor: theme.colors.primary[300],
        }}
      />
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.box}>
          <Ionicons name="book" size={60} color="#4FC3F7" />
          <Text style={styles.text}>Cargando aventuras...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar backgroundColor={theme.colors.background.dark} barStyle="light-content" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {user && (
            <View style={styles.card}>
              <View style={styles.topicContainer}>
                <View style={styles.buttonstats}>
                  <Ionicons name="flame" size={20} color="#FF5722" />
                  <Text style={styles.text}>{user.streak} días</Text>
                </View>
                <View style={styles.buttonstats}>
                  <Ionicons name="star" size={20} color="#FFC107" />
                  <Text style={styles.text}>{user.xp} XP</Text>
                </View>
                <View style={styles.buttonstats}>
                  <Text style={styles.text}>Nv. {Math.floor(user.xp / 100) + 1}</Text>
                </View>
              </View>
              <Text style={styles.title}>¡Hola, {user.nameKid}!</Text>
            </View>
          )}

          <View>
            <Text style={styles.subTitle}>Tu Camino de Aprendizaje</Text>
            <View>
              {lessons.slice(0, 3).map((lesson, index) => (
                <React.Fragment key={lesson.id}>
                  {renderLessonNode(lesson, index)}
                  {index < 2 && renderConnector()}
                </React.Fragment>
              ))}
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate("Home")}>
            <Ionicons name="home" size={24} color="#fff" />
            <Text style={styles.footerText}>Inicio</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate("Progress")}>
            <Ionicons name="bar-chart" size={24} color="#fff" />
            <Text style={styles.footerText}>Progreso</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate("Profile")}>
            <Ionicons name="person" size={24} color="#fff" />
            <Text style={styles.footerText}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Main;
