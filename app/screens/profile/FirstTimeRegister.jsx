import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Image, StatusBar } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { checkUserSession, logOut } from "../../controllers/auths";
import { registerUser } from "../../controllers/querys";

import useBreakpoint from "../../hooks/useBreakpoint";
import getStyles from "../../constants/styles";
import theme from "@/app/constants/theme";
const topics = ["Matemáticas", "Programación", "Juegos", "LoL"];

export default function UserInfoForm() {
  const breakpointData = useBreakpoint();
  if (!breakpointData.breakpoint) return null;

  const styles = getStyles(breakpointData);
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
        year: "2-digit",
      })
      .replace(/\//g, "/");

  const onChangeDate = (event, selectedDate) => {
    if (Platform.OS === "web") {
      setDate(new Date(event.target.value));
    } else {
      const currentDate = selectedDate || date;
      setShowDatePicker(Platform.OS === "ios");
      setDate(currentDate);
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
      return <TextInput style={styles.datePickerText} value={date.toISOString().split("T")[0]} onChange={(e) => onChangeDate(e, null)} />;
    } else {
      return (
        <>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.datePickerText}>{formatDate(date)}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker testID="dateTimePicker" value={date} mode="date" is24Hour={true} display="default" onChange={onChangeDate} />
          )}
        </>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={false} barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Image source={require("../../assets/images/bitty.png")} style={styles.loginImage} />

          <Text style={styles.title}>Hola, queremos conocer un poco más de ti...</Text>

          <TouchableOpacity onPress={logOut}>
            <Text style={[styles.caption, { textAlign: "center", marginBottom: theme.spacing.md }]}>Cerrar sesión</Text>
          </TouchableOpacity>

          {/* Agrupamos las secciones del formulario en una fila responsive */}
          <View style={styles.formRow}>
            {/* Información del padre */}
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Información del Padre/Madre/Tutor</Text>
              <TextInput style={styles.input} placeholder="Nombre" value={fatherName} onChangeText={setFatherName} />
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={fatherEmail}
                keyboardType="email-address"
                onChangeText={setFatherEmail}
              />
            </View>

            {/* Información del niño */}
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Información futur@ programador@</Text>
              <TextInput style={styles.input} placeholder="Nombre" value={childName} onChangeText={setChildName} />
              {renderDatePicker()}
            </View>
          </View>

          {/* Selección de temas */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Selecciona hasta 5 temas de interés</Text>
            <View style={styles.topicContainer}>
              {topics.map((topic) => {
                const isSelected = selectedTopics.includes(topic);
                return (
                  <TouchableOpacity
                    key={topic}
                    style={[styles.topicButton, isSelected && styles.topicButtonSelected]}
                    onPress={() => toggleTopic(topic)}
                  >
                    <Text style={[styles.topicText, isSelected && styles.topicTextSelected]}>{topic}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={[styles.caption, { marginTop: theme.spacing.sm }]}>Seleccionados: {selectedTopics.length}/5</Text>
          </View>

          {/* Botón continuar */}
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary]}
            onPress={() => registerUser(fatherEmail, childName, fatherName, date.toISOString(), navigation)}
          >
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
