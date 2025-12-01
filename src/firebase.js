import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCjX-URS31AJjg43JV9D1OOpDuX-Ac9MWw",
    authDomain: "stumbleupon-4883f.firebaseapp.com",
    projectId: "stumbleupon-4883f",
    storageBucket: "stumbleupon-4883f.firebasestorage.app",
    messagingSenderId: "1018113249760",
    appId: "1:1018113249760:web:86b2d5a85609b507121b85"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);