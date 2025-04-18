import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getStorage } from "firebase/storage"; // Import Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCq7DRmXMX2r979gSEzJJjx-FyBCN76DYI",
  authDomain: "advik-marketing.firebaseapp.com",
  projectId: "advik-marketing",
  storageBucket: "advik-marketing.firebasestorage.app",
  messagingSenderId: "226601983329",
  appId: "1:226601983329:web:2fbff7f53b982ea6bdf920",
  measurementId: "G-1Y2FHHVQ09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app, "gs://advik-marketing.appspot.com");

export { db, storage };
