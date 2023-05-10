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
