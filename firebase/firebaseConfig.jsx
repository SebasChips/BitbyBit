import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';



const firebaseConfig = {

    apiKey: "AIzaSyAtgFzu4d0UnmO_58extwYguw_Wdq8nYpk",
  
    authDomain: "bit-by-bit-a7551.firebaseapp.com",
  
    projectId: "bit-by-bit-a7551",
  
    storageBucket: "bit-by-bit-a7551.firebasestorage.app",
  
    messagingSenderId: "61966159852",
  
    appId: "1:61966159852:web:86adbac623cc5a180d7ac9",
  
    measurementId: "G-X9N6DDYP0D"
  
  };
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app, auth};
