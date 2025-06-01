import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Image, StatusBar, ActivityIndicator } from "react-native";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = checkUserSession((user) => {
      if (!user) {
        navigation.navigate("Login");
      } else {
        setFatherEmail(user.email);
        setFatherName(user.displayName);
        setIsLoading(false);
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

  const handleSubmit = async () => {
    if (!childName || !fatherName || selectedTopics.length === 0) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    setIsSubmitting(true);
    try {
      await registerUser(
        fatherEmail,
        childName,
        fatherName,
        date.toISOString(),
        navigation,
        "2025-05-02" // lastActivity
      );
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Ocurrió un error al registrar la información");
    } finally {
      setIsSubmitting(false);
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
          <TouchableOpacity 
            onPress={() => setShowDatePicker(true)} 
            style={[styles.input, { justifyContent: "center" }]}
            disabled={isSubmitting}
          >
            <Text style={[styles.text, styles.datePickerText]}>{formatDate(date)}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker 
              testID="dateTimePicker" 
              value={date} 
              mode="date" 
              is24Hour={true} 
              display="default" 
              onChange={onChangeDate} 
            />
          )}
        </>
      );
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.screen, { justifyContent: "center", alignItems: "center" }]}>
        <StatusBar backgroundColor={theme.colors.background.dark} barStyle="light-content" />
        <ActivityIndicator size="large" color={theme.colors.primary[400]} />
        <Text style={[styles.text, { color: theme.colors.white, marginTop: 20 }]}>
          Cargando información...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar backgroundColor={theme.colors.background.dark} barStyle="light-content" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContent}>
          <View style={styles.topContainer}>
            <Image source={require("../../assets/images/bitty.png")} style={styles.loginImage} />
            <TouchableOpacity
                onPress={logOut}
                style={[styles.button, styles.buttonDanger]}
                disabled={isSubmitting}
              >
                <Text style={styles.buttonText}>Cerrar sesión</Text>
              </TouchableOpacity>
            <Text style={styles.subTitle}>Queremos conocer un poco más de ti...</Text>
            <Text style={styles.caption}>RELLENA LOS SIGUIENTES CAMPOS</Text>
          </View>
          
          
          <View style={styles.sectionContainer}>
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Información del Tutor</Text>
              <Text style={styles.inputLabel}>Nombre completo</Text>
              <TextInput
                style={styles.input}
                value={fatherName}
                onChangeText={setFatherName}
                placeholder="Ingresa tu nombre"
                placeholderTextColor="#999"
                autoCapitalize="words"
                editable={!isSubmitting}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Información del Niño</Text>
              <Text style={styles.inputLabel}>Nombre completo</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre del niño"
                placeholderTextColor="#999"
                value={childName}
                autoCapitalize="words"
                onChangeText={setChildName}
                editable={!isSubmitting}
              />
              
              <Text style={styles.inputLabel}>Fecha de Nacimiento</Text>
              {renderDatePicker()}
            </View>

            <View style={styles.divider} />

            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Intereses del Niño</Text>
              <Text style={styles.inputLabel}>Selecciona hasta 5 temas de interés</Text>
              <View style={styles.topicContainer}>
                {topics.map((topic) => {
                  const isSelected = selectedTopics.includes(topic);
                  return (
                    <TouchableOpacity
                      key={topic}
                      onPress={() => !isSubmitting && toggleTopic(topic)}
                      style={[
                        styles.buttonTab, 
                        isSelected && styles.buttonTabSelected,
                        isSubmitting && styles.buttonDisabled
                      ]}
                      disabled={isSubmitting}
                    >
                      <Text style={isSelected ? styles.selectedText : styles.unselectedText}>
                        {topic}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Text style={[styles.caption, { color: selectedTopics.length === 5 ? theme.colors.success : theme.colors.gray[500] }]}>
                Seleccionados: {selectedTopics.length}/5
              </Text>
            </View>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                onPress={handleSubmit}
                style={[
                  styles.button, 
                  styles.buttonPrimary,
                  isSubmitting && styles.buttonDisabled
                ]}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color={theme.colors.white} />
                ) : (
                  <Text style={styles.buttonText}>Continuar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}