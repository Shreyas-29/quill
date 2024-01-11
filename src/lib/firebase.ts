// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyClohecW6EWlryE_OTw9jl6IErAqFyYeDI",
    authDomain: "chat-gpt-clone-messenger.firebaseapp.com",
    projectId: "chat-gpt-clone-messenger",
    storageBucket: "chat-gpt-clone-messenger.appspot.com",
    messagingSenderId: "17568704215",
    appId: "1:17568704215:web:9c3596fc0426acdf00b292"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
