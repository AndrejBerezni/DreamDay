export default function loadUserInfo(container, getProfilePicUrl, getUserName, signOut) {
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