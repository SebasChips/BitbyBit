import { React, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from "./styles";

const topics = [
  'Matemáticas',
  'Programación',
  'Juegos',
  'LoL',

];

export default function UserInfoForm() {
  const [fatherName, setFatherName] = useState('');
  const [fatherAge, setFatherAge] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);

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
          placeholder="Edad"
          keyboardType="numeric"
          value={fatherAge}
          onChangeText={setFatherAge}
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
