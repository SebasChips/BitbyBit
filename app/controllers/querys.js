import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import Toast from 'react-native-toast-message';
import { auth, db } from "../firebase/firebaseConfig";

export const registerUser = async (email, nameKid, nameTutor, bornDateKid, navigation) => {
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
      bornDateKid,
      currentLesson: "lesson1",
      email,
      nameKid,
      nameTutor,
      streak: 0,
      xp: 0,
    });

    await setDoc(doc(db, "users", uid, "lessonsProgress", "lesson1"), {
      attempts: 0,
      completed: false,
      levelLesson: 1,
      score: 0,
    });

    navigation.navigate("Main");
  } catch (e) {
    console.log("Error al agregar documento: ", e);
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'No se pudo registrar el usuario',
    });
  }
};