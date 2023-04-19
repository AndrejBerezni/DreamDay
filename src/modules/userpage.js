function populateUserInfo(container, getProfilePicUrl, getUserName, signOutUser) {
    const picture = document.createElement('img');
    const username = document.createElement('h1');
    const signOut = document.createElement('h2');

    picture.id = 'profile-picture';

    picture.src = getProfilePicUrl();
    username.innerText = getUserName();
    signOut.innerText = 'Sign out';

    signOut.addEventListener('click', signOutUser);

    container.appendChild(picture);
    container.appendChild(username);
    container.appendChild(signOut);

}


function loadUserPage(populateUserInfo, getProfilePicUrl, getUserName, signOutUser) {
    document.body.innerHTML = '';

    const mainContainer = document.createElement('main');
    const userInfo = document.createElement('div');
    const userMenu = document.createElement('div');
    const panel = document.createElement('div');

    mainContainer.id = 'main-container';
    userInfo.id = 'user-info';
    userMenu.id = 'user-menu';
    panel.id = 'panel';

    populateUserInfo(userInfo, getProfilePicUrl, getUserName, signOutUser)

    mainContainer.appendChild(userInfo);
    mainContainer.appendChild(userMenu);
    mainContainer.appendChild(panel);

    document.body.appendChild(mainContainer);
};

export {populateUserInfo, loadUserPage}