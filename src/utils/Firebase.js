
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZX0YzjOrnRae5XtkB7ctPk2xLxJIJYjE",
  authDomain: "netflixgpt-c6e0a.firebaseapp.com",
  projectId: "netflixgpt-c6e0a",
  storageBucket: "netflixgpt-c6e0a.firebasestorage.app",
  messagingSenderId: "479025150968",
  appId: "1:479025150968:web:76ec70ee45ec3fe7baf40d",
  measurementId: "G-723Q76VR48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();