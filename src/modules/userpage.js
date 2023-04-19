export default function loadUserPage() {
    document.body.innerHTML = '';

    const mainContainer = document.createElement('main');
    const userInfo = document.createElement('div');
    const userMenu = document.createElement('div');
    const panel = document.createElement('div');

    mainContainer.id = 'main-container';
    userInfo.id = 'user-info';
    userMenu.id = 'user-menu';
    panel.id = 'panel';

    mainContainer.appendChild(userInfo);
    mainContainer.appendChild(userMenu);
    mainContainer.appendChild(panel);

    document.body.appendChild(mainContainer);
}