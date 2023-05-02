import { addTitleToSection } from "./panelheader";
import loadUserInfo from "./userinfo";
import loadUserMenu from "./usermenu";
import { loadAllTasks } from "../tasks/loadAllTasks";
import generateTaskElement from "../tasks/generateTaskElement";

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

  mainContainer.id = "main-container";
  userInfo.id = "user-info";
  userMenu.id = "user-menu";
  panel.id = "panel";

  addTitleToSection('All Tasks', panel)

  loadUserInfo(userInfo, getProfilePicUrl, getUserName, signOut);
  loadUserMenu(userMenu, getChaptersForCurrentUser, panel, getTasksForCurrentUser, getTodaysTasksForCurrentUser, getThisWeeksTasksForCurrentUser);
  loadAllTasks(panel, getTasksForCurrentUser, generateTaskElement)

  mainContainer.appendChild(userInfo);
  mainContainer.appendChild(userMenu);
  mainContainer.appendChild(panel);

  document.body.appendChild(mainContainer);
}
