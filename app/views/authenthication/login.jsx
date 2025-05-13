import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Image, TouchableOpacity } from "react-native";
import { auth, db } from "../../firebase/firebaseConfig.jsx";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from "@react-navigation/native";
import { formStyles, textStyles, buttonStyles, imageStyles } from "./styles.js";
import { LogInEmailAndPass } from "../../controllers/auths.js";
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
        .then(async () => {
          const user = auth.currentUser;
          const uid = user.uid;
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            navigation.navigate("main");
          } else {
            navigation.navigate("firstTimeRegister");
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
        style={buttonStyles.primary}
      >
        <Text style={textStyles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("SignIn")}
        style={buttonStyles.secondary}
      >
        <Text style={textStyles.buttonText2}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleLogin(1)} disabled={!request}>
        <Image
          source={require("../../assets/images/logo_google.png")}
          style={imageStyles.medium}
        />
      </TouchableOpacity>
      <Image
        source={require("../../assets/images/bitty.png")}
        style={imageStyles.xxlarge}
      />
    </View>
  );
};

export default Login;
