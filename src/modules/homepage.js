// export default function loadHome(signInUser) {
//     document.body.innerHTML = '';
    
//     const navbar = document.createElement('nav');
//     const background = document.createElement('div');
//     const hero = document.createElement('div');

//     const navLinks = document.createElement('div');
//     const signInButton = document.createElement('button');
//     const demoButton = document.createElement('button');
//     const contactButton = document.createElement('button');

//     navLinks.id = 'nav-links'
//     signInButton.innerText = 'Sign in';
//     demoButton.innerText = 'Demo';
//     contactButton.innerText = 'Get in touch';

//     signInButton.addEventListener('click', signInUser);

//     navLinks.appendChild(signInButton);
//     navLinks.appendChild(demoButton);
//     navLinks.appendChild(contactButton);

//     navbar.id = 'navbar';
//     navbar.appendChild(navLinks);

//     background.id = 'home-background';

//     const title = document.createElement('h1');
//     const signUptext = document.createElement('p');
//     // const signIntext = document.createElement('p');

//     const signUp = document.createElement('span');
//     // const signIn = document.createElement('span');

//     const signUpTextNode = document.createTextNode(' to start planning the day of your dreams today!')
//     // const signInTextNode = document.createTextNode('Already have an account? ')

//     signUp.innerText = 'Sign in with Google';
//     // signIn.innerText = 'Log in';

//     title.innerText = 'DREAM DAY';

//     signUptext.appendChild(signUp);
//     signUptext.appendChild(signUpTextNode);
//     // signIntext.appendChild(signInTextNode);
//     // signIntext.appendChild(signIn);

//     hero.id = 'hero-section';
//     hero.appendChild(title);
//     hero.appendChild(signUptext);
//     // hero.appendChild(signIntext);

//     document.body.appendChild(navbar);
//     document.body.appendChild(background);
//     document.body.appendChild(hero);
// }

export default function loadHome(signInUser) {
    document.body.innerHTML = '';
  
    const navbar = document.createElement('nav');
    const background = document.createElement('div');
    const hero = document.createElement('div');
  
    const navLinks = document.createElement('div');
    const signInButton = document.createElement('button');
    const demoButton = document.createElement('button');
    const contactButton = document.createElement('button');
  
    navLinks.id = 'nav-links';
    signInButton.innerText = 'Sign in';
    demoButton.innerText = 'Demo';
    contactButton.innerText = 'Get in touch';
  
    signInButton.addEventListener('click', signInUser);
  
    navLinks.appendChild(signInButton);
    navLinks.appendChild(demoButton);
    navLinks.appendChild(contactButton);
  
    navbar.id = 'navbar';
    navbar.appendChild(navLinks);
  
    background.id = 'home-background';
  
    const title = document.createElement('h1');
    const signUptext = document.createElement('p');
  
    const signUp = document.createElement('span');
    const signUpTextNode = document.createTextNode(' to start planning the day of your dreams today!');
  
    signUp.innerText = 'Sign in with Google';
    title.innerText = 'DREAM DAY';
  
    signUp.addEventListener('click', signInUser);

    signUptext.appendChild(signUp);
    signUptext.appendChild(signUpTextNode);
  
    hero.id = 'hero-section';
    hero.appendChild(title);
    hero.appendChild(signUptext);
  
    document.body.appendChild(navbar);
    document.body.appendChild(background);
    document.body.appendChild(hero);
  }
  