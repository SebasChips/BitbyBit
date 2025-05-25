import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Image, StatusBar } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import { doc, getDoc } from "firebase/firestore";
import { LogInEmailAndPass } from "../../controllers/auths";
import useBreakpoint from "../../hooks/useBreakpoint";
import getStyles from "../../constants/styles";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const breakpointData = useBreakpoint();
  if (!breakpointData.breakpoint) return null;

  const styles = getStyles(breakpointData);
  console.log("Breakpoint actual:", breakpointData.breakpoint);

  const redirectUri = makeRedirectUri({ useProxy: true });
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "61966159852-30er87tn5uojd5l0p8ndhriu144tpuj0.apps.googleusercontent.com",
    expoClientId: "61966159852-jp4u85h56v7f36gnf1mq8lqn1u70gh24.apps.googleusercontent.com",
    androidClientId: "61966159852-jp4u85h56v7f36gnf1mq8lqn1u70gh24.apps.googleusercontent.com",
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

  const handleLogin = async (typeLogin) => {
    if (typeLogin === 0) {
      LogInEmailAndPass(email, password, navigation);
    } else if (typeLogin === 1) {
      try {
        await promptAsync({ useProxy: true });
      } catch (error) {
        console.error("Error al iniciar promptAsync:", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar translucent={false} barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[styles.center, { flexGrow: 1 }]}>
          <View style={[styles.card, styles.mbLg]}>
            <Image source={require("../../assets/images/bitty.png")} style={styles.loginImage} />
            <Text style={styles.title}>¡Hola de nuevo!</Text>
            <Text style={[styles.text, styles.mbMd]}>Inicia sesión para continuar donde te quedaste</Text>
          </View>

          <View style={[styles.formContainer, styles.mbLg]}>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
            <TouchableOpacity onPress={() => handleLogin(0)} style={[styles.button, styles.buttonPrimary]}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.formContainer, styles.mbMd]}>
            <Text style={styles.caption}>— o accede con —</Text>
            <TouchableOpacity onPress={() => handleLogin(1)} disabled={!request} style={styles.button}>
              <Image source={require("../../assets/images/logo_google.png")} style={styles.googleIcon} />
              <Text style={styles.buttonText}>Google</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("SignIn")} style={styles.center}>
            <Text style={styles.caption}>¿Primera vez aquí? Crea una cuenta gratis</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
