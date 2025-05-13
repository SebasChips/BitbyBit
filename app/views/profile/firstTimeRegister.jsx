import { React, useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { styles } from "./styles";
import { checkUserSession, logOut } from "../../controllers/auths";
import { useNavigation } from "@react-navigation/native";
import { registrarUsuario } from "../controllers/querys";
import DateTimePicker from '@react-native-community/datetimepicker';

const topics = [
  'Matemáticas',
  'Programación',
  'Juegos',
  'LoL',
];

export default function UserInfoForm() {
  const [fatherName, setFatherName] = useState('');
  const [fatherEmail, setFatherEmail] = useState('');
  const [childName, setChildName] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // Función para manejar fechas
  const onChange = (event, selectedDate) => {
    if (Platform.OS === 'web') {
      // Manejo para web
      setDate(new Date(event.target.value));
    } else {
      // Manejo para móvil
      const currentDate = selectedDate || date;
      setShowDatePicker(Platform.OS === 'ios');
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
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else if (selectedTopics.length < 5) {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  // Componente DatePicker condicional
  const renderDatePicker = () => {
    if (Platform.OS === 'web') {
      return (
        <input
          type="date"
          value={date.toISOString().split('T')[0]}
          onChange={onChange}
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
            <Text>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </>
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hola, queremos conocer un poco más de ti...</Text>

      <TouchableOpacity onPress={() => logOut()} style={styles.submitButton}>
        <Text>Cerrar sesión</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información del Padre/Madre/Tutor</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={fatherName}
          onChangeText={setFatherName}
        />
        <TextInput
          style={styles.input}
          value={fatherEmail} 
          placeholder="Correo electrónico"
          keyboardType="email-address"
          onChangeText={setFatherEmail}
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información futur@ programador@</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={childName}
          onChangeText={setChildName}
        />
        
        {renderDatePicker()}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Selecciona hasta 5 temas de interés para el niño/niña</Text>
        <View style={styles.topicsContainer}>
          {topics.map((topic) => (
            <TouchableOpacity
              key={topic}
              style={[
                styles.topicButton,
                selectedTopics.includes(topic) && styles.selectedTopic
              ]}
              onPress={() => toggleTopic(topic)}
            >
              <Text style={styles.topicText}>{topic}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.selectionText}>
          Seleccionados: {selectedTopics.length}/5
        </Text>
      </View>
      
      <TouchableOpacity 
        onPress={() => registrarUsuario(fatherEmail, fatherName)} 
        style={styles.submitButton}
      >
        <Text style={styles.submitButtonText}>Continuar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}