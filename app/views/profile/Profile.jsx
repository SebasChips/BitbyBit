import React, { useEffect, useState } from "react";
import { 
  SafeAreaView, 
  View, 
  Text, 
  ScrollView, 
  StatusBar, 
  TouchableOpacity 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { checkUserSession, logOut } from "../../controllers/auths";
import { getUserData } from "../../controllers/querys";

import styles from "../../constants/profile";



export default function UserProfileScreen() {
  const navigation = useNavigation();

  const [fatherName, setFatherName] = useState("");
  const [fatherEmail, setFatherEmail] = useState("");
  const [childName, setChildName] = useState("");
  const [childDOB, setChildDOB] = useState("");
  const [passwordHidden] = useState("********");

  // Función para calcular la edad
  const calculateAge = (birthDate) => {
    if (!birthDate) return "0 años";
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return `${age} años`;
  };

  const loadUserData = async () => {
  try {
    const userInfo = await getUserData();
    
    if (userInfo) {
      setFatherName(userInfo.nameTutor || "No especificado");
      setFatherEmail(userInfo.email || "No especificado");
      setChildName(userInfo.nameKid || "No especificado");
      setChildDOB(userInfo.bornDateKid || "No especificado");
    }
  } catch (error) {
    console.error("Error al cargar datos:", error);
  }
};

   useEffect(() => {
    const unsubscribe = checkUserSession(async (user) => {
      if (!user) {
        navigation.navigate("Login");
      } else {
        await loadUserData();
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar backgroundColor="#38bdf8" barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          
          <Text style={styles.title}>Perfil de {childName}</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>👨‍👦 Información del Tutor</Text>
            
            <Text style={styles.inputLabel}>Nombre del tutor</Text>
            <Text style={styles.inputReadOnly}>{fatherName}</Text>

            <Text style={styles.inputLabel}>Correo Electrónico</Text>
            <Text style={styles.inputReadOnly}>{fatherEmail}</Text>

            <Text style={styles.inputLabel}>Contraseña</Text>
            <Text style={styles.inputReadOnly}>{passwordHidden}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>🧒 Información del Niño</Text>
            

            
            <View style={styles.ageBadge}>
              <Text style={styles.ageText}>{calculateAge(childDOB)}</Text>
            </View>

            <Text style={styles.inputLabel}>Nombre del Niño</Text>
            <Text style={styles.inputReadOnly}>{childName}</Text>

            <Text style={styles.inputLabel}>Fecha de Nacimiento</Text>
            <Text style={styles.inputReadOnly}>
              {new Date(childDOB).toLocaleDateString("es-MX", {
                day: "2-digit", month: "long", year: "numeric"
              })}
            </Text>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.button, styles.backActionButton]}
            >
              <Text style={styles.buttonText}>Regresar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={logOut}
              style={[styles.button, styles.logoutButton]}
            >
              <Text style={styles.buttonText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}