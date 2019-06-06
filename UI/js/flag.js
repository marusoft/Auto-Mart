// flag 1
const modalFlag1 = document.querySelector('#flag-modal-1');
const flagBtn1 = document.querySelector('#btn-flag-1');
const closeBtnF1 = document.querySelector('.close-1');

// create a function to open modal
const viewCarModalF1 = () => {
  modalFlag1.style.display = 'block';
}
const closeCarModalF1 = () => {
  modalFlag1.style.display = 'none';
}

const closeCarModalOnClickOuterAreaF1 = event => {
  event.target == modalFlag1
    ? ( modalFlag1.style.display = "none")
    : ( modalFlag1.style.display = false);
};
flagBtn1.addEventListener('click', viewCarModalF1);
closeBtnF1.addEventListener('click', closeCarModalF1);
window.addEventListener('click', closeCarModalOnClickOuterAreaF1);

// flag 2
const modalFlag2 = document.querySelector('#flag-modal-2');
const flagBtn2 = document.querySelector('#btn-flag-2');
const closeBtnF2 = document.querySelector('.close-2');

// create a function to open modal
const viewCarModalF2 = () => {
  modalFlag2.style.display = 'block';
}
const closeCarModalF2 = () => {
  modalFlag2.style.display = 'none';
}

const closeCarModalOnClickOuterAreaF2 = event => {
  event.target == modalFlag2
    ? ( modalFlag2.style.display = "none")
    : ( modalFlag2.style.display = false);
};
flagBtn2.addEventListener('click', viewCarModalF2);
closeBtnF2.addEventListener('click', closeCarModalF2);
window.addEventListener('click', closeCarModalOnClickOuterAreaF2);

// flag 3
const modalFlag3 = document.querySelector('#flag-modal-3');
const flagBtn3 = document.querySelector('#btn-flag-3');
const closeBtnF3 = document.querySelector('.close-3');

// create a function to open modal
const viewCarModalF3 = () => {
  modalFlag3.style.display = 'block';
}
const closeCarModalF3 = () => {
  modalFlag3.style.display = 'none';
}

const closeCarModalOnClickOuterAreaF3 = event => {
  event.target == modalFlag3
    ? ( modalFlag3.style.display = "none")
    : ( modalFlag3.style.display = false);
};
flagBtn3.addEventListener('click', viewCarModalF3);
closeBtnF3.addEventListener('click', closeCarModalF3);
window.addEventListener('click', closeCarModalOnClickOuterAreaF3);

// flag 4
const modalFlag4 = document.querySelector('#flag-modal-4');
const flagBtn4 = document.querySelector('#btn-flag-4');
const closeBtnF4 = document.querySelector('.close-4');

// create a function to open modal
const viewCarModalF4 = () => {
  modalFlag4.style.display = 'block';
}
const closeCarModalF4 = () => {
  modalFlag4.style.display = 'none';
}

const closeCarModalOnClickOuterAreaF4 = event => {
  event.target == modalFlag4
    ? ( modalFlag4.style.display = "none")
    : ( modalFlag4.style.display = false);
};
flagBtn4.addEventListener('click', viewCarModalF4);
closeBtnF4.addEventListener('click', closeCarModalF4);
window.addEventListener('click', closeCarModalOnClickOuterAreaF4);

// flag 5
const modalFlag5 = document.querySelector('#flag-modal-5');
const flagBtn5 = document.querySelector('#btn-flag-5');
const closeBtnF5 = document.querySelector('.close-5');

// create a function to open modal
const viewCarModalF5 = () => {
  modalFlag5.style.display = 'block';
}
const closeCarModalF5 = () => {
  modalFlag5.style.display = 'none';
}

const closeCarModalOnClickOuterAreaF5 = event => {
  event.target == modalFlag5
    ? ( modalFlag5.style.display = "none")
    : ( modalFlag5.style.display = false);
};
flagBtn5.addEventListener('click', viewCarModalF5);
closeBtnF5.addEventListener('click', closeCarModalF5);
window.addEventListener('click', closeCarModalOnClickOuterAreaF5);

// flag 6
const modalFlag6 = document.querySelector('#flag-modal-6');
const flagBtn6 = document.querySelector('#btn-flag-6');
const closeBtnF6 = document.querySelector('.close-6');

// create a function to open modal
const viewCarModalF6 = () => {
  modalFlag6.style.display = 'block';
}
const closeCarModalF6 = () => {
  modalFlag6.style.display = 'none';
}

const closeCarModalOnClickOuterAreaF6 = event => {
  event.target == modalFlag6
    ? ( modalFlag6.style.display = "none")
    : ( modalFlag6.style.display = false);
};
flagBtn6.addEventListener('click', viewCarModalF6);
closeBtnF6.addEventListener('click', closeCarModalF6);
window.addEventListener('click', closeCarModalOnClickOuterAreaF6);