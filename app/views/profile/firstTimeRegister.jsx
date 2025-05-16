import { React, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Platform, KeyboardAvoidingView, ScrollView, SafeAreaView, StatusBar } from "react-native";

import { checkUserSession, logOut } from "../../controllers/auths";
import { useNavigation } from "@react-navigation/native";
import { registrarUsuario } from "../../controllers/querys";
import DateTimePicker from "@react-native-community/datetimepicker";

import { baseStyles, textStyles, formStyles, buttonStyles, imageStyles, scrollStyles, tagStyles, cardStyles, modalStyles } from "./styles.js";


const topics = ["Matemáticas", "Programación", "Juegos", "LoL"];



export default function UserInfoForm() {
  const [fatherName, setFatherName] = useState("");
  const [fatherEmail, setFatherEmail] = useState("");
  const [childName, setChildName] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  
//reformatear fecha
    const formatDate = (date) => {
      return date.toLocaleDateString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).replace(/\//g, '/');
    };


  // Función para manejar fechas
  const onChangeDate = (event, selectedDate) => {
    if (Platform.OS === 'web') {
      // Manejo para web
      setDate(new Date(event.target.value));
    } else {
      // Manejo para móvil
      const currentDate = selectedDate || date;
      setShowDatePicker(Platform.OS === "ios");
      setDate(currentDate);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = checkUserSession((user) => {
      if (!user) {
        navigation.navigate("login");
      } else {
        setFatherEmail(user.email);
        setFatherName(user.displayName);
      }
    });
    return () => unsubscribe();
  }, [navigation]);

  const toggleTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else if (selectedTopics.length < 5) {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  // Componente DatePicker condicional
  const renderDatePicker = () => {
    if (Platform.OS === "web") {
      return <input type="date" value={date.toISOString().split("T")[0]} onChange={onChange} style={formStyles.dateInputWeb} />;
    } else {
      return (
        <>
          <TouchableOpacity style={formStyles.datePickerButton} onPress={showDatepicker}>
            <Text style={formStyles.datePickerText}>{date.toLocaleDateString()}</Text>
            <Text style={textStyles.caption}> 📅 </Text> 
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker testID="dateTimePicker" value={date} mode="date" is24Hour={true} display="default" onChange={onChange} />
          )}
        </>
      );
    }
  };

  if (Platform.OS === 'web') {
    return (
      <input
        type="date"
        value={date.toISOString().split('T')[0]}
        onChange={onChangeDate}
        style={{
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          width: '100%',
          marginBottom: '15px'
        }}
      />
    );
  } else {
    return (
      <>
        <TouchableOpacity 
          style={styles.input} 
          onPress={showDatepicker}
        >
          <Text>{formatDateForDisplay(date)}</Text>
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar translucent={false} backgroundColor="white" barStyle="dark-content" />
      <ScrollView contentContainerStyle={scrollStyles.container} keyboardShouldPersistTaps="handled">
        <View style={formStyles.container}>
          <Image source={require("../../assets/images/bitty.png")} style={imageStyles.avatarLarge} />
          <Text style={textStyles.heading}>Hola, queremos conocer un poco más de ti...</Text>

          <TouchableOpacity onPress={logOut} style={buttonStyles.danger}>
            <Text style={textStyles.buttonPrimary}>Cerrar sesión</Text>
          </TouchableOpacity>

          <View style={formStyles.formGroup}>
            <Text style={textStyles.subtitle}>Información del Padre/Madre/Tutor</Text>

            <TextInput placeholder="Nombre" value={fatherName} onChangeText={setFatherName} style={formStyles.input} />
            <TextInput
              placeholder="Correo electrónico"
              value={fatherEmail}
              keyboardType="email-address"
              onChangeText={setFatherEmail}
              style={formStyles.input}
            />
          </View>

          <View style={formStyles.formGroup}>
            <Text style={textStyles.subtitle}>Información futur@ programador@</Text>

            <TextInput placeholder="Nombre" value={childName} onChangeText={setChildName} style={formStyles.input} />

            {renderDatePicker()}
          </View>

          <View style={formStyles.formGroup}>
            <Text style={textStyles.subtitle}>Selecciona hasta 5 temas de interés para el niño/niña</Text>

            <View style={tagStyles.container}>
              {topics.map((topic) => {
                const isSelected = selectedTopics.includes(topic);
                return (
                  <TouchableOpacity key={topic} onPress={() => toggleTopic(topic)} style={[tagStyles.tag, isSelected && tagStyles.tagSelected]}>
                    <Text style={[tagStyles.tagText, isSelected && tagStyles.tagTextSelected]}>{topic}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={textStyles.subtitle}>Seleccionados: {selectedTopics.length}/5</Text>
          </View>

          <TouchableOpacity onPress={() => registrarUsuario(fatherEmail, fatherName)} style={buttonStyles.primary}>
            <Text style={textStyles.buttonPrimary}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
