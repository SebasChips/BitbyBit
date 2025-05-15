import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Image, TouchableOpacity } from "react-native";
import { auth } from "../../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import { useNavigation } from "@react-navigation/native";
import { formStyles, textStyles, buttonStyles, imageStyles } from "./styles";
import { RegisterEmailAndPass } from "../../controllers/auths";

const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Construye un redirectUri compatible con Expo Proxy para móvil
  const redirectUri = makeRedirectUri({ useProxy: true });

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "61966159852-30er87tn5uojd5l0p8ndhriu144tpuj0.apps.googleusercontent.com",
    expoClientId:
      "61966159852-jp4u85h56v7f36gnf1mq8lqn1u70gh24.apps.googleusercontent.com",
    androidClientId:
      "61966159852-jp4u85h56v7f36gnf1mq8lqn1u70gh24.apps.googleusercontent.com",
    iosClientId:
      "61966159852-bk80mn0a9pfuitkj1i8qv0f4kqtug8nu.apps.googleusercontent.com",
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

  return (
    <View style={formStyles.container}>
      <Image
        source={require("../../assets/images/bitty.png")}
        style={imageStyles.large}
      />

      <Text style={textStyles.title}>¡Bienvenido!</Text>
      <Text style={textStyles.subtitle}>Ingresa un correo y contraseña</Text>

      <View style={formStyles.formContent}>
        <TextInput
          placeholder="Correo electrónico"
          onChangeText={setEmail}
          style={formStyles.input}
        />

        <TextInput
          placeholder="Contraseña"
          onChangeText={setPassword}
          secureTextEntry={true}
          style={formStyles.input}
        />

        <TouchableOpacity
          onPress={() => RegisterEmailAndPass(email, password)}
          style={[buttonStyles.primary]}
        >
          <Text style={textStyles.buttonText}>REGISTRARSE</Text>
        </TouchableOpacity>
      </View>

      <Text style={formStyles.dividerText}>O conéctate usando</Text>

      <View style={formStyles.socialContainer}>
        <TouchableOpacity
          onPress={() => promptAsync({ useProxy: true })}
          disabled={!request}
        >
          <Image
            source={require("../../assets/images/logo_google.png")}
            style={imageStyles.small}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("login")}
        style={buttonStyles.subtitle}
      >
        <Text style={textStyles.link}>¿Ya tienes cuenta? Inicia Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
