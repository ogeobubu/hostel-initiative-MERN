import firebase from "firebase";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyAcs9Zc5RC6j54sE8P3Ru4EWEquUn74yZ0",
  authDomain: "hostel-initiative.firebaseapp.com",
  projectId: "hostel-initiative",
  storageBucket: "hostel-initiative.appspot.com",
  messagingSenderId: "285610064220",
  appId: "1:285610064220:web:b43dcc0f50a8e302a6e999",
  measurementId: "G-RKPQ3SEM36",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

const auth = firebase.auth();

export const storage = firebase.storage();

export const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { auth };

export { database };
