// lib/firebase.ts
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDwpmYmOjIdNNNUp5fw96GDNkzFDVLwEYs",
  authDomain: "nutriapp-42e7f.firebaseapp.com",
  projectId: "nutriapp-42e7f",
  storageBucket: "nutriapp-42e7f.appspot.com", // corrigido: era .app, o correto é .app**spot**.com
  messagingSenderId: "190772156418",
  appId: "1:190772156418:web:b219b0de024ff64eff2f1b",
  measurementId: "G-WBCCG3QN9D"
}

// Inicializa o app
const app = initializeApp(firebaseConfig)

// Exporte Firestore e Storage para uso
export const db = getFirestore(app)
export const storage = getStorage(app)
