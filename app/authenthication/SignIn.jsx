import React, {useState, useEffect} from 'react';
import { Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { auth } from "../../firebase/firebaseConfig.jsx";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import { useNavigation } from "@react-navigation/native";
import { colors, spacing, textStyles, formStyles, buttonStyles} from "./styles";
import Toast from 'react-native-toast-message';



const SignIn = () => {
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState('');
  const navigation = useNavigation();


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

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <TextInput
          onChangeText={onChangeText}
          placeholder="Correo electrónico"
        />
        <TextInput
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Contraseña"
        />

        <TouchableOpacity
                //onPress={() => handleLogin(0)}
                style={[buttonStyles.primary, { marginTop: spacing.large }]}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Registrarse
                </Text>
              </TouchableOpacity>


         <TouchableOpacity onPress={() => promptAsync({ useProxy: true })} disabled={!request}>
          <Image
            style={formStyles.googleButton}
            source={require("../../assets/images/logo_google.png")}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SignIn; 