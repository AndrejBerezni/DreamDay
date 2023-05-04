import "./style.css";
import loadHome from "./modules/homepage/homepage";
import loadUserPage from "./modules/userpage/userpage";
import loadUserInfo from "./modules/userpage/userinfo";
import loadUserMenu from "./modules/userpage/usermenu";
import {loadAllTasks, loadTodaysTasks} from "./modules/tasks/loadAllTasks";
import generateTaskElement from "./modules/tasks/generateTaskElement";
import {addTaskForm, editTaskForm} from "./modules/tasks/taskForm";

// Font awesome:
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

// Firebase
import { initializeApp } from "firebase/app";

import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

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
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAW2gYDPWui37zgOmY8jgsb__StblMz2zs",
  authDomain: "dream-day-658b0.firebaseapp.com",
  projectId: "dream-day-658b0",
  storageBucket: "dream-day-658b0.appspot.com",
  messagingSenderId: "58217787175",
  appId: "1:58217787175:web:2c42d044802d763a070302",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firebase Authentication
async function signIn() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

function signOutUser() {
  signOut(getAuth());
}

function initFirebaseAuth() {
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      loadUserPage(
        getProfilePicUrl,
        getUserName,
        signOutUser,
        getChaptersForCurrentUser,
        getTasksForCurrentUser,
        getTodaysTasksForCurrentUser,
        getThisWeeksTasksForCurrentUser
      );
    } else {
      loadHome(signIn);
    }
  });
}

initFirebaseAuth();

function getProfilePicUrl() {
  return getAuth().currentUser.photoURL;
}

function getUserName() {
  return getAuth().currentUser.displayName;
}

function isUserSignedIn() {
  return !!getAuth().currentUser;
}

//Firestore
// Get data

async function getChaptersForCurrentUser() {
  let chaptersArray = [];
  const currentUserID = getAuth().currentUser.uid;
  const q = query(
    collection(db, "Chapters"),
    where("userId", "==", currentUserID)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    chaptersArray.push(doc.data().name);
  });
  return chaptersArray;
}

async function getTasksForCurrentUser() {
  let tasksArray = [];
  const currentUserID = await getAuth().currentUser.uid;
  const q = query(
    collection(db, "Tasks"),
    where("userId", "==", currentUserID)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    tasksArray.push(doc.data());
  });
  return tasksArray;
};

// Variables to use in functions to get tasks for today and current week
const today = new Date();
const dayOfWeek = today.getDay();
const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const tomorrow = new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000);
const startOfWeek = new Date(today.getTime() - (dayOfWeek - 1) * 24 * 60 * 60 * 1000);
const endOfWeek = new Date(today.getTime() + (7 - dayOfWeek) * 24 * 60 * 60 * 1000);

async function getTodaysTasksForCurrentUser() {
  let tasksArray = [];
  const currentUserID = await getAuth().currentUser.uid;
  const q = query(
    collection(db, "Tasks"),
    where("userId", "==", currentUserID),
    where("dueDate", ">=", startOfToday),
    where("dueDate", "<", tomorrow)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    tasksArray.push(doc.data());
  });
  return tasksArray;
};

async function getThisWeeksTasksForCurrentUser() {
  let tasksArray = [];
  const currentUserID = await getAuth().currentUser.uid;
  const q = query(
    collection(db, "Tasks"),
    where("userId", "==", currentUserID),
    where("dueDate", ">=", startOfWeek),
    where("dueDate", "<", endOfWeek)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    tasksArray.push(doc.data());
  });
  return tasksArray;
};

// Write data

/*According to the Firebase documentation, if document already exists,
it will be overwritten, which means that this function can work for both
add and edit task functionalities */

async function handleTaskForm(task) {
  const timestamp = Timestamp.fromDate(new Date(task.dueDate));

  await setDoc(doc(db, 'Tasks', task.title), {
    userId: await getAuth().currentUser.uid,
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: timestamp,
    complete: task.complete
  });
}

async function deleteTask(taskTitle) {
  await deleteDoc(doc(db, "Tasks", taskTitle));
};

export {handleTaskForm, deleteTask, getTasksForCurrentUser, getTodaysTasksForCurrentUser, getThisWeeksTasksForCurrentUser}