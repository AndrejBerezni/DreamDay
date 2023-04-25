export default function loadUserPage(
  loadUserInfo,
  getProfilePicUrl,
  getUserName,
  signOut,
  loadUserMenu,
  getChaptersForCurrentUser,
  loadAllTasks,
  getTasksForCurrentUser,
  generateTaskElement
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

  loadUserInfo(userInfo, getProfilePicUrl, getUserName, signOut);
  loadUserMenu(userMenu, getChaptersForCurrentUser);
  loadAllTasks(panel, getTasksForCurrentUser, generateTaskElement)

  mainContainer.appendChild(userInfo);
  mainContainer.appendChild(userMenu);
  mainContainer.appendChild(panel);

  document.body.appendChild(mainContainer);
}
