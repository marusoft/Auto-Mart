// view 1
const modalView1 = document.querySelector('#view-modal-1');
const viewBtn1 = document.querySelector('#btn-view1');
const closeBtn1 = document.querySelector('.close1');

// create a function to open modal
const viewCarModal1 = () => {
  modalView1.style.display = 'block';
};
const closeCarModal1 = () => {
  modalView1.style.display = 'none';
};

const closeCarModalOnClickOuterArea1 = (event) => {
  event.target == modalView1
    ? (modalView1.style.display = 'none')
    : (modalView1.style.display = false);
};
viewBtn1.addEventListener('click', viewCarModal1);
closeBtn1.addEventListener('click', closeCarModal1);
window.addEventListener('click', closeCarModalOnClickOuterArea1);

// view 2
const modalView2 = document.querySelector('#view-modal-2');
const viewBtn2 = document.querySelector('#btn-view2');
const closeBtn2 = document.querySelector('.close2');

// create a function to open modal
const viewCarModal2 = () => {
  modalView2.style.display = 'block';
};
const closeCarModal2 = () => {
  modalView2.style.display = 'none';
};

const closeCarModalOnClickOuterArea2 = (event) => {
  event.target == modalView2
    ? (modalView2.style.display = 'none')
    : (modalView2.style.display = false);
};
viewBtn2.addEventListener('click', viewCarModal2);
closeBtn2.addEventListener('click', closeCarModal2);
window.addEventListener('click', closeCarModalOnClickOuterArea2);

// view 3
const modalView3 = document.querySelector('#view-modal-3');
const viewBtn3 = document.querySelector('#btn-view3');
const closeBtn3 = document.querySelector('.close3');

// create a function to open modal
const viewCarModal3 = () => {
  modalView3.style.display = 'block';
};
const closeCarModal3 = () => {
  modalView3.style.display = 'none';
};

const closeCarModalOnClickOuterArea3 = (event) => {
  event.target == modalView3
    ? (modalView3.style.display = 'none')
    : (modalView3.style.display = false);
};
viewBtn3.addEventListener('click', viewCarModal3);
closeBtn3.addEventListener('click', closeCarModal3);
window.addEventListener('click', closeCarModalOnClickOuterArea3);

// view 4
const modalView4 = document.querySelector('#view-modal-4');
const viewBtn4 = document.querySelector('#btn-view4');
const closeBtn4 = document.querySelector('.close4');

// create a function to open modal
const viewCarModal4 = () => {
  modalView4.style.display = 'block';
};
const closeCarModal4 = () => {
  modalView4.style.display = 'none';
};

const closeCarModalOnClickOuterArea4 = (event) => {
  event.target == modalView4
    ? (modalView4.style.display = 'none')
    : (modalView4.style.display = false);
};
viewBtn4.addEventListener('click', viewCarModal4);
closeBtn4.addEventListener('click', closeCarModal4);
window.addEventListener('click', closeCarModalOnClickOuterArea4);

// view 5
const modalView5 = document.querySelector('#view-modal-5');
const viewBtn5 = document.querySelector('#btn-view5');
const closeBtn5 = document.querySelector('.close5');

// create a function to open modal
const viewCarModal5 = () => {
  modalView5.style.display = 'block';
};
const closeCarModal5 = () => {
  modalView5.style.display = 'none';
};

const closeCarModalOnClickOuterArea5 = (event) => {
  event.target == modalView5
    ? (modalView5.style.display = 'none')
    : (modalView5.style.display = false);
};
viewBtn5.addEventListener('click', viewCarModal5);
closeBtn5.addEventListener('click', closeCarModal5);
window.addEventListener('click', closeCarModalOnClickOuterArea5);

// view 6
const modalView6 = document.querySelector('#view-modal-6');
const viewBtn6 = document.querySelector('#btn-view6');
const closeBtn6 = document.querySelector('.close6');

// create a function to open modal
const viewCarModal6 = () => {
  modalView6.style.display = 'block';
};
const closeCarModal6 = () => {
  modalView6.style.display = 'none';
};

const closeCarModalOnClickOuterArea6 = (event) => {
  event.target == modalView6
    ? (modalView6.style.display = 'none')
    : (modalView6.style.display = false);
};
viewBtn6.addEventListener('click', viewCarModal6);
closeBtn6.addEventListener('click', closeCarModal6);
window.addEventListener('click', closeCarModalOnClickOuterArea6);
