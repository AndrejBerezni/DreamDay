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
}

function loadUserPage(loadUserInfo, getProfilePicUrl, getUserName, signOut) {
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

    mainContainer.appendChild(userInfo);
    mainContainer.appendChild(userMenu);
    mainContainer.appendChild(panel);

    document.body.appendChild(mainContainer);
}

export {loadUserInfo, loadUserPage};