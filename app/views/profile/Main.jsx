import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, StatusBar } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase/firebaseConfig.jsx";
import Ionicons from "react-native-vector-icons/Ionicons";
import { logOut } from "../../controllers/auths";

import useBreakpoint from "@/app/hooks/useBreakpoint.js";
import getStyles from "../../constants/styles.js";
import theme from "@/app/constants/theme";

const Main = () => {
  const navigation = useNavigation();
  const breakpointData = useBreakpoint();
  if (!breakpointData.breakpoint) return null;

  const styles = getStyles(breakpointData);

  const [user, setUser] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [lessonProgress, setLessonProgress] = useState({});
  const [currentLesson, setCurrentLesson] = useState("");
  const [loading, setLoading] = useState(true);

  const DividerWithLabel = ({ label }) => (
    <View style={styles.container2}>
      <View style={styles.line} />
      <Text style={styles.label}>{label}</Text>
      <View style={styles.line} />
    </View>
  );

 useEffect(() => {
  const loadData = async () => {
    const MIN_LOADING_TIME = 700;
    const startTime = Date.now();

    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("Usuario no autenticado");

      // Obtener usuario
      const userDoc = await getDoc(doc(db, "users", userId));
      if (!userDoc.exists()) throw new Error("Usuario no encontrado");

      const userData = userDoc.data();
      setUser(userData);
      setCurrentLesson(userData.currentLesson || "lesson1");

      // Obtener lecciones
      const lessonsSnapshot = await getDocs(collection(db, "lessons"));
      const lessonsList = lessonsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const sortedLessons = lessonsList.sort((a, b) =>
        parseInt(a.id.replace("lesson", "")) - parseInt(b.id.replace("lesson", ""))
      );
      setLessons(sortedLessons);

      // Obtener progreso
      const progressSnapshot = await getDocs(collection(db, "users", userId, "lessonsProgress"));
      const progress = {};
      progressSnapshot.forEach(doc => {
        progress[doc.id] = doc.data();
      });

      setLessonProgress(progress);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      const elapsed = Date.now() - startTime;
      const waitTime = Math.max(0, MIN_LOADING_TIME - elapsed);
      setTimeout(() => setLoading(false), waitTime);
    }
  };

  loadData();
}, []);


  const renderLessonNode = (lesson, index) => {
  const prevLessonId = lessons[index - 1]?.id;
  const isFirst = index === 0;
  const isCompleted = lessonProgress[lesson.id]?.completed === true;
  const isUnlocked = isFirst || (prevLessonId && lessonProgress[prevLessonId]?.completed === true);

  let bgColor = theme.colors.status.error;
  let icon = "close-circle";
  let iconColor = "#FFF";

  if (isCompleted) {
    bgColor = theme.colors.status.success;
    icon = "checkmark-circle";
  } else if (isUnlocked) {
    bgColor = theme.colors.status.warning;
    icon = "play";
  }


  return (
    <View key={lesson.id} style={{ alignItems: "center", marginVertical: 8 }}>
      <TouchableOpacity
        disabled={!isUnlocked}
        onPress={() => isUnlocked && navigation.navigate(lesson.rute)}
        style={{
          width: 100,
          height: 100,
          borderRadius: 16,
          backgroundColor: bgColor,
          borderWidth: 2,
          borderColor: theme.colors.black,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name={icon} size={36} color={iconColor} />
      </TouchableOpacity>
      <Text style={[styles.text, { marginTop: 8, fontWeight: "bold" }]}>{lesson.title}</Text>
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

  const handleLogout = async () => {
    try {
      await logOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background.dark,
      }}>
        <StatusBar backgroundColor={theme.colors.background.dark} barStyle="light-content" />
        <View style={{ alignItems: 'center' }}>
          <Ionicons name="book" size={60} color="#4FC3F7" />
          <Text style={{ marginTop: 10, color: '#FFFFFF', fontSize: 18 }}>
            Cargando aventuras...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar backgroundColor={theme.colors.background.dark} barStyle="light-content" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={[styles.container, { backgroundColor: "#FFFFFF" }]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {user && (
            <View style={styles.card}>
              <View style={styles.topicContainer}>
                <View style={styles.buttonstats}>
                  <Ionicons name="flame" size={20} color="#FF5722" />
                  <Text style={[styles.text, { color: "#FFF" }]}>{user.streak} días</Text>
                </View>
                <View style={styles.buttonstats}>
                  <Ionicons name="star" size={20} color="#FFC107" />
                  <Text style={[styles.text, { color: "#FFF" }]}>{user.xp} XP</Text>
                </View>

              </View>
            </View>
          )}
          <View>
            <Text style={[styles.title, { color: "#000000" }]}>¡Hola, {user.nameKid}!</Text>
          </View>
          <Text style={styles.caption}>Tu Camino de Aprendizaje</Text>
          <DividerWithLabel label="Torres de Hannoi" />
          <View>
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
          <TouchableOpacity style={styles.footerButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#FFF" />
            <Text style={styles.footerText}>Salir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate("Home")}>
            <Ionicons name="home" size={24} color="#FFF" />
            <Text style={styles.footerText}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate("Profile")}>
            <Ionicons name="person" size={24} color="#FFF" />
            <Text style={styles.footerText}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Main;
