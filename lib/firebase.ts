import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXKF_IbV0J0A24lPqsf31dnEhUUBPC73g",
  authDomain: "fireship-nextjs-course-87ee7.firebaseapp.com",
  projectId: "fireship-nextjs-course-87ee7",
  storageBucket: "fireship-nextjs-course-87ee7.appspot.com",
  messagingSenderId: "503601947386",
  appId: "1:503601947386:web:216011d64e2bfb4ef55f43",
  measurementId: "G-LDPZWP0514",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// export const storageRef = ref(storage);
export const googleAuthProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const userDoc = (await getDocs(q)).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
