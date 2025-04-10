import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { auth } from "../../firebase/firebaseConfig.jsx";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useNavigation } from "@react-navigation/native";
import {
  colors,
  spacing,
  textStyles,
  formStyles,
  buttonStyles,
} from "./styles";

WebBrowser.maybeCompleteAuthSession();
const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible] = useState(false);
  const [request, response, /* inicia sesión en ventana externa*/ promptAsync] =
    Google.useAuthRequest({
      webClientId:
        "61966159852-30er87tn5uojd5l0p8ndhriu144tpuj0.apps.googleusercontent.com",
      expoClientId:
        "61966159852-jp4u85h56v7f36gnf1mq8lqn1u70gh24.apps.googleusercontent.com",
      androidClientId:
        "61966159852-jp4u85h56v7f36gnf1mq8lqn1u70gh24.apps.googleusercontent.com",
    });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          Alert.alert("Éxito", "Inicio de sesión con Google correcto");
        })
        .catch((error) => {
          Alert.alert("Error", error.message);
        });
    }
  }, [response]);

  const handleLogin = async (typeLogin) => {
    try {
      switch (typeLogin) {
        case 0: // Login con email/password
          const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          if (!emailRegex.test(email)) {
            Alert.alert("Error", "Por favor ingresa un correo válido");
            return;
          }
          if (password.length < 6) {
            Alert.alert(
              "Error",
              "La contraseña debe tener al menos 6 caracteres"
            );
            return;
          }
          if (typeLogin === 0 && !password) {
            Alert.alert("Error", "Por favor ingresa tu contraseña");
            return;
          }
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
          Alert.alert("Éxito", "Inicio de sesión correcto");
          break;

        case 1: // Login con Google
          await promptAsync();
          break;
        default:
          break;
      }
    } catch (error) {
      Alert.alert("Error", error.message);
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
        secureTextEntry={!isPasswordVisible}
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
