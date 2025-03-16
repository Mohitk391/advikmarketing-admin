// Import necessary Firebase Storage functions
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCq7DRmXMX2r979gSEzJJjx-FyBCN76DYI",
  authDomain: "advik-marketing.firebaseapp.com",
  projectId: "advik-marketing",
  storageBucket: "advik-marketing.appspot.com",
  messagingSenderId: "226601983329",
  appId: "1:226601983329:web:2fbff7f53b982ea6bdf920",
  measurementId: "G-1Y2FHHVQ09"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Storage
export const storage = getStorage(app);
