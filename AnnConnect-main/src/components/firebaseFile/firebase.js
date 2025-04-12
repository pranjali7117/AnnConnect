import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpmfdGONGwhgRZ-OzbCFFmCvEHnHRv7kI",
  authDomain: "annaconnect-2a96b.firebaseapp.com",
  projectId: "annaconnect-2a96b",
  storageBucket: "annaconnect-2a96b.appspot.com",
  messagingSenderId: "354254415141",
  appId: "1:354254415141:web:a92fd17f89b127718c26cc",
  measurementId: "G-V93DGDMJ15",
  databaseURL: "https://annaconnect-2a96b-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const googleProvider = new GoogleAuthProvider();
auth.languageCode = "en";
auth.appVerificationDisabledForTesting = true;
const imgDB = getStorage(app);
const db = getFirestore(app);
export { imgDB, db };
export {
  auth,
  googleProvider,
  database,
  RecaptchaVerifier,
  signInWithPhoneNumber,
};
