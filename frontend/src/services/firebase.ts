import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8bRm6JHKA7pJA3Kebo-q5JbQKdNi8pEs",
  authDomain: "civiciq-fc5b5.firebaseapp.com",
  projectId: "civiciq-fc5b5",
  storageBucket: "civiciq-fc5b5.firebasestorage.app",
  messagingSenderId: "419169133144",
  appId: "1:419169133144:web:8ed1dfbfcd3952c8f4202d",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);