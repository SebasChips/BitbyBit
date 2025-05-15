import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

const Main = () => {
  const lessons = Array.from({ length: 10 }, (_, i) => `Lección ${i + 1}`);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Hola, Isidro!</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {lessons.map((lesson, index) => (
          <TouchableOpacity key={index} style={styles.bubble}>
            <Text style={styles.bubbleText}>{lesson}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#f0f4f7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  bubble: {
    width: "100%",
    height: 80,
    borderRadius: 20,
    backgroundColor: "#58cc02",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  bubbleText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Main;
