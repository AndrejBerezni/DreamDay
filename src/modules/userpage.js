function loadUserInfo(container, getProfilePicUrl, getUserName, signOut) {
    const picture = document.createElement('img');
    const userName = document.createElement('h1');
    const signOutButton = document.createElement('h2');
    const nameAndSignOut = document.createElement('div');

    picture.id = 'profile-pic';
    nameAndSignOut.id = 'user-info-text';

    picture.src = getProfilePicUrl();
    userName.innerText = getUserName();
    signOutButton.innerText = 'Sign out';

    signOutButton.addEventListener('click', signOut);

    nameAndSignOut.appendChild(userName);
    nameAndSignOut.appendChild(signOutButton);

    container.appendChild(picture);
    container.appendChild(nameAndSignOut);
};

function loadUserMenu(container) {
    const homeButton = document.createElement('button');
    const todayButton = document.createElement('button');
    const thisWeekButton = document.createElement('button');
    const chaptersButton = document.createElement('button');
    const notesButton = document.createElement('button');

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

    const chaptersList = document.createElement('div');

    chaptersList.id = ('user-menu-chapters-list')

    container.appendChild(homeButton);
    container.appendChild(todayButton);
    container.appendChild(thisWeekButton);
    container.appendChild(chaptersButton);
    container.appendChild(notesButton);
}

function loadUserPage(loadUserInfo, getProfilePicUrl, getUserName, signOut, loadUserMenu) {
    document.body.innerHTML = '';

    const mainContainer = document.createElement('main');
    const userInfo = document.createElement('div');
    const userMenu = document.createElement('div');
    const panel = document.createElement('div');

    mainContainer.id = 'main-container';
    userInfo.id = 'user-info';
    userMenu.id = 'user-menu';
    panel.id = 'panel';

    loadUserInfo(userInfo,getProfilePicUrl, getUserName, signOut);
    loadUserMenu(userMenu);

    mainContainer.appendChild(userInfo);
    mainContainer.appendChild(userMenu);
    mainContainer.appendChild(panel);

    document.body.appendChild(mainContainer);
}

export {loadUserInfo, loadUserMenu, loadUserPage};