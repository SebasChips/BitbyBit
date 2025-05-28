import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Image, StatusBar } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase/firebaseConfig.jsx";
import Ionicons from "react-native-vector-icons/Ionicons";
import { checkUserSession, logOut } from "../../controllers/auths";

import useBreakpoint from "../../hooks/useBreakpoint.js";
import getStyles from "../../constants/styles.js";
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

  const DividerWithLabel = ({ label }) => {
    return (
      <View style={styles.container2}>
        <View style={styles.line} />
        <Text style={styles.label}>{label}</Text>
        <View style={styles.line} />
      </View>
    );
  };

  useEffect(() => {
    const loadData = async () => {
      // Simula un tiempo mínimo de carga, por ejemplo, 1 segundo
      const MIN_LOADING_TIME = 700; // 1 segundo en milisegundos
      const startTime = Date.now();

      try {
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
      } catch (error) {
        console.error("Error al cargar datos:", error);
        // Maneja el error, quizás mostrando un mensaje al usuario
      } finally {
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;
        const remainingTime = MIN_LOADING_TIME - elapsedTime;

        if (remainingTime > 0) {
          // Si los datos se cargaron más rápido que el tiempo mínimo, espera el resto
          setTimeout(() => {
            setLoading(false);
          }, remainingTime);
        } else {
          // Si los datos tardaron más que el tiempo mínimo, oculta la pantalla de carga inmediatamente
          setLoading(false);
        }
      }
    };

    loadData();
  }, []);

  const renderLessonNode = (lesson, index) => {
    const prevLesson = lessons[index - 1];
    const isFirst = index === 0;
    const isUnlocked = isFirst || prevLesson?.completed;
    const isCompleted = lesson.completed;
    const isCurrent = lesson.id === currentLesson;

    // Default: bloqueado (rojo)
    let backgroundColor = theme.colors.status.error; // Rojo
    let iconName = "close-circle";
    let iconColor = "#FFF";
    let borderColor = theme.colors.black;

    if (isCompleted) {
      backgroundColor = theme.colors.status.success; // Verde
      iconName = "checkmark-circle";
      iconColor = "#FFF";
      borderColor = theme.colors.black;
    } else if (isUnlocked) {
      backgroundColor = theme.colors.status.warning; // Amarillo
      iconName = "play";
      iconColor = "#FFF";
      borderColor = theme.colors.black;
    }

    return (
      <View key={lesson.id} style={{ alignItems: "center", marginVertical: 8 }}>
        <TouchableOpacity
          onPress={() => isUnlocked && navigation.navigate(lesson.rute)}
          disabled={!isUnlocked}
          style={{
            width: 100,
            height: 100,
            borderRadius: 16,
            backgroundColor,
            borderWidth: 2,
            borderColor,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name={iconName} size={36} color={iconColor} />
        </TouchableOpacity>
        <Text style={[styles.text, { fontWeight: "bold", marginTop: 8 }]}>{lesson.title}</Text>
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
        routes: [{ name: "Login" }], // Asegúrate de que "Login" sea el nombre correcto de tu pantalla de login
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView
      style={{
        flex: 1, // Hace que ocupe todo el espacio disponible
        justifyContent: 'center', // Centra verticalmente
        alignItems: 'center', // Centra horizontalmente
        backgroundColor: theme.colors.background.dark, // Color de fondo
      }}
    >
      <StatusBar backgroundColor={theme.colors.background.dark} barStyle="light-content" />
      <View
        style={{
          alignItems: 'center', // Centra el icono y el texto entre sí
        }}
      >
        <Ionicons name="book" size={60} color="#4FC3F7" />
        <Text
          style={{
            marginTop: 10, // Espacio entre el icono y el texto
            color: '#FFFFFF', // Color del texto
            fontSize: 18,
          }}
        >
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
                <View style={styles.buttonstats}>
                  <Text style={[styles.text, { color: "#FFF" }]}>Nv. {Math.floor(user.xp / 100) + 1}</Text>
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
