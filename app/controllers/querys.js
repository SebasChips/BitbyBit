import { auth } from "../firebase/firebaseConfig.jsx";
import { collection, addDoc } from "firebase/firestore";


export const registrarUsuario = async (nombrePadre, correoPadre, nombreProgramador, apellidoProgramador) => {
    const user = auth.currentUser;
    const uid = user.uid;

     try {
      const docRef = await addDoc(collection(db, "tutores"), {
        nombre: nombrePadre,
        apellido: correoPadre,
      });
      idTutor = docRef.id;
    } catch (e) {
      console.error("Error al agregar documento: ", e);
    }

    try {
      const docRef = await addDoc(collection(db, "usuarios"), {
        id: uid,
        nombre: nombreProgramador,
        apellido: apellidoProgramador,
        exp: 0,
        leccionActial: 0,
        idTutor: idTutor,


      });
      console.log("Documento escrito con ID: ", docRef.id);
    } catch (e) {
      console.error("Error al agregar documento: ", e);
    }
  };

  