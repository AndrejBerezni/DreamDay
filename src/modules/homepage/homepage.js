export default function loadHome(signInUser) {
  document.body.innerHTML = "";

  const navbar = document.createElement("nav");
  const background = document.createElement("div");
  const main = document.createElement("main");
  const hero = document.createElement("div");

  const navLinks = document.createElement("div");
  const signInButton = document.createElement("button");
  const demoButton = document.createElement("button");
  const contactButton = document.createElement("button");

  navLinks.id = "nav-links";
  signInButton.innerText = "Sign in";
  demoButton.innerText = "Guide";
  contactButton.innerText = "Get in touch";
  main.id = 'main-home';

  signInButton.addEventListener("click", signInUser);

  demoButton.addEventListener("click", () => {
    main.innerHTML = '';
    const guide = document.createElement('div');
    guide.id = 'guide';
    guide.innerHTML =  '<iframe src="https://scribehow.com/embed/Web_Workflow__hZutkn7fSVG3ONGjCgONRw?as=scrollable&skipIntro=true" width="100%" height="640" allowfullscreen frameborder="0"></iframe>';
    main.appendChild(guide);   
  });

  contactButton.addEventListener('click', () => {
    main.innerHTML = '';
    const contactBox = document.createElement('div');
    const contactText = document.createElement('p');
    const contactTextSecond = document.createElement('p');
    const linksDiv = document.createElement('div');
    const linkedIn = document.createElement('a');
    const gitHub = document.createElement('a');
    const email = document.createElement('a');
    const linkedInIcon = document.createElement('icon');
    const gitHubicon = document.createElement('icon');
    const emailicon = document.createElement('icon');

    contactBox.id = 'contact-box';
    contactText.innerText = `Dream Day created by Andrej Berezni\nFeel free to get in touch with me via LinkedIn or email, and check my other work on GitHub:`
    contactTextSecond.innerText = 'Thank you for visiting!';
    linksDiv.id = 'contact-links-div'

    linkedIn.setAttribute('href', "https://www.linkedin.com/in/andrej-berezni-6386b11a3");
    email.setAttribute('href', "mailto:berezniandrej@gmail.com");
    gitHub.setAttribute('href', "https://github.com/AndrejBerezni");

    linkedIn.setAttribute('target', "_blank");
    email.setAttribute('target', "_blank");
    gitHub.setAttribute('target', "_blank");

    linkedInIcon.classList.add('fab', 'fa-linkedin');
    gitHubicon.classList.add('fab', 'fa-github');
    emailicon.classList.add('fas', 'fa-envelope');

    linkedIn.appendChild(linkedInIcon);
    email.appendChild(emailicon);
    gitHub.appendChild(gitHubicon);

    linksDiv.appendChild(linkedIn);
    linksDiv.appendChild(email);
    linksDiv.appendChild(gitHub);

    contactBox.append(contactText);
    contactBox.append(linksDiv);
    contactBox.appendChild(contactTextSecond);

    main.appendChild(contactBox);

  })
 

  navLinks.appendChild(signInButton);
  navLinks.appendChild(demoButton);
  navLinks.appendChild(contactButton);

  navbar.id = "navbar";
  navbar.appendChild(navLinks);

  background.id = "home-background";

  const title = document.createElement("h1");
  const signUptext = document.createElement("p");

  const signUp = document.createElement("span");
  const signUpTextNode = document.createTextNode(
    " to start planning the day of your dreams today!"
  );

  signUp.innerText = "Sign in with Google";
  title.innerText = "DREAM DAY";

  signUp.addEventListener("click", signInUser);

  signUptext.appendChild(signUp);
  signUptext.appendChild(signUpTextNode);

  hero.id = "hero-section";
  hero.appendChild(title);
  hero.appendChild(signUptext);

  main.appendChild(hero);

  document.body.appendChild(navbar);
  document.body.appendChild(background);
  document.body.appendChild(main);
}
