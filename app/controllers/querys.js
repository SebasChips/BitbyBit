import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import Toast from 'react-native-toast-message';
import { auth, db } from "../firebase/firebaseConfig";

export const registerUser = async (email, nameKid, nameTutor, bornDateKid) => {
  const user = auth.currentUser;
  const uid = user.uid;

  if (!email || !nameKid || !nameTutor || !bornDateKid) {
     Toast.show({
            type: 'error',
            text1: 'Faltan campos',
            text2: 'Por favor completa todos los campos',
          });
    return;
  }   
  
  try {
    await setDoc(doc(db, "users", uid), {
      bornDateKid: bornDateKid,
      currentLesson: "lesson1",
      email: email,
      nameKid: nameKid,
      nameTutor: nameTutor,
      streak: 0,
      exp: 0,
    });
    
    await addDoc(collection(db, "users", "lesson1", "lessonProgress"), {
      attempts: 0,
      completed: false,
      levelLesson: 1,
      score: 0,
    });
    
    console.log("Usuario registrado correctamente");

  } catch (e) {
    console.log("Error al agregar documento: ", e);
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'No se pudo registrar el usuario',
    });
  }
};