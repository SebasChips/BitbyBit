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
import useBreakpoint from "../../hooks/useBreakpoint";
import getStyles from "../../constants/styles";

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
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

  const handleGoogleLogin = async () => {
    try {
      await promptAsync({ useProxy: true });
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent={false} backgroundColor="white" barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View>
            <Image source={require("../../assets/images/bitty.png")} />

            <Text>¡Bienvenido!</Text>
            <Text>Crea una cuenta para comenzar</Text>

            <View>
              <TextInput
                placeholder="Correo electrónico"
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
              />
              <TextInput placeholder="Contraseña" onChangeText={setPassword} secureTextEntry textContentType="password" />

              <TouchableOpacity onPress={() => RegisterEmailAndPass(email, password)}>
                <Text>Registrarme</Text>
              </TouchableOpacity>
            </View>

            <Text>— o registrate con —</Text>

            <View>
              <TouchableOpacity onPress={() => promptAsync({ useProxy: true })} disabled={!request}>
                <Image source={require("../../assets/images/logo_google.png")} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text>¿Ya tienes cuenta? Inicia sesión</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
