



import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAqu-PSjQwbHft1TDkRvnwWujPfeZuYJHE",
  authDomain: "ai-grievance-resolver.firebaseapp.com",
  projectId: "ai-grievance-resolver",
  appId: "1:1025360911262:web:5f69f3b546b900460d948f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
