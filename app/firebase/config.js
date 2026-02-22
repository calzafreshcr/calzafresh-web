// app/firebase/config.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAX5wicH_1MULhbJG8OdOkGY4VU5gIsgiE",
  authDomain: "calzafresh-admin.firebaseapp.com",
  projectId: "calzafresh-admin",
  storageBucket: "calzafresh-admin.appspot.com",
  messagingSenderId: "1059710897448",
  appId: "1:1059710897448:web:94a413c1ed6d3df3c4d41d"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
