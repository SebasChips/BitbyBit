import { auth } from "../../firebase/firebaseConfig.jsx";
import { collection, addDoc } from "firebase/firestore";


export const registrarUsuario = async () => {
    const user = auth.currentUser;
    const uid = user.uid;
    
    try {
      const docRef = await addDoc(collection(db, "usuarios"), {
        id: uid,
        nombre: "Sebastián",
        correo: "sebastian@example.com",
      });
      console.log("Documento escrito con ID: ", docRef.id);
    } catch (e) {
      console.error("Error al agregar documento: ", e);
    }
  };