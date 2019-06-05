const modalView = document.querySelector('#view-modal');
const viewBtn = document.querySelector('#btn-view1');
const closeBtn = document.querySelector('#close');

// create a function to open modal
const viewCarModal = () => {
  modalView.style.display = 'block';
}
const closeCarModal = () => {
  modalView.style.display = 'none';
}

viewBtn.addEventListener('click', viewCarModal);
closeBtn.addEventListener('click', closeCarModal);