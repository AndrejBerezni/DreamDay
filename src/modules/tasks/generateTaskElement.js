import { editTaskForm } from "./taskForm";
import {
  deleteTask,
  getTasksForCurrentUser,
  getTodaysTasksForCurrentUser,
  getThisWeeksTasksForCurrentUser,
  updateTaskCompleted,
} from "../..";
import { loadTasks } from "./loadTasks";
import { addTitleToSection } from "../userpage/panelheader";

export default function generateTaskElement(task, container) {
  const panel = document.getElementById("panel");
  const tasksContainer = document.getElementById("tasks-container");
  const sectionTitle = document.getElementById("section-title");

  const taskDiv = document.createElement("div");
  const taskDivLeft = document.createElement("div");
  const taskDivRight = document.createElement("div");

  taskDiv.classList.add("task-div");
  taskDivLeft.classList.add("task-div-left");
  taskDivRight.classList.add("task-div-right");

  const titleDateDiv = document.createElement("div");
  titleDateDiv.classList.add("title-date-div");

  const taskTitle = document.createElement("h1");
  const taskDescription = document.createElement("p");
  const taskChapter = document.createElement("h3");
  const taskDate = document.createElement("h2");
  const taskPriority = document.createElement("div");

  taskTitle.innerText = task.title;
  taskDescription.innerText = task.description;
  taskChapter.innerText = `Chapter: ${task.chapter}`;
  taskDate.innerText = task.dueDate.toDate().toDateString();

  if (task.priority === "1") {
    taskPriority.style.backgroundColor = "#FF4136";
  } else if (task.priority === "2") {
    taskPriority.style.backgroundColor = "#FF851B";
  } else if (task.priority === "3") {
    taskPriority.style.backgroundColor = "#FFDC00";
  } else if (task.priority === "4") {
    taskPriority.style.backgroundColor = "#2ECC40";
  } else if (task.priority === "5") {
    taskPriority.style.backgroundColor = "#7FDBFF";
  }

  const taskComplete = document.createElement("icon");
  const taskEdit = document.createElement("icon");
  const taskDelete = document.createElement("icon");

  /* Creating containers to place icons inside them because
    event listeners did not work on icons them selves - no error was thrown,
    but my assumption is that it has to do with how Font Awesome icons are
    being handled by Webpack - they are converted to SVG */
  const taskCompleteContainer = document.createElement("icon");
  const taskEditContainer = document.createElement("icon");
  const taskDeleteContainer = document.createElement("icon");

  if (task.complete) {
    taskComplete.classList.add("far", "fa-check-square");
    taskComplete.style.color = "green";
    taskTitle.style.textDecoration = "line-through";
  } else {
    taskComplete.classList.add("far", "fa-square");
  }

  taskEdit.classList.add("far", "fa-edit");
  taskDelete.classList.add("fas", "fa-trash");
  // Function to reload tasks when task is updated or deleted:
  async function reloadTasks() {
    if (sectionTitle.innerText === "All Tasks") {
      tasksContainer.innerHTML = "";
      await loadTasks(
        tasksContainer,
        getTasksForCurrentUser,
        generateTaskElement
      );
    } else if (sectionTitle.innerText === "Today's Tasks") {
      tasksContainer.innerHTML = "";
      await loadTasks(
        tasksContainer,
        getTodaysTasksForCurrentUser,
        generateTaskElement
      );
    } else if (sectionTitle.innerText === "This Week") {
      tasksContainer.innerHTML = "";
      await loadTasks(
        tasksContainer,
        getThisWeeksTasksForCurrentUser,
        generateTaskElement
      );
    }
  }
  taskCompleteContainer.addEventListener("click", async () => {
    if (task.complete) {
      taskComplete.classList.remove("fa-check-square");
      taskComplete.classList.add("fa-square");
    } else {
      taskComplete.classList.remove("fa-square");
      taskComplete.classList.remove("fa-check-square");
    }
    await updateTaskCompleted(task);
    await reloadTasks();
  });
  taskEditContainer.addEventListener("click", () => {
    editTaskForm(task);
  });

  taskDeleteContainer.addEventListener("click", () => {
    const confirmDeletionBox = document.createElement("div");
    const deletionBoxText = document.createElement("p");
    const deletionButtonsDiv = document.createElement("div");
    const confirmDeletionButton = document.createElement("button");
    const cancelDeletionButton = document.createElement("button");

    confirmDeletionBox.id = "confirm-task-deletion-box";

    deletionBoxText.innerText =
      "Are you sure that you want to delete this task?";
    confirmDeletionButton.innerText = "Yes";
    cancelDeletionButton.innerText = "No";

    cancelDeletionButton.addEventListener("click", () => {
      document.body.removeChild(confirmDeletionBox);
    });

    confirmDeletionButton.addEventListener("click", async () => {
      await deleteTask(task.title);
      document.body.removeChild(confirmDeletionBox);
      await reloadTasks();
    });

    deletionButtonsDiv.appendChild(cancelDeletionButton);
    deletionButtonsDiv.appendChild(confirmDeletionButton);

    confirmDeletionBox.appendChild(deletionBoxText);
    confirmDeletionBox.appendChild(deletionButtonsDiv);

    document.body.appendChild(confirmDeletionBox);
  });

  titleDateDiv.appendChild(taskTitle);
  titleDateDiv.appendChild(taskPriority);
  titleDateDiv.appendChild(taskDate);

  taskDivLeft.appendChild(titleDateDiv);
  taskDivLeft.appendChild(taskDescription);
  taskDivLeft.appendChild(taskChapter);

  taskCompleteContainer.appendChild(taskComplete);
  taskEditContainer.appendChild(taskEdit);
  taskDeleteContainer.appendChild(taskDelete);

  taskDivRight.appendChild(taskCompleteContainer);
  taskDivRight.appendChild(taskEditContainer);
  taskDivRight.appendChild(taskDeleteContainer);

  taskDiv.appendChild(taskDivLeft);
  taskDiv.appendChild(taskDivRight);

  container.appendChild(taskDiv);
}
