// Firebase
import { initializeApp } from 'firebase/app';

import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAW2gYDPWui37zgOmY8jgsb__StblMz2zs",
  authDomain: "dream-day-658b0.firebaseapp.com",
  projectId: "dream-day-658b0",
  storageBucket: "dream-day-658b0.appspot.com",
  messagingSenderId: "58217787175",
  appId: "1:58217787175:web:2c42d044802d763a070302"
}; 

const app = initializeApp(firebaseConfig);

// Firebase Authentication
async function signIn() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
};

function signOutUser() {
  signOut(getAuth());
};

function initFirebaseAuth() {
  onAuthStateChanged(getAuth(), user => {
    if (user) {
      loadUserPage();
    }
  });
};

initFirebaseAuth();

function getProfilePicUrl() {
  return getAuth().currentUser.photoURL || '/images/profile_placeholder.png';
};

function getUserName() {
  return getAuth().currentUser.displayName;
};

function isUserSignedIn() {
  return !!getAuth().currentUser;
};

import './style.css';
import loadHome from './modules/homepage';
import loadUserPage from './modules/userpage';


loadHome(signIn);
// loadUserPage()
