import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyAGo4II_tPraNlf8UmiG89FnxPSlZ5bMxU",
  authDomain: "crypto-study-d75aa.firebaseapp.com",
  projectId: "crypto-study-d75aa",
  storageBucket: "crypto-study-d75aa.appspot.com",
  messagingSenderId: "598368452678",
  appId: "1:598368452678:web:68b76588cfc4dbd5070a47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
const db = getFirestore(app);

export default auth;
export {db};
