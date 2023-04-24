export default function loadUserMenu(container, chapters) {
    const homeButton = document.createElement('button');
    const todayButton = document.createElement('button');
    const thisWeekButton = document.createElement('button');
    const chaptersButton = document.createElement('button');
    const notesButton = document.createElement('button');

    const homeIcon = document.createElement('icon');
    const todayIcon = document.createElement('icon');
    const thisWeekIcon = document.createElement('icon');
    const chaptersIcon = document.createElement('icon');
    const chaptersDropdownIcon = document.createElement('icon');
    const notesIcon = document.createElement('icon');

    homeButton.classList.add('user-menu-button');
    todayButton.classList.add('user-menu-button');
    thisWeekButton.classList.add('user-menu-button');
    chaptersButton.classList.add('user-menu-button');
    notesButton.classList.add('user-menu-button');
  
    homeButton.innerText = 'HOME'
    todayButton.innerText = 'Today'
    thisWeekButton.innerText = 'This Week'
    chaptersButton.innerText = 'Chapters'
    notesButton.innerText = 'Notes'

    homeIcon.classList.add('user-menu-icon', 'fas', 'fa-home');
    todayIcon.classList.add('user-menu-icon', 'far', 'fa-calendar-check');
    thisWeekIcon.classList.add('user-menu-icon', 'far', 'fa-calendar-alt');
    chaptersIcon.classList.add('user-menu-icon', 'fas', 'fa-book');
    chaptersDropdownIcon.classList.add('user-menu-icon', 'fas', 'fa-sort-down', 'dropdown-icon')
    notesIcon.classList.add('user-menu-icon', 'far', 'fa-sticky-note');

    const chaptersList = document.createElement('div');
    chaptersList.id = ('user-menu-chapters-list');
    chaptersList.classList.toggle('hidden');

    chapters.forEach(chapter => {
        const chapterElement = document.createElement('button');
        chapterElement.innerText = chapter;
        chapterElement.classList.add('user-menu-chapter')
    });

    const homeDiv = document.createElement('div');
    const todayDiv = document.createElement('div');
    const thisWeekDiv = document.createElement('div');
    const chaptersDiv = document.createElement('div');
    const notesDiv = document.createElement('div');

    homeDiv.classList.add('user-menu-div');
    todayDiv.classList.add('user-menu-div');
    thisWeekDiv.classList.add('user-menu-div');
    chaptersDiv.classList.add('user-menu-div');
    notesDiv.classList.add('user-menu-div');

    chaptersDiv.addEventListener('click', ()=> {
        chaptersList.classList.toggle('hidden');
    })

    homeDiv.appendChild(homeIcon);
    homeDiv.appendChild(homeButton);

    todayDiv.appendChild(todayIcon);
    todayDiv.appendChild(todayButton);

    thisWeekDiv.appendChild(thisWeekIcon);
    thisWeekDiv.appendChild(thisWeekButton);

    chaptersDiv.appendChild(chaptersIcon);
    chaptersDiv.appendChild(chaptersButton);
    chaptersDiv.appendChild(chaptersDropdownIcon);

    notesDiv.appendChild(notesIcon);
    notesDiv.appendChild(notesButton);

    container.appendChild(homeDiv);
    container.appendChild(todayDiv);
    container.appendChild(thisWeekDiv);
    container.appendChild(chaptersDiv);
    container.appendChild(chaptersList);
    container.appendChild(notesDiv);
}