import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDm91lCx59xcRF4YDc2HnIbUrFc0aNSKS0",
  authDomain: "db-vittah-clinic.firebaseapp.com",
  databaseURL: "https://db-vittah-clinic-default-rtdb.firebaseio.com",
  projectId: "db-vittah-clinic",
  storageBucket: "db-vittah-clinic.appspot.com",
  messagingSenderId: "1053014327250",
  appId: "1:1053014327250:web:914ec6e0894c4604b3d20b",
  measurementId: "G-HG18ERHVGB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);