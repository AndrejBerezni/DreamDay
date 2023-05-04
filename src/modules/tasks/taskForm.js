import Task from "../taskClass";
import {
  handleTaskForm,
  deleteTask,
  getTasksForCurrentUser,
  getTodaysTasksForCurrentUser,
  getThisWeeksTasksForCurrentUser,
} from "../..";
import {
  loadAllTasks,
  loadThisWeeksTasks,
  loadTodaysTasks,
} from "./loadAllTasks";
import { addTitleToSection } from "../userpage/panelheader";
import generateTaskElement from "./generateTaskElement";

function addTaskForm() {
  console.log("Task form initated");
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

  const titleLabel = document.createElement("label");
  const descriptionLabel = document.createElement("label");
  const priorityLabel = document.createElement("label");
  const dueDateLabel = document.createElement("label");
  const completeLabel = document.createElement("label");

  const taskName = document.createElement("h1");

  const submitButton = document.createElement("button");
  const cancelButton = document.createElement("button");

  const buttonsDiv = document.createElement("div");

  // Add attributes to elements:

  taskForm.id = "task-form";

  taskName.innerText = "New Task";
  title.id = "task-form-title";
  title.setAttribute("type", "text");
  title.setAttribute("name", "task-form-title");
  title.setAttribute("required", "");

  titleLabel.setAttribute("for", "task-form-title");
  titleLabel.innerText = "Title";

  description.id = "task-form-description";
  description.setAttribute("name", "task-form-description");
  description.setAttribute("rows", "5");
  description.setAttribute("cols", "30");

  descriptionLabel.setAttribute("for", "task-form-title");
  descriptionLabel.innerText = "Description";

  priority.id = "task-form-priority";
  priority.setAttribute("type", "number");
  priority.setAttribute("name", "task-form-priority");
  priority.setAttribute("required", "");
  priority.setAttribute("min", "1");
  priority.setAttribute("max", "5");

  priorityLabel.setAttribute("for", "task-form-priority");
  priorityLabel.innerText = "Priority";

  dueDate.id = "task-form-date";
  dueDate.setAttribute("type", "datetime-local");
  dueDate.setAttribute("name", "task-form-date");
  dueDate.setAttribute("required", "");

  dueDateLabel.setAttribute("for", "task-form-date");
  dueDateLabel.innerText = "Due Date";

  complete.id = "task-form-complete";
  complete.setAttribute("name", "task-form-complete");

  completeLabel.setAttribute("for", "task-form-complete");
  completeLabel.innerText = "Have you already completed this task?";

  completeNo.innerText = "No";
  completeNo.setAttribute("selected", "");
  completeNo.setAttribute("value", "no");

  completeYes.innerText = "Yes";
  completeYes.setAttribute("value", "yes");

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
      priority.value
    );
    await handleTaskForm(newTask);
    document.body.removeChild(taskForm);
    // Reload section with changes:
    if (sectionTitle.innerText === "All Tasks") {
      panel.innerHTML = "";
      addTitleToSection("All Tasks", panel);
      await loadAllTasks(panel, getTasksForCurrentUser, generateTaskElement);
    } else if (sectionTitle.innerText === "Today's Tasks") {
      panel.innerHTML = "";
      addTitleToSection("Today's Tasks", panel);
      await loadTodaysTasks(
        panel,
        getTodaysTasksForCurrentUser,
        generateTaskElement
      );
    } else if (sectionTitle.innerText === "This Week") {
      panel.innerHTML = "";
      addTitleToSection("This Week", panel);
      await loadThisWeeksTasks(
        panel,
        getThisWeeksTasksForCurrentUser,
        generateTaskElement
      );
    }
  });

  cancelButton.addEventListener("click", () => {
    document.body.removeChild(taskForm);
  });

  document.body.appendChild(taskForm);

  // CHAPTER input to be added once data structure is completely defined
}

