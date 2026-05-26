import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

// REEMPLAZA CON LA CONFIGURACIÓN DE TU PROYECTO DE FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyAQi_Q4Nm0Uc4y3Bxm9VZEAkFuZEempXLw",
  authDomain: "ia-para-psicologos.firebaseapp.com",
  projectId: "ia-para-psicologos",
  storageBucket: "ia-para-psicologos.firebasestorage.app",
  messagingSenderId: "7449051134",
  appId: "1:7449051134:web:95e6e9f8b189407ddc8aaf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, onAuthStateChanged, signOut };
