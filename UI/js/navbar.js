
const hambugerContain  = document.querySelector('#hambuger-contain');
const navList = document.querySelector('.nav-list');

const toggleBar= () => {
  hambugerContain.classList.toggle('toggler');
  navList.classList.toggle('toggler')
}

hambugerContain.addEventListener('click', toggleBar);
navList.addEventListener('click', toggleBar);
