import { addTaskForm } from "../tasks/taskForm";
import addChapterForm from "../chapters/chapterForm";

function addTitleToSection(title, container) {
  // Create elements
  const titleContainer = document.createElement("div");
  const buttonsContainer = document.createElement("div");
  const titleElement = document.createElement("h1");
  const addTask = document.createElement("button");
  const addChapter = document.createElement("button");
  const addNote = document.createElement("button");
  
  //Add attributes
  titleContainer.id = "title-container";
  buttonsContainer.id = "title-buttons";

  titleElement.id = 'section-title'; 
  titleElement.innerText = title;

  addTask.innerText = "+ Add Task";
  addChapter.innerText = "+ Add Chapter";
  addNote.innerText = "+ Add Note";

  //Actions on button click
  addTask.addEventListener("click", addTaskForm);
  addChapter.addEventListener('click', addChapterForm);

  //Append elements
  buttonsContainer.appendChild(addTask);
  buttonsContainer.appendChild(addChapter);
  buttonsContainer.appendChild(addNote);

  titleContainer.appendChild(titleElement);
  titleContainer.appendChild(buttonsContainer);

  container.appendChild(titleContainer);
}

export { addTitleToSection };
