import { React, useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from "./styles";
import { checkUserSession, logOut } from "../controllers/auths";
import { useNavigation } from "@react-navigation/native";
import { registrarUsuario } from "../controllers/querys";

const topics = [
  'Matemáticas',
  'Programación',
  'Juegos',
  'LoL',

];
mail = '';
export default function UserInfoForm() {

  const [fatherName, setFatherName] = useState('');
  const [fatherEmail, setFatherEmail] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);


  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = checkUserSession((user) => {
      if (!user) {
        navigation.navigate("Login"); 
      }else{setFatherEmail(user.email);}
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
        <TextInput
          style={styles.input}
          placeholder="Edad"
          keyboardType="numeric"
          value={childAge}
          onChangeText={setChildAge}
        />
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
      
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Continuar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
