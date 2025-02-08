// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBjI9yWKtgHZ7i3BIIlxCcj7MKOeagxmeI",
    authDomain: "hablemos-fb102.firebaseapp.com",
    projectId: "hablemos-fb102",
    storageBucket: "hablemos-fb102.firebasestorage.app",
    messagingSenderId: "535333248399",
    appId: "1:535333248399:web:12eebbe87c17fdb6b5bffa",
    measurementId: "G-99T76KXY6P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
///OJO CON LAS CONSULTAS