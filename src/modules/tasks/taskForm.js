import Task from "../taskClass";
import {
  handleTaskForm,
  deleteTask,
  getTasksForCurrentUser,
  getTodaysTasksForCurrentUser,
  getThisWeeksTasksForCurrentUser,
  getChaptersForCurrentUser,
  getTasksFromChapter,
} from "../..";
import { loadTasks, loadChapterTasks } from "./loadTasks";
import { addTitleToSection } from "../userpage/panelheader";
import generateTaskElement from "./generateTaskElement";

export default async function addTaskForm(isEdit, task = null) {
  const panel = document.getElementById("panel");
  const sectionTitle = document.getElementById("section-title");
  // Create necessary elements:
  const taskForm = document.createElement("form");
  const title = document.createElement("input");
  const description = document.createElement("textarea");
  const priority = document.createElement("input");
  const dueDate = document.createElement("input");
  const complete = document.createElement("select");
  const completeYes = document.createElement("option");
  const completeNo = document.createElement("option");
  const chapter = document.createElement("select");
  const chapters = await getChaptersForCurrentUser();

  chapters.forEach((chap) => {
    const chapterElement = document.createElement("option");
    chapterElement.innerText = chap;
    chapterElement.setAttribute("value", chap);
    if (isEdit && task.chapter === chap) {
      chapterElement.setAttribute("selected", "");
    }
    chapter.appendChild(chapterElement);
  });

  const titleLabel = document.createElement("label");
  const descriptionLabel = document.createElement("label");
  const priorityLabel = document.createElement("label");
  const dueDateLabel = document.createElement("label");
  const completeLabel = document.createElement("label");
  const chapterLabel = document.createElement("label");

  const taskName = document.createElement("h1");
  const submitButton = document.createElement("button");
  const cancelButton = document.createElement("button");
  const buttonsDiv = document.createElement("div");

  // Add attributes to elements:

  taskForm.id = "task-form";

  taskName.innerText = isEdit ? "Edit Task" : "New Task";
  title.id = "task-form-title";
  title.setAttribute("type", "text");
  title.setAttribute("name", "task-form-title");
  title.setAttribute("required", "");
  title.value = isEdit ? task.title : "";

  titleLabel.setAttribute("for", "task-form-title");
  titleLabel.innerText = "Title";

  description.id = "task-form-description";
  description.setAttribute("name", "task-form-description");
  description.setAttribute("rows", "5");
  description.setAttribute("cols", "30");
  description.value = isEdit ? task.description : "";

  descriptionLabel.setAttribute("for", "task-form-title");
  descriptionLabel.innerText = "Description";

  priority.id = "task-form-priority";
  priority.setAttribute("type", "number");
  priority.setAttribute("name", "task-form-priority");
  priority.setAttribute("required", "");
  priority.setAttribute("min", "1");
  priority.setAttribute("max", "5");
  priority.value = isEdit ? task.priority : "3";

  priorityLabel.setAttribute("for", "task-form-priority");
  priorityLabel.innerText = "Priority";

  dueDate.id = "task-form-date";
  dueDate.setAttribute("type", "datetime-local");
  dueDate.setAttribute("name", "task-form-date");
  dueDate.setAttribute("required", "");
  dueDate.value = isEdit
    ? task.dueDate.toDate().toISOString().slice(0, 16)
    : "";

  dueDateLabel.setAttribute("for", "task-form-date");
  dueDateLabel.innerText = "Due Date";

  complete.id = "task-form-complete";
  complete.setAttribute("name", "task-form-complete");

  completeLabel.setAttribute("for", "task-form-complete");
  completeLabel.innerText = "Have you already completed this task?";

  completeNo.innerText = "No";
  completeNo.setAttribute("value", "no");
  completeYes.innerText = "Yes";
  completeYes.setAttribute("value", "yes");

  if (isEdit && task.complete === true) {
    completeYes.setAttribute("selected", "");
  } else {
    completeNo.setAttribute("selected", "");
  }

  chapterLabel.innerText = "Chapter";

  buttonsDiv.id = "form-buttons-div";

  submitButton.setAttribute("type", "submit");
  submitButton.innerText = "Submit";

  cancelButton.setAttribute("type", "button");
  cancelButton.innerText = "Cancel";

  // Append elements to form:
  buttonsDiv.appendChild(cancelButton);
  buttonsDiv.appendChild(submitButton);

  taskForm.appendChild(taskName);
  taskForm.appendChild(titleLabel);
  taskForm.appendChild(title);
  taskForm.appendChild(descriptionLabel);
  taskForm.appendChild(description);
  taskForm.appendChild(priorityLabel);
  taskForm.appendChild(priority);
  taskForm.appendChild(dueDateLabel);
  taskForm.appendChild(dueDate);
  complete.appendChild(completeNo);
  complete.appendChild(completeYes);
  taskForm.appendChild(completeLabel);
  taskForm.appendChild(complete);
  taskForm.appendChild(chapterLabel);
  taskForm.appendChild(chapter);
  taskForm.appendChild(buttonsDiv);

  // Handle submit:
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let completeValue;
    if (complete.value === "yes") {
      completeValue = true;
    } else if (complete.value === "no") {
      completeValue = false;
    }

    const newTask = new Task(
      title.value,
      description.value,
      completeValue,
      dueDate.value,
      priority.value,
      chapter.value
    );
    /* If titles do not match, new document will be created and we will have duplicates.
    This way we prevent that: */
    if (isEdit && task.title !== newTask.title) {
      await deleteTask(task.title);
    }

    await handleTaskForm(newTask);
    document.body.removeChild(taskForm);

    // Reload section with changes:
    if (sectionTitle.innerText === "All Tasks") {
      panel.innerHTML = "";
      addTitleToSection("All Tasks", panel);
      const tasksContainer = document.createElement("div");
      tasksContainer.id = "tasks-container";
      panel.appendChild(tasksContainer);
      await loadTasks(
        tasksContainer,
        getTasksForCurrentUser,
        generateTaskElement
      );
    } else if (sectionTitle.innerText === "Today's Tasks") {
      panel.innerHTML = "";
      addTitleToSection("Today's Tasks", panel);
      const tasksContainer = document.createElement("div");
      tasksContainer.id = "tasks-container";
      panel.appendChild(tasksContainer);
      await loadTasks(
        tasksContainer,
        getTodaysTasksForCurrentUser,
        generateTaskElement
      );
    } else if (sectionTitle.innerText === "This Week") {
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
    } else {
      const chapter = sectionTitle.innerText;
      panel.innerHTML = "";
      addTitleToSection(chapter, panel);
      const tasksContainer = document.createElement("div");
      tasksContainer.id = "tasks-container";
      panel.appendChild(tasksContainer);
      await loadChapterTasks(
        tasksContainer,
        getTasksFromChapter,
        chapter,
        generateTaskElement
      );
    }
  });

  cancelButton.addEventListener("click", () => {
    document.body.removeChild(taskForm);
  });

  document.body.appendChild(taskForm);
}
