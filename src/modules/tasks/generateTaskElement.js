export default function generateTaskElement(taks, container) {
    const taskDiv = document.createElement('div');
    const taskDivLeft = document.createElement('div');
    const taskDivRight = document.createElement('div');

    taskDiv.classList.add('task-div');
    taskDivLeft.classList.add('task-div-left');
    taskDivRight.classList.add('task-div-right');


    const titleDateDiv = document.createElement('div');

    const taskTitle = document.createElement('h1');
    const taskDescription = document.createElement('p');
    const taskDate = document.createElement('h2');

    taskTitle.innerText = task.title;
    taskDescription.innerText = task.taskDescription;
    taskDate.innerText = task.dueDate;

    const taskComplete = document.createElement('icon');
    const taskEdit = document.createElement('icon');
    const taskDelete = document.createElement('icon');

    if (task.taskComplete) {
        taskComplete.classList.add('far', 'fa-check-square');
    } else {
        taskComplete.classList.add('far', 'fa-square');
    }

    taskEdit.classList.add('far', 'fa-edit');
    taskDelete.classList.add('fas', 'fa-trash');

    titleDateDiv.appendChild(taskTitle);
    titleDateDiv.appendChild(taskDate);

    taskDivLeft.appendChild(titleDateDiv);
    taskDivLeft.appendChild(taskDescription);

    taskDivRight.appendChild(taskComplete);
    taskDivRight.appendChild(taskEdit);
    taskDivRight.appendChild(taskDelete);

    taskDiv.appendChild(taskDivLeft);
    taskDiv.appendChild(taskDivRight);

    container.appendChild(taskDiv);
}