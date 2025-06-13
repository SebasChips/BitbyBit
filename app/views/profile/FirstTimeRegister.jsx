import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, Platform, Image, StatusBar } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { checkUserSession, logOut } from "../../controllers/auths";
import { registerUser } from "../../controllers/querys";
import Toast from "react-native-toast-message";
import styles from "../../constants/userInfoStyles";

const topics = ["🎮 Videojuegos", "🤖 Robótica", "🧮 Matemáticas", "🎨 Dibujo", "🎵 Música", "🔬 Ciencia", "🧠 IA", "🌍 Idiomas"];

export default function UserInfoForm() {
  const navigation = useNavigation();

  const [fatherName, setFatherName] = useState("");
  const [fatherEmail, setFatherEmail] = useState("");
  const [childName, setChildName] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const unsubscribe = checkUserSession((user) => {
      if (!user) {
        navigation.navigate("Login");
      } else {
        setFatherEmail(user.email);
        setFatherName(user.displayName);
      }
    });
    return () => unsubscribe();
  }, [navigation]);

  const formatDate = (date) =>
    date
      .toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "/");

  const onChangeDate = (event, selectedDate) => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    if (Platform.OS === "web") {
      const selected = new Date(event.target.value);
      if (selected <= today) {
        setDate(selected);
      } else {
        Toast.show({
          type: "error",
          text1: "Fecha no válida",
          text2: "Solo puedes seleccionar fechas hasta hoy",
          visibilityTime: 3000,
          position: "bottom",
        });
      }
    } else {
      const currentDate = selectedDate || date;
      if (currentDate <= today) {
        setShowDatePicker(Platform.OS === "ios");
        setDate(currentDate);
      } else {
        Toast.show({
          type: "error",
          text1: "Fecha no válida",
          text2: "Solo puedes seleccionar fechas hasta hoy",
          visibilityTime: 3000,
          position: "bottom",
        });
      }
    }
  };

  const toggleTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else if (selectedTopics.length < 5) {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const renderDatePicker = () => {
    if (Platform.OS === "web") {
      return (
        <View style={styles.webDateContainer}>
          <Text style={styles.inputLabel}>Fecha de Nacimiento</Text>
          <View style={styles.webDateInputWrapper}>
            <input
              type="date"
              value={date.toISOString().split("T")[0]}
              onChange={(e) => {
                if (e.target.value) {
                  setDate(new Date(e.target.value));
                }
              }}
              max={new Date().toISOString().split("T")[0]}
              style={styles.webDateInputNative}
            />
            <View style={styles.webDateInputDisplay}></View>
          </View>
        </View>
      );
    } else {
      return (
        <>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
            <Text style={styles.datePickerText}>{formatDate(date)}</Text>
            <Text style={styles.calendarIcon}>📅</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <View style={styles.datePickerWrapper}>
              <DateTimePicker value={date} mode="date" display="spinner" onChange={onChangeDate} style={styles.datePicker} maximumDate={new Date()} />
            </View>
          )}
        </>
      );
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.headerContainer}>
          <Image source={require("../../assets/images/bitty.png")} style={styles.headerImage} />

          <Text style={styles.title}>¡Completa el formulario!</Text>
          <Text style={styles.subtitle}>Queremos conocer un poco más de ti...</Text>
        </View>

        <View style={styles.formContainer}>
          {/* Sección del Tutor */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>👤 Información del Tutor</Text>

            <Text style={styles.inputLabel}>Nombre completo</Text>
            <TextInput
              style={styles.input}
              value={fatherName}
              onChangeText={setFatherName}
              placeholder="Ingresa tu nombre"
              placeholderTextColor="#999"
              autoCapitalize="words"
            />
          </View>

          <View style={styles.divider} />

          {/* Sección del Niño */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>👦🏽 Información del Niño</Text>

            <Text style={styles.inputLabel}>Nombre completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del niño"
              placeholderTextColor="#999"
              value={childName}
              autoCapitalize="words"
              onChangeText={setChildName}
            />

            {renderDatePicker()}
          </View>

          <View style={styles.divider} />

          {/* Sección de Intereses */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>❤️ Intereses del Niño</Text>
            <Text style={styles.inputLabel}>Selecciona hasta 5 temas de interés</Text>

            <View style={styles.topicsContainer}>
              {topics.map((topic) => {
                const isSelected = selectedTopics.includes(topic);
                return (
                  <TouchableOpacity
                    key={topic}
                    onPress={() => toggleTopic(topic)}
                    style={[styles.topicButton, isSelected && styles.topicButtonSelected]}
                  >
                    <Text style={isSelected ? styles.selectedTopicText : styles.unselectedTopicText}>{topic}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={[styles.topicsCounter, selectedTopics.length === 5 && styles.topicsCounterFull]}>
              Seleccionados: {selectedTopics.length}/5
            </Text>
          </View>

          {/* Botones */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={logOut} style={[styles.button, styles.logoutButton]}>
              <Text style={styles.buttonText}>Cerrar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                registerUser(fatherEmail, childName, fatherName, date.toISOString().split("T")[0], navigation, new Date().toISOString().split("T")[0])
              }
              style={[styles.button, styles.submitButton]}
            >
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
