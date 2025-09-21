import app from '../firebase';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Example hook that provides auth, firestore, and storage instances
const useFirebase = () => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  return { app, auth, db, storage };
};

export default useFirebase;
