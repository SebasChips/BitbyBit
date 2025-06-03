import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Image, StatusBar } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import { doc, getDoc } from "firebase/firestore";
import { RegisterEmailAndPass } from "../../controllers/auths";
import useBreakpoint from "../../hooks/UseBreakpoint";
import getStyles from "../../constants/styles";
import theme from "@/app/constants/theme";

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedTab, setSelectedTab] = useState("register");

  const breakpointData = useBreakpoint();
  if (!breakpointData.breakpoint) return null;

  const styles = getStyles(breakpointData);
  //console.log("Breakpoint actual:", breakpointData.breakpoint);

  const redirectUri = makeRedirectUri({ useProxy: true });
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "61966159852-30er87tn5uojd5l0p8ndhriu144tpuj0.apps.googleusercontent.com",
    expoClientId: "61966159852-jp4u85h56v7f36gnf1mq8lqn1u70gh24.apps.googleusercontent.com",
    androidClientId: "61966159852-s21btgh0rp3n6m5j2po5icfmjl2cakos.apps.googleusercontent.com",
    iosClientId: "61966159852-bk80mn0a9pfuitkj1i8qv0f4kqtug8nu.apps.googleusercontent.com",
    redirectUri,
    scopes: ["openid", "profile", "email"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token, access_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token, access_token);

      signInWithCredential(auth, credential)
        .then(async () => {
          const user = auth.currentUser;
          const uid = user.uid;
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            navigation.navigate("Main");
          } else {
            navigation.navigate("FirstTimeRegister");
          }
        })
        .catch((error) => {
          console.error("Error en signInWithCredential:", error);
        });
    }
  }, [response]);

  const handleGoogleLogin = async () => {
    try {
      await promptAsync({ useProxy: true });
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar backgroundColor={theme.colors.background.dark} barStyle="light-content" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContent}>
          <View style={styles.topContainer}>
            <Image source={require("../../assets/images/bitty.png")} style={styles.loginImage} />
            <Text style={styles.title}>¡Bienvenido!</Text>
            <Text style={styles.caption}>Crea una cuenta para comenzar</Text>
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, selectedTab === "login" && styles.tabActive]}
                onPress={() => {
                  setSelectedTab("login");
                  navigation.navigate("Login");
                }}
              >
                <Text style={[styles.tabText, selectedTab === "login" && styles.tabTextActive]}>Inicio</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tab, selectedTab === "register" && styles.tabActive]}
                onPress={() => {
                  setSelectedTab("register");
                  navigation.navigate("SignIn");
                }}
              >
                <Text style={[styles.tabText, selectedTab === "register" && styles.tabTextActive]}>Registro</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
              />

              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#999"
              />

              <TouchableOpacity onPress={() => RegisterEmailAndPass(email, password)} style={[styles.button, styles.buttonPrimary]}>
                <Text style={styles.buttonText}>Registrarme</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.googleContainer}>
              <Text style={styles.caption}>— o registrate con —</Text>
              <TouchableOpacity onPress={() => promptAsync({ useProxy: true })} disabled={!request} style={styles.button}>
                <Image source={require("../../assets/images/logo_google.png")} style={styles.googleIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;