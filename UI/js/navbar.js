
<<<<<<< HEAD
const hambugerContain = document.querySelector("#hambuger-contain");
const navList = document.querySelector(".nav-list");

const toggleBar = () => {
  hambugerContain.classList.toggle("toggler");
  navList.classList.toggle("toggler");
};

hambugerContain.addEventListener("click", toggleBar);
navList.addEventListener("click", toggleBar);
=======
const hambugerContain  = document.querySelector('#hambuger-contain');
const navList = document.querySelector('.nav-list');

const toggleBar= () => {
  hambugerContain.classList.toggle('toggler');
  navList.classList.toggle('toggler')
}

hambugerContain.addEventListener('click', toggleBar);
navList.addEventListener('click', toggleBar);
>>>>>>> 6a80366861a911cce979176fa4d9eaf6a4246c95
