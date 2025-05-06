import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Image, TouchableOpacity } from "react-native";
import { auth } from "../../firebase/firebaseConfig.jsx";
import  {signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import { useNavigation } from "@react-navigation/native";
import { colors, spacing, textStyles, formStyles, buttonStyles} from "./styles";
import Toast from 'react-native-toast-message';

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // Construye un redirectUri compatible con Expo Proxy para móvil
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
        .then(() => {
          navigation.navigate("main");
        })
        .catch((error) => {
          console.error("Error en signInWithCredential:", error);
        });
    }
  }, [response]);



  const handleLogin = async (typeLogin) => {
    if (typeLogin === 0) {
      if (!/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,6}$/.test(email)) {
        Toast.show({
          type: 'error',
          text1: 'Incorrecto',
          text2: 'El correo electrónico no es válido',
        });
        return;
      }
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        navigation.navigate('main', { user: userCredential.user });
      } catch (error) {
        console.error('Error en login email/password:', error);
      }
    } else if (typeLogin === 1) {
      try {
        await promptAsync({ useProxy: true });
      } catch (error) {
        console.error('Error al iniciar promptAsync:', error);
      }
    }
  };

  return (
    <View style={formStyles.container}>
      <Text style={textStyles.title}>Iniciar Sesión</Text>

      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={formStyles.input}
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={formStyles.input}
      />

      <TouchableOpacity
        onPress={() => handleLogin(0)}
        style={[buttonStyles.primary, { marginTop: spacing.large }]}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Iniciar Sesión
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("SignIn")}
        style={[buttonStyles.secondary, { marginBottom: spacing.large }]}
      >
        <Text style={{ color: colors.primary, textAlign: "center" }}>
          Registrarse
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleLogin(1)} disabled={!request}>
        <Image
          style={formStyles.googleButton}
          source={require("../../assets/images/logo_google.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Login;