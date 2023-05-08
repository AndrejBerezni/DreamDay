import "./styles/style.css";
import loadHome from "./modules/homepage/homepage";
import loadUserPage from "./modules/userpage/userpage";
import noteForm from "./modules/notes/noteForm";

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
  signInWithRedirect,
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
  Timestamp,
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
const provider = new GoogleAuthProvider();
const auth = getAuth();

// Firebase Authentication
async function signIn() {
  await signInWithRedirect(auth, provider);
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
        getTasksForCurrentUser
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
    chaptersArray.push(doc.data().title);
  });
  return chaptersArray;
}

async function getTasksForCurrentUser() {
  let tasksArray = [];
  const currentUserID = await getAuth().currentUser.uid;
  const q = query(
    collection(db, "Tasks"),
    where("userId", "==", currentUserID),
    orderBy("complete"),
    orderBy("dueDate")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    tasksArray.push(doc.data());
  });
  return tasksArray;
}

// Variables to use in functions to get tasks for today and current week
const today = new Date();
const dayOfWeek = today.getDay();
const startOfToday = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate()
);
const tomorrow = new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000);
const startOfWeek = new Date(today.getTime() - dayOfWeek * 24 * 60 * 60 * 1000);
const endOfWeek = new Date(
  today.getTime() + (7 - dayOfWeek) * 24 * 60 * 60 * 1000
);

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
}

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
}

async function getTasksFromChapter(chapter) {
  let tasksArray = [];
  const currentUserID = await getAuth().currentUser.uid;
  const q = query(
    collection(db, "Tasks"),
    where("userId", "==", currentUserID),
    where("chapter", "==", chapter)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    tasksArray.push(doc.data());
  });
  return tasksArray;
}

// Write data

/*According to the Firebase documentation, if document already exists,
it will be overwritten, which means that this function can work for both
add and edit task functionalities */

async function handleTaskForm(task) {
  const timestamp = Timestamp.fromDate(new Date(task.dueDate));

  await setDoc(doc(db, "Tasks", task.title), {
    userId: await getAuth().currentUser.uid,
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: timestamp,
    complete: task.complete,
    chapter: task.chapter,
  });
}

async function deleteTask(taskTitle) {
  await deleteDoc(doc(db, "Tasks", taskTitle));
}

async function updateTaskCompleted(task) {
  const taskDoc = doc(db, "Tasks", task.title);
  await updateDoc(taskDoc, {
    complete: !task.complete,
  });
}

async function createChapter(chapterTitle) {
  await setDoc(doc(db, "Chapters", chapterTitle), {
    title: chapterTitle,
    userId: await getAuth().currentUser.uid
  });
}

async function createNote(note) {
  await setDoc(doc(db, 'Notes', note.title), {
    title: note.title,
    text: note.text,
    userId: await getAuth().currentUser.uid
  })
}

async function deleteNote(noteTitle) {
  await deleteDoc(doc(db, "Tasks", noteTitle));
}

export {
  handleTaskForm,
  deleteTask,
  getTasksForCurrentUser,
  getTodaysTasksForCurrentUser,
  getThisWeeksTasksForCurrentUser,
  updateTaskCompleted,
  createChapter,
  createNote,
  deleteNote,
  getChaptersForCurrentUser,
  getTasksFromChapter,
};
