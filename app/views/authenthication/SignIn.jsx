import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Platform, KeyboardAvoidingView, ScrollView, SafeAreaView, StatusBar } from "react-native";

import { auth, db } from "../../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from "@react-navigation/native";
import { RegisterEmailAndPass } from "../../controllers/auths";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import { doc, getDoc } from "firebase/firestore";

import { baseStyles, textStyles, formStyles, buttonStyles, imageStyles, scrollStyles, tagStyles, cardStyles, modalStyles } from "./styles.js";
import { colors, spacing, fontSizes, fontWeights, radii, opacities, layout, dimensions, imageSizes, shadows, zIndices, lineHeights, fontFamilies } from "../../constants/Theme";

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
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
    <SafeAreaView style={formStyles.container}>
      <StatusBar translucent={false} backgroundColor="white" barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={scrollStyles.container} keyboardShouldPersistTaps="handled">
          <View style={formStyles.container}>
            <Image source={require("../../assets/images/bitty.png")} style={imageStyles.avatarLarge} />

            <Text style={textStyles.heading}>¡Bienvenido!</Text>
            <Text style={textStyles.subheading}>Crea una cuenta para comenzar</Text>

            <View style={formStyles.formGroup}>
              <TextInput
                placeholder="Correo electrónico"
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={formStyles.input}
                placeholderTextColor={textStyles.body.color}
                textContentType="emailAddress"
              />
              <TextInput placeholder="Contraseña" onChangeText={setPassword} secureTextEntry style={formStyles.input} placeholderTextColor={textStyles.body.color} textContentType="password" />

              <TouchableOpacity onPress={() => RegisterEmailAndPass(email, password)} style={buttonStyles.primary}>
                <Text style={textStyles.buttonPrimary}>Registrarme</Text>
              </TouchableOpacity>
            </View>

            <Text style={[textStyles.body, { marginVertical: spacing.md }]}>— o registrate con —</Text>

            <View style={formStyles.socialLoginRow}>
              <TouchableOpacity onPress={() => promptAsync({ useProxy: true })} disabled={!request}>
                <Image source={require("../../assets/images/logo_google.png")} style={imageStyles.avatarSmall} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("login")}>
              <Text style={[textStyles.link, { marginTop: spacing.lg }]}>¿Ya tienes cuenta? Inicia sesión</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
