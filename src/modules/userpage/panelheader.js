function addTitleToSection(title, container) {
    const titleContainer = document.createElement('div');
    const buttonsContainer = document.createElement('div');
    
    titleContainer.id = 'title-container';
    buttonsContainer.id = 'title-buttons';


    const titleElement = document.createElement('h1');
    const addTask = document.createElement('button');
    const addChapter = document.createElement('button');
    const addNote = document.createElement('button');

    titleElement.innerText = title;
    addTask.innerText = '+ Add Task';
    addChapter.innerText = '+ Add Chapter';
    addNote.innerText = '+ Add Note';

    buttonsContainer.appendChild(addTask);
    buttonsContainer.appendChild(addChapter);
    buttonsContainer.appendChild(addNote);

    titleContainer.appendChild(titleElement);
    titleContainer.appendChild(buttonsContainer);

    container.appendChild(titleContainer);
  }


export {addTitleToSection}