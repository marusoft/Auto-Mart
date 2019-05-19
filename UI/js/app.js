
let signIn = '';
window.addEventListener('load', () => {
  const signUp = document.querySelector('#register');
  signIn =document.querySelector('#login');
  
  // sign up is display on page load
  const alternateForm = document.querySelectorAll('.alternate-form');
  alternateForm[0].style.display = 'block';
  alternateForm[0].querySelector('form input').focus();

})