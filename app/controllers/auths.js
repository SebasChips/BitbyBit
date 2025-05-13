
import { auth } from "../firebase/firebaseConfig.jsx";
import { onAuthStateChanged,  } from "firebase/auth";
import Toast from 'react-native-toast-message';
import  {signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export const checkUserSession = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

export const logOut = async() => {
  try{
    await auth.signOut()
  }catch (error) {
    if (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }
};


export const LogInEmailAndPass = async (email, password, navigation) => {
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
    if (error.code === 'auth/invalid-credential') {
      Toast.show({
        type: 'error',
        text1: 'Contraseña y/o correo incorrecto',
      });
    }
    else {
     console.error("Error al iniciar sesión:", error);
    }
  }
};

export const RegisterEmailAndPass = async (email, password) => {
  if(!email || !password){
      Toast.show({
        type: 'error',
        text1: 'Incorrecto',
        text2: 'No se permiten campos vacíos',
      });
      return;
    }
  
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
   }

}
