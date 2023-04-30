export default function loadUserPage(
  loadUserInfo,
  getProfilePicUrl,
  getUserName,
  signOut,
  loadUserMenu,
  getChaptersForCurrentUser,
  loadAllTasks,
  getTasksForCurrentUser,
  generateTaskElement,
  getTodaysTasksForCurrentUser,
  getThisWeeksTasksForCurrentUser
) {
  document.body.innerHTML = "";

  const mainContainer = document.createElement("main");
  const userInfo = document.createElement("div");
  const userMenu = document.createElement("div");
  const panel = document.createElement("div");
  const title = document.createElement("h1");

  title.innerText = 'All Tasks'

  mainContainer.id = "main-container";
  userInfo.id = "user-info";
  userMenu.id = "user-menu";
  panel.id = "panel";

  panel.appendChild(title);

  loadUserInfo(userInfo, getProfilePicUrl, getUserName, signOut);
  loadUserMenu(userMenu, getChaptersForCurrentUser, panel, getTasksForCurrentUser, getTodaysTasksForCurrentUser, getThisWeeksTasksForCurrentUser);
  loadAllTasks(panel, getTasksForCurrentUser, generateTaskElement)

  mainContainer.appendChild(userInfo);
  mainContainer.appendChild(userMenu);
  mainContainer.appendChild(panel);

  document.body.appendChild(mainContainer);
}
