export default function loadHome() {
    const navbar = document.createElement('nav');
    const background = document.createElement('div');
    const hero = document.createElement('div');

    const navLinks = document.createElement('div');
    const signInButton = document.createElement('button');
    const demoButton = document.createElement('button');
    const contactButton = document.createElement('button');

    navLinks.id = 'nav-links'
    signInButton.innerText = 'Sign in';
    demoButton.innerText = 'Demo';
    contactButton.innerText = 'Get in touch';

    navLinks.appendChild(signInButton);
    navLinks.appendChild(demoButton);
    navLinks.appendChild(contactButton);

    navbar.id = 'navbar';
    navbar.appendChild(navLinks);

    background.id = 'home-background';

    const title = document.createElement('h1');
    const signUptext = document.createElement('p');
    const signIntext = document.createElement('p');

    const signUp = document.createElement('a');
    const signIn = document.createElement('a');

    const signUpTextNode = document.createTextNode(' to start planning the day of your dreams today!')
    const signInTextNode = document.createTextNode('Already have an account? ')

    signUp.innerText = 'Sign up';
    signIn.innerText = 'Log in';

    title.innerText = 'DREAM DAY';

    signUptext.appendChild(signUp);
    signUptext.appendChild(signUpTextNode);
    signIntext.appendChild(signInTextNode);
    signIntext.appendChild(signIn);

    hero.appendChild(title);
    hero.appendChild(signUptext);
    hero.appendChild(signIntext);
    
    document.body.appendChild(navbar);
    document.body.appendChild(background);
    document.body.appendChild(hero);

}