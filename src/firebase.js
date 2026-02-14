import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDxQDx3wPVQoZ7y76NOtmUsR3IDr5ofMAA",
    authDomain: "ecom-web-app-4f788.firebaseapp.com",
    projectId: "ecom-web-app-4f788",
    storageBucket: "ecom-web-app-4f788.firebasestorage.app",
    messagingSenderId: "632838891522",
    appId: "1:632838891522:web:9d3f8b7faf879e7d29df1b",
    measurementId: "G-M85XMZ47TS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export default app;