function editTaskForm(task) {
  console.log("Edit task form initated");
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

  const titleLabel = document.createElement("label");
  const descriptionLabel = document.createElement("label");
  const priorityLabel = document.createElement("label");
  const dueDateLabel = document.createElement("label");
  const completeLabel = document.createElement("label");

  const taskName = document.createElement("h1");

  const submitButton = document.createElement("button");
  const cancelButton = document.createElement("button");

  const buttonsDiv = document.createElement("div");

  // Add attributes to elements:

  taskForm.id = "task-form";

  taskName.innerText = "Edit Task";
  title.id = "task-form-title";
  title.setAttribute("type", "text");
  title.setAttribute("name", "task-form-title");
  title.setAttribute("required", "");

  titleLabel.setAttribute("for", "task-form-title");
  titleLabel.innerText = "Title";

  description.id = "task-form-description";
  description.setAttribute("name", "task-form-description");
  description.setAttribute("rows", "5");
  description.setAttribute("cols", "30");

  descriptionLabel.setAttribute("for", "task-form-title");
  descriptionLabel.innerText = "Description";

  priority.id = "task-form-priority";
  priority.setAttribute("type", "number");
  priority.setAttribute("name", "task-form-priority");
  priority.setAttribute("required", "");
  priority.setAttribute("min", "1");
  priority.setAttribute("max", "5");

  priorityLabel.setAttribute("for", "task-form-priority");
  priorityLabel.innerText = "Priority";

  dueDate.id = "task-form-date";
  dueDate.setAttribute("type", "datetime-local");
  dueDate.setAttribute("name", "task-form-date");
  dueDate.setAttribute("required", "");

  dueDateLabel.setAttribute("for", "task-form-date");
  dueDateLabel.innerText = "Due Date";

  complete.id = "task-form-complete";
  complete.setAttribute("name", "task-form-complete");

  completeLabel.setAttribute("for", "task-form-complete");
  completeLabel.innerText = "Have you already completed this task?";

  completeNo.innerText = "No";
  completeNo.setAttribute("selected", "");
  completeNo.setAttribute("value", "no");

  completeYes.innerText = "Yes";
  completeYes.setAttribute("value", "yes");

  submitButton.setAttribute("type", "submit");
  submitButton.innerText = "Submit";

  cancelButton.setAttribute("type", "button");
  cancelButton.innerText = "Cancel";

  buttonsDiv.id = "form-buttons-div";

  // Show task values:

  title.value = task.title;
  description.value = task.description;
  priority.value = task.priority;
  dueDate.value = task.dueDate;
  complete.value = task.complete;

  // let valueForCheck = title.value;

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
      priority.value
    );
    /* If titles do not match, new document will be created and we will have duplicates.
    This way we prevent that: */
    if (task.title !== newTask) {
      await deleteTask(task.title);
    }
    await handleTaskForm(newTask);
    document.body.removeChild(taskForm);

    // Reload section with changes:
    if (sectionTitle.innerText === "All Tasks") {
      panel.innerHTML = "";
      addTitleToSection("All Tasks", panel);
      await loadAllTasks(panel, getTasksForCurrentUser, generateTaskElement);
    } else if (sectionTitle.innerText === "Today's Tasks") {
      panel.innerHTML = "";
      addTitleToSection("Today's Tasks", panel);
      await loadTodaysTasks(
        panel,
        getTodaysTasksForCurrentUser,
        generateTaskElement
      );
    } else if (sectionTitle.innerText === "This Week") {
      panel.innerHTML = "";
      addTitleToSection("This Week", panel);
      await loadThisWeeksTasks(
        panel,
        getThisWeeksTasksForCurrentUser,
        generateTaskElement
      );
    }
  });

  cancelButton.addEventListener("click", () => {
    document.body.removeChild(taskForm);
  });

  document.body.appendChild(taskForm);

  document.body.appendChild(taskForm);
}

export { addTaskForm, editTaskForm };
