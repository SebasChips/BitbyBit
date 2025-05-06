import React, {useState, useEffect} from 'react';
import { Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { auth } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword , GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import { useNavigation } from "@react-navigation/native";
import { colors, spacing, formStyles, buttonStyles} from "./styles";
import Toast from 'react-native-toast-message';


const  register = async(email, password) => {
  if(!email || !password){
    Toast.show({
      type: 'error',
      text1: 'Incorrecto',
      text2: 'No se permiten campos vacíos',
    });
    return;
  }
  //soy isidro
  // Verifica si el correo electrónico es válido
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    Toast.show({
      type: 'success',
      text1: 'Registro exitoso',
      text2: 'Inicia sesión con tu correo electrónico',
    });
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      Toast.show({
      type: 'error',
      text1: 'Correo ya en uso',
      text2: 'El correo electrónico ya está en uso, ingrese con su correo',
    });
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'El correo electrónico no es válido';
    } else if (error.code === 'auth/weak-password') {
      Toast.show({
        type: 'error',
        text1: 'Contraseña débil',
        text2: 'La contraseña debe tener al menos 6 caracteres',
      });
    }
    Toast.show({
      type: 'error',
      text1: error,
      text2: 'El correo electrónico ya está en uso, ingrese con su correo',
    });
 }



}
const SignIn = () => {
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

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <TextInput
          placeholder="Correo electrónico"
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Contraseña"
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity onPress={() => register(email, password)}
                style={[buttonStyles.primary, { marginTop: spacing.large }]}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Registrarse
                </Text>
        </TouchableOpacity>
  <TouchableOpacity
        onPress={() => navigation.navigate("login")}
        style={[buttonStyles.secondary, { marginBottom: spacing.large }]}
      >
        <Text style={{ color: colors.primary, textAlign: "center" }}>
          Inicio sesión
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