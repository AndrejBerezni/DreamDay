import addTaskForm from "./taskForm";
import {
  deleteTask,
  getTasksForCurrentUser,
  getTodaysTasksForCurrentUser,
  getThisWeeksTasksForCurrentUser,
  updateTaskCompleted,
  getTasksFromChapter,
} from "../..";
import { loadTasks, loadChapterTasks } from "./loadTasks";

export default function generateTaskElement(task, container) {
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
  const priorityDateDiv = document.createElement("div");
  priorityDateDiv.classList.add("priority-date-div");

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
    taskPriority.innerText = '1';
  } else if (task.priority === "2") {
    taskPriority.style.backgroundColor = "#FF851B";
    taskPriority.innerText = '2';
  } else if (task.priority === "3") {
    taskPriority.style.backgroundColor = "#FFDC00";
    taskPriority.innerText = '3';
  } else if (task.priority === "4") {
    taskPriority.style.backgroundColor = "#2ECC40";
    taskPriority.innerText = '4';
  } else if (task.priority === "5") {
    taskPriority.style.backgroundColor = "#7FDBFF";
    taskPriority.innerText = '5';
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
    taskComplete.style.filter = "none"
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
    } else {
      const chapter = sectionTitle.innerText
      tasksContainer.innerHTML = "";
      await loadChapterTasks(
        tasksContainer,
        getTasksFromChapter,
        chapter,
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
    addTaskForm(true, task);
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

  priorityDateDiv.appendChild(taskPriority);
  priorityDateDiv.appendChild(taskDate);
  titleDateDiv.appendChild(taskTitle);
  titleDateDiv.appendChild(priorityDateDiv);


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
