import generateTaskElement from "../tasks/generateTaskElement";
import { loadTasks, loadChapterTasks } from "../tasks/loadTasks";
import { addTitleToSection } from "./panelheader";
import {
  getTasksForCurrentUser,
  getTodaysTasksForCurrentUser,
  getThisWeeksTasksForCurrentUser,
  getTasksFromChapter,
  getChaptersForCurrentUser
} from "../..";

export default async function loadUserMenu(
  container,
  panel
) {
  // Create elements:
  const homeButton = document.createElement("button");
  const todayButton = document.createElement("button");
  const thisWeekButton = document.createElement("button");
  const chaptersButton = document.createElement("button");
  const notesButton = document.createElement("button");

  const homeIcon = document.createElement("icon");
  const todayIcon = document.createElement("icon");
  const thisWeekIcon = document.createElement("icon");
  const chaptersIcon = document.createElement("icon");
  const notesIcon = document.createElement("icon");

  homeButton.classList.add("user-menu-button");
  todayButton.classList.add("user-menu-button");
  thisWeekButton.classList.add("user-menu-button");
  chaptersButton.classList.add("user-menu-button");
  notesButton.classList.add("user-menu-button");

  homeButton.innerText = "Home";
  todayButton.innerText = "Today";
  thisWeekButton.innerText = "This Week";
  chaptersButton.innerText = "Chapters";
  notesButton.innerText = "Notes";

  homeIcon.classList.add("user-menu-icon", "fas", "fa-home");
  todayIcon.classList.add("user-menu-icon", "far", "fa-calendar-check");
  thisWeekIcon.classList.add("user-menu-icon", "far", "fa-calendar-alt");
  chaptersIcon.classList.add("user-menu-icon", "fas", "fa-tags");
  notesIcon.classList.add("user-menu-icon", "far", "fa-sticky-note");

  const chaptersList = document.createElement("div");
  chaptersList.id = "user-menu-chapters-list";
  chaptersList.classList.toggle("hidden");

  // Load chapters and create event listener to load tasks from chapter
  const chapters = await getChaptersForCurrentUser();

  chapters.forEach((element) => {
    const chapterElement = document.createElement("button");
    chapterElement.innerText = element;
    chapterElement.classList.add("user-menu-chapter");

    chapterElement.addEventListener("click", async () => {
      panel.innerHTML = "";
      addTitleToSection(element, panel);
      const tasksContainer = document.createElement("div");
      tasksContainer.id = "tasks-container";
      panel.appendChild(tasksContainer);
      await loadChapterTasks(
        tasksContainer,
        getTasksFromChapter,
        element,
        generateTaskElement
      );
    });
    chaptersList.appendChild(chapterElement);
  });

  const homeDiv = document.createElement("div");
  const todayDiv = document.createElement("div");
  const thisWeekDiv = document.createElement("div");
  const chaptersDiv = document.createElement("div");
  const notesDiv = document.createElement("div");

  homeDiv.classList.add("user-menu-div");
  todayDiv.classList.add("user-menu-div");
  thisWeekDiv.classList.add("user-menu-div");
  chaptersDiv.classList.add("user-menu-div");
  notesDiv.classList.add("user-menu-div");

  chaptersDiv.addEventListener("click", () => {
    chaptersList.classList.toggle("hidden");
    chaptersIcon.classList.remove("fa-angle-right");
    chaptersIcon.classList.add("fa-angle-down");
  });

  // Load tasks on click of menu button:

  homeDiv.addEventListener("click", async () => {
    panel.innerHTML = "";
    addTitleToSection("All Tasks", panel);
    const tasksContainer = document.createElement("div");
    tasksContainer.id = "tasks-container";
    panel.appendChild(tasksContainer);
    await loadTasks(tasksContainer, getTasksForCurrentUser, generateTaskElement);
  });

  todayDiv.addEventListener("click", async () => {
    panel.innerHTML = "";
    addTitleToSection("Today's Tasks", panel);
    const tasksContainer = document.createElement("div");
    tasksContainer.id = "tasks-container";
    panel.appendChild(tasksContainer);
    await loadTasks(tasksContainer, getTodaysTasksForCurrentUser, generateTaskElement);
  });

  thisWeekDiv.addEventListener("click", async () => {
    panel.innerHTML = "";
    addTitleToSection("This Week", panel);
    const tasksContainer = document.createElement("div");
    tasksContainer.id = "tasks-container";
    panel.appendChild(tasksContainer);
    await loadTasks(
      tasksContainer,
      getThisWeeksTasksForCurrentUser,
      generateTaskElement
    );
  });

  homeDiv.appendChild(homeIcon);
  homeDiv.appendChild(homeButton);

  todayDiv.appendChild(todayIcon);
  todayDiv.appendChild(todayButton);

  thisWeekDiv.appendChild(thisWeekIcon);
  thisWeekDiv.appendChild(thisWeekButton);

  chaptersDiv.appendChild(chaptersIcon);
  chaptersDiv.appendChild(chaptersButton);

  notesDiv.appendChild(notesIcon);
  notesDiv.appendChild(notesButton);

  container.appendChild(homeDiv);
  container.appendChild(todayDiv);
  container.appendChild(thisWeekDiv);
  container.appendChild(chaptersDiv);
  container.appendChild(chaptersList);
  container.appendChild(notesDiv);
}
