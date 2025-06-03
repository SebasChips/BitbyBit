import { doc, setDoc, getDoc } from "firebase/firestore";
import Toast from 'react-native-toast-message';
import { auth, db } from "../firebase/firebaseConfig";

export const registerUser = async (email, nameKid, nameTutor, bornDateKid, navigation, lastActivity) => {
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
      lastActivity,
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
export const getUserData = async () => {
  try {
    const session = auth.currentUser;
    if (!session) return null;
    
    const userId = session.uid;
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};