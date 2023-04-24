import './style.css';
import loadHome from './modules/homepage';
import loadUserPage from './modules/userpage/userpage';
import loadUserInfo from './modules/userpage/userinfo';
import loadUserMenu from './modules/userpage/usermenu';

// Font awesome:
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';


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
  where,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  getDocs,
  getDoc,
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
const db = getFirestore(app);

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
      const chapters = getChaptersForCurrentUser()
      loadUserPage(loadUserInfo, getProfilePicUrl, getUserName, signOutUser, loadUserMenu, chapters);
      console.log(`user id is: ${getAuth().currentUser.uid}`);
    } else {
      loadHome(signIn);
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

//Firestore

async function getChaptersForCurrentUser() {
  const chaptersArray = []
  const currentUserID = getAuth().currentUser.uid;
  const q = query(collection(db, 'Chapters'), where('userId', '==', currentUserID));
  const querySnapshot =  await getDocs(q);
  querySnapshot.forEach((doc) => {
    chaptersArray.push(doc.data().name);
  });
  return chaptersArray
};

getChaptersForCurrentUser()



