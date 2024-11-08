// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAGd7i3Yjd-SVgFbJzRm1c5cGiO62rSURo",
  authDomain: "dailyline-a5a11.firebaseapp.com",
  databaseURL: "https://dailyline-a5a11-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dailyline-a5a11",
  storageBucket: "dailyline-a5a11.firebasestorage.app",
  messagingSenderId: "928558833605",
  appId: "1:928558833605:web:0379460b40f6b5653bf5ac"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
