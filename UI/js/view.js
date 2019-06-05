const modaView = document.querySelector('#view-modal');
const viewBtn = document.querySelector('#btn-view1');
const CloseBtn = document.querySelector('#close');

// create a function to open modal
const viewCarModal =() => {
  modalView.style.display = 'block';
}

viewBtn.addEventListener('click', viewCarModal);