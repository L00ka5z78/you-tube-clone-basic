import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyD6YPm9afxDaXxF9bfvmUphqsh2BcDo4VU",
    authDomain: "video-10bc4.firebaseapp.com",
    projectId: "video-10bc4",
    storageBucket: "video-10bc4.appspot.com",
    messagingSenderId: "658077654890",
    appId: "1:658077654890:web:daa020196339fa9850cf13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;