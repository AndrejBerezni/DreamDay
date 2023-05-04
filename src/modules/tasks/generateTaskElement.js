import { editTaskForm } from "./taskForm";
import {
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

export default function generateTaskElement(task, container) {
    const panel = document.getElementById('panel');
    const sectionTitle = document.getElementById('section-title');

    const taskDiv = document.createElement('div');
    const taskDivLeft = document.createElement('div');
    const taskDivRight = document.createElement('div');

    taskDiv.classList.add('task-div');
    taskDivLeft.classList.add('task-div-left');
    taskDivRight.classList.add('task-div-right');


    const titleDateDiv = document.createElement('div');
    titleDateDiv.classList.add('title-date-div');

    const taskTitle = document.createElement('h1');
    const taskDescription = document.createElement('p');
    const taskDate = document.createElement('h2');

    taskTitle.innerText = task.title;
    taskDescription.innerText = task.description;
    taskDate.innerText = task.dueDate.toDate().toDateString();

    const taskComplete = document.createElement('icon');
    const taskEdit = document.createElement('icon');
    const taskDelete = document.createElement('icon');
    
    /* Creating containers to place icons inside them because
    event listeners did not work on icons them selves - no error was thrown,
    but my assumption is that it has to do with how Font Awesome icons are
    being handled by Webpack - they are converted to SVG */
    const taskCompleteContainer = document.createElement('icon');
    const taskEditContainer = document.createElement('icon');
    const taskDeleteContainer = document.createElement('icon');

    if (task.complete) {
        taskComplete.classList.add('far', 'fa-check-square');
    } else {
        taskComplete.classList.add('far', 'fa-square');
    }

    taskEdit.classList.add('far', 'fa-edit');
    taskDelete.classList.add('fas', 'fa-trash');

    taskEditContainer.addEventListener('click', ()=> {
        editTaskForm(task)
    });

    taskDeleteContainer.addEventListener('click', () => {
        const confirmDeletionBox = document.createElement('div');
        const deletionBoxText = document.createElement('p');
        const deletionButtonsDiv = document.createElement('div');
        const confirmDeletionButton = document.createElement('button');
        const cancelDeletionButton = document.createElement('button');

        confirmDeletionBox.id = 'confirm-task-deletion-box';

        deletionBoxText.innerText = 'Are you sure that you want to delete this task?';
        confirmDeletionButton.innerText = 'Yes';
        cancelDeletionButton.innerText = 'No';

        cancelDeletionButton.addEventListener('click', () => {
            document.body.removeChild(confirmDeletionBox);
        });

        confirmDeletionButton.addEventListener('click', async () => {
            await deleteTask(task.title);
            document.body.removeChild(confirmDeletionBox);
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

        deletionButtonsDiv.appendChild(cancelDeletionButton);
        deletionButtonsDiv.appendChild(confirmDeletionButton);

        confirmDeletionBox.appendChild(deletionBoxText);
        confirmDeletionBox.appendChild(deletionButtonsDiv);

        document.body.appendChild(confirmDeletionBox);
    })

    titleDateDiv.appendChild(taskTitle);
    titleDateDiv.appendChild(taskDate);

    taskDivLeft.appendChild(titleDateDiv);
    taskDivLeft.appendChild(taskDescription);

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