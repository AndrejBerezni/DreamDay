import { addTitleToSection } from "./panelheader";
import loadUserInfo from "./userinfo";
import loadUserMenu from "./usermenu";
import { loadTasks } from "../tasks/loadTasks";
import generateTaskElement from "../tasks/generateTaskElement";
import { createChapter } from "../..";

export default function loadUserPage(
  getProfilePicUrl,
  getUserName,
  signOut,
  getChaptersForCurrentUser,
  getTasksForCurrentUser,
  getTodaysTasksForCurrentUser,
  getThisWeeksTasksForCurrentUser
) {
  document.body.innerHTML = "";

  const mainContainer = document.createElement("main");
  const userInfo = document.createElement("div");
  const userMenu = document.createElement("div");
  const panel = document.createElement("div");
  const tasksContainer = document.createElement("div");

  mainContainer.id = "main-container";
  userInfo.id = "user-info";
  userMenu.id = "user-menu";
  panel.id = "panel";
  tasksContainer.id ="tasks-container";
  
  createChapter('General');

  addTitleToSection('All Tasks', panel);

  loadUserInfo(userInfo, getProfilePicUrl, getUserName, signOut);
  loadUserMenu(userMenu, getChaptersForCurrentUser, panel, getTasksForCurrentUser, getTodaysTasksForCurrentUser, getThisWeeksTasksForCurrentUser);
  loadTasks(tasksContainer, getTasksForCurrentUser, generateTaskElement);

  panel.appendChild(tasksContainer);

  mainContainer.appendChild(userInfo);
  mainContainer.appendChild(userMenu);
  mainContainer.appendChild(panel);

  document.body.appendChild(mainContainer);
}
