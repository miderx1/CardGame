// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD2LyOkxqq2lhlXBS4Q2z410srK59qkd2Y",
    authDomain: "cards-b6f4d.firebaseapp.com",
    projectId: "cards-b6f4d",
    storageBucket: "cards-b6f4d.appspot.com",
    messagingSenderId: "312507772957",
    appId: "1:312507772957:web:1879707ad7be9fd6a556f4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;