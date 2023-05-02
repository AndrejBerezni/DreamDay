export default function generateTaskForm() {
    /* This could be done easier by saving HTML form to a variable,
    and then just adding that as innerHTML of a container div,
    but I am not doing it since it is a security risk*/

    // Create necessary elements:
    const taskForm = document.createElement('form');

    const title = document.createElement('input');
    const description = document.createElement('textarea');
    const priority = document.createElement('input');
    const dueDate = document.createElement('input');
    const complete = document.createElement('select');
    const completeYes = document.createElement('option');
    const completeNo = document.createElement('option');

    const titleLabel = document.createElement('label');
    const descriptionLabel = document.createElement('label');
    const priorityLabel = document.createElement('label');
    const dueDateLabel = document.createElement('label');
    const completeLabel = document.createElement('label');

    const taskName = document.createElement('h1');
    
    const submitButton = document.createElement('button');

    // Add attributes to elements:

    taskForm.id = 'task-form';

    taskName.innerText = 'New Task'
    title.id = 'task-form-title';
    title.setAttribute('type', 'text');
    title.setAttribute('name', 'task-form-title');
    title.setAttribute('required', '');
    
    titleLabel.setAttribute('for', 'task-form-title');
    titleLabel.innerText = 'Title';

    description.id = 'task-form-description';
    description.setAttribute('name', 'task-form-description');
    description.setAttribute('rows', '5');
    description.setAttribute('cols', '30');

    descriptionLabel.setAttribute('for', 'task-form-title');
    descriptionLabel.innerText = 'Description';

    priority.id = 'task-form-priority';
    priority.setAttribute('type', 'number');
    priority.setAttribute('name', 'task-form-priority');
    priority.setAttribute('required', '');
    priority.setAttribute('min', '1');
    priority.setAttribute('max', '5');
    priority.setAttribute('value', '3');

    priorityLabel.setAttribute('for', 'task-form-priority');
    priorityLabel.innerText = 'Priority';

    dueDate.id = 'task-form-date';
    dueDate.setAttribute('type', 'date');
    dueDate.setAttribute('name', 'task-form-date');
    dueDate.setAttribute('required', '');

    dueDateLabel.setAttribute('for', 'task-form-date');
    dueDateLabel.innerText = 'Due Date';

    complete.id = 'task-form-complete';
    complete.setAttribute('name', 'task-form-complete');

    completeLabel.setAttribute('for', 'task-form-complete');
    completeLabel.innerText = 'Have you already completed this task?';

    completeNo.innerText = 'No';
    completeNo.setAttribute('selected', '');
    completeNo.setAttribute('value', 'false');

    completeYes.innerText = 'Yes'
    completeYes.setAttribute('value', 'true');

    submitButton.setAttribute('type', 'submit');
    submitButton.innerText = 'Submit';

    // Append elements to form:

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
    taskForm.appendChild(submitButton);

    document.body.appendChild(taskForm);

    // CHAPTER input to be added once data structure is completely defined
}