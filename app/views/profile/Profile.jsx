import React, { useState, useEffect } from "react";
import { 
  SafeAreaView, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Platform, 
  Image, 
  StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { checkUserSession, logOut } from "../../controllers/auths";
import { registerUser } from "../../controllers/querys";

export default function UserInfoForm() {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = checkUserSession((user) => {
      if (!user) {
        navigation.navigate("Login");
      } 
    });
    return () => unsubscribe();
  }, [navigation]);

    return (
    <SafeAreaView style={styles.screen}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <Image 
            source={require("../../assets/images/bitty.png")} 
            style={styles.headerImage} 
          />
          
          <Text style={styles.title}>¡Completa el formulario!</Text>
          <Text style={styles.subtitle}>Queremos conocer un poco más de ti...</Text>
        </View>
        
        <View style={styles.formContainer}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}