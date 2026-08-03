import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD6eSEoIjVbiqcer9QAIL-X1GbuTk8zcLg",
    authDomain: "all-bengal-driver-mahasangha.firebaseapp.com",
    projectId: "all-bengal-driver-mahasangha",
    storageBucket: "all-bengal-driver-mahasangha.firebasestorage.app",
    messagingSenderId: "25658324727",
    appId: "1:25658324727:web:db006af52f980e221a85f2",
    measurementId: "G-MJNR0CZWCM",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;