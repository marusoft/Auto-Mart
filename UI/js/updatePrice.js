// variable to target modal element,0pen modal button and close button
const updatePriceModal = document.querySelector('#update-price-modal');
const updatePriceBtn = document.querySelector('#update-price-btn');
const closeUpdateModal = document.querySelector('.close-update-modal')

// function to open updaye price modal
const openUpdateModal = () => {
  updatePriceModal.style.display = 'block';
}

// Event handlers
updatePriceBtn.onclick = openUpdateModal;