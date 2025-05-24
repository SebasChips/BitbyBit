import React, { useState, useEffect } from "react";
import { SafeAreaView, StatusBar, ScrollView, View, Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity, TextInput } from "react-native";

import { auth, db } from "../../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from "@react-navigation/native";
import { LogInEmailAndPass } from "../../controllers/auths";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import { doc, getDoc } from "firebase/firestore";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent={false} barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View>
            <Image source={require("../../assets/images/bitty.png")} />
            <Text>¡Hola de nuevo!</Text>
            <Text>Inicia sesión para continuar donde te quedaste</Text>
          </View>

          <View>
            <TextInput placeholder="Correo electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
            <TouchableOpacity onPress={() => handleLogin(0)}>
              <Text>Entrar</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text>— o accede con —</Text>
            <TouchableOpacity onPress={() => handleLogin(1)} disabled={!request}>
              <Image source={require("../../assets/images/logo_google.png")} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text>¿Primera vez aquí? Crea una cuenta gratis</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
