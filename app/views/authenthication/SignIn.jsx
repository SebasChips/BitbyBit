import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { auth, db } from "../../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import { useNavigation } from "@react-navigation/native";
import { formStyles, textStyles, buttonStyles, imageStyles } from "./styles";
import { RegisterEmailAndPass } from "../../controllers/auths";
import { doc, getDoc } from "firebase/firestore";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
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

  const handleGoogleLogin = async () => {
    try {
      await promptAsync({ useProxy: true });
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  return (
    <View style={formStyles.container}>
      <Text style={textStyles.title}>Registrarse</Text>

      <TextInput
        placeholder="Correo electrónico"
        onChangeText={setEmail}
        value={email}
        style={formStyles.input}
      />
      <TextInput
        placeholder="Contraseña"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        style={formStyles.input}
      />

      <TouchableOpacity
        onPress={() => RegisterEmailAndPass(email, password)}
        style={buttonStyles.primary}
      >
        <Text style={textStyles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("login")}
        style={buttonStyles.secondary}
      >
        <Text style={textStyles.buttonText2}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleGoogleLogin}
        disabled={!request}
        style={{ marginTop: 20 }}
      >
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

export default SignIn;
