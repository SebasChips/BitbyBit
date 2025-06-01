import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Image, StatusBar } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { checkUserSession, logOut } from "../../controllers/auths";
import { registerUser } from "../../controllers/querys";

import useBreakpoint from "@/app/hooks/UseBreakpoint";
import getStyles from "../../constants/styles";
import theme from "@/app/constants/theme";
const topics = ["Videojuegos", "Robótica", "Matemáticas", "Dibujo", "Música", "Ciencia", "IA", "Idiomas"];

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
      return (
        <View style={[styles.input, { padding: 0 }]}>
          <input
            type="date"
            value={date.toISOString().split("T")[0]}
            onChange={(e) => {
              if (e.target.value) {
                setDate(new Date(e.target.value));
              }
            }}
            style={{
              fontSize: 16,
              border: "none",
              backgroundColor: "transparent",
              padding: theme.spacing.sm,
            }}
          />
        </View>
      );
    } else {
      return (
        <>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={[styles.input, { justifyContent: "center" }]}>
            <Text style={[styles.text, styles.datePickerText]}>{formatDate(date)}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker testID="dateTimePicker" value={date} mode="date" is24Hour={true} display="default" onChange={onChangeDate} />
          )}
        </>
      );
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar backgroundColor={theme.colors.background.dark} barStyle="light-content" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContent}>
          <View style={styles.topContainer}>
            <Image source={require("../../assets/images/bitty.png")} style={styles.loginImage} />
            <Text style={styles.subTitle}> Queremos conocer un poco más de ti...</Text>
            <Text style={styles.caption}> RELLENA LOS SIGUIENTES CAMPOS</Text>
            <TouchableOpacity onPress={logOut} style={[styles.button, styles.buttonDanger]}>
              <Text style={styles.buttonText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionContainer}>
            <View>
              <Text style={styles.caption}>Nombre del Tutor</Text>
              <TextInput
                style={styles.input}
                value={fatherName}
                onChangeText={setFatherName}
                placeholder="Nombre"
                placeholderTextColor="#999"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.divider} />

            <View>
              <Text style={styles.caption}>Nombre del Futuro Programador</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                placeholderTextColor="#999"
                value={childName}
                utoCapitalize="none"
                onChangeText={setChildName}
              />
              <Text style={styles.caption}>Fecha de Nacimiento</Text>
              {renderDatePicker()}
            </View>

            <View>
              <Text style={styles.caption}>Selecciona 5 temas de interés para el niñ@</Text>
              <View style={styles.topicContainer}>
                {topics.map((topic) => {
                  const isSelected = selectedTopics.includes(topic);
                  return (
                    <TouchableOpacity
                      key={topic}
                      onPress={() => toggleTopic(topic)}
                      style={[styles.buttonTab, isSelected && styles.buttonTabSelected]}
                    >
                      <Text style={isSelected ? styles.selectedText : styles.unselectedText}>{topic}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Text style={[styles.caption,{ marginTop: theme.spacing.md }]}>Seleccionados: {selectedTopics.length}/5</Text>

              <TouchableOpacity
                onPress={() =>
                  registerUser(
                    fatherEmail,
                    childName,
                    fatherName,
                    date.toISOString(),
                    navigation,
                    "2025-05-02" // lastActivity
                  )
                }
                style={[styles.button, styles.buttonPrimary]}
              >
                <Text style={styles.buttonText}>Continuar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
