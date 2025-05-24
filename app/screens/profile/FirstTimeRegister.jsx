import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { checkUserSession, logOut } from "../../controllers/auths";
import { registerUser } from "../../controllers/querys";

const topics = ["Matemáticas", "Programación", "Juegos", "LoL"];

export default function UserInfoForm() {
  const [fatherName, setFatherName] = useState("");
  const [fatherEmail, setFatherEmail] = useState("");
  const [childName, setChildName] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (date) => {
    return date
      .toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      })
      .replace(/\//g, "/");
  };

  const onChangeDate = (event, selectedDate) => {
    if (Platform.OS === "web") {
      setDate(new Date(event.target.value));
    } else {
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
        navigation.navigate("Login");
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

  const renderDatePicker = () => {
    if (Platform.OS === "web") {
      return <input type="date" value={date.toISOString().split("T")[0]} onChange={(e) => onChangeDate(e, null)} />;
    } else {
      return (
        <>
          <TouchableOpacity onPress={showDatepicker}>
            <Text>{formatDate(date)}</Text>
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
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent={false} barStyle="dark-content" />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View>
          <Image source={require("../../assets/images/bitty.png")} />

          <Text>Hola, queremos conocer un poco más de ti...</Text>

          <TouchableOpacity onPress={logOut}>
            <Text>Cerrar sesión</Text>
          </TouchableOpacity>

          <View>
            <Text>Información del Padre/Madre/Tutor</Text>
            <TextInput placeholder="Nombre" value={fatherName} onChangeText={setFatherName} />
            <TextInput
              placeholder="Correo electrónico"
              value={fatherEmail}
              keyboardType="email-address"
              onChangeText={setFatherEmail}
            />
          </View>

          <View>
            <Text>Información futur@ programador@</Text>
            <TextInput placeholder="Nombre" value={childName} onChangeText={setChildName} />
            {renderDatePicker()}
          </View>

          <View>
            <Text>Selecciona hasta 5 temas de interés para el niño/niña</Text>
            <View>
              {topics.map((topic) => {
                const isSelected = selectedTopics.includes(topic);
                return (
                  <TouchableOpacity key={topic} onPress={() => toggleTopic(topic)}>
                    <Text>{topic}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text>Seleccionados: {selectedTopics.length}/5</Text>
          </View>

          <TouchableOpacity
            onPress={() => registerUser(fatherEmail, childName, fatherName, date.toISOString(), navigation)}
          >
            <Text>Continuar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
