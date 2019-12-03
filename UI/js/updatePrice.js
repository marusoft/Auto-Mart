// variable to target modal element,0pen modal button and close button
const updatePriceModal = document.querySelector('#update-price-modal');
const updatePriceBtn = document.querySelector('#update-price-btn');
const closeUpdateModal = document.querySelector('.close-update-modal');

// function to open update price modal
const openUpdateModalOnclick = () => {
  updatePriceModal.style.display = 'block';
};

// function to close update price modal
const closeUpdateModalOnclick = () => {
  updatePriceModal.style.display = 'none';
};

// function to close update price modal on outer area click
const closeModalOnClickOuterArea = (event) => {
  event.target == updatePriceModal
    ? (updatePriceModal.style.display = 'none')
    : (updatePriceModal.style.display = false);
};

// Event handlers
// on click,it opens the update price modal
updatePriceBtn.onclick = openUpdateModalOnclick;
// on click,it close the update price modal
closeUpdateModal.onclick = closeUpdateModalOnclick;
// on click,it close the update price modal
window.onclick = closeModalOnClickOuterArea;
