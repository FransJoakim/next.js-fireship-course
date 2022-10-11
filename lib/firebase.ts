import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage, ref } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXKF_IbV0J0A24lPqsf31dnEhUUBPC73g",
  authDomain: "fireship-nextjs-course-87ee7.firebaseapp.com",
  projectId: "fireship-nextjs-course-87ee7",
  storageBucket: "fireship-nextjs-course-87ee7.appspot.com",
  messagingSenderId: "503601947386",
  appId: "1:503601947386:web:216011d64e2bfb4ef55f43",
};

const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();
export const auth = getAuth(app);

const db = getFirestore(app);
const storage = getStorage(app);
const storageRef = ref(storage);
