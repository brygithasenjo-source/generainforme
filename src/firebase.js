// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Reemplaza esto con TU configuración real de Firebase
const firebaseConfig = {
apiKey: "AIzaSyAQi_Q4Nm0Uc4y3Bxm9VZEAkFuZEempXLw",
  authDomain: "ia-para-psicologos.firebaseapp.com",
  projectId: "ia-para-psicologos",
  storageBucket: "ia-para-psicologos.firebasestorage.app",
  messagingSenderId: "7449051134",
  appId: "1:7449051134:web:95e6e9f8b189407ddc8aaf"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar y exportar la Autenticación
export const auth = getAuth(app);
