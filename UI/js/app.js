window.addEventListener("load", () => {
  // sign up is display on page load
  const alternateForm = document.querySelectorAll(".alternate-form");
  alternateForm[0].style.display = "block";

  const signUp = document.querySelector("#register");
  const signIn = document.querySelector("#login");

  // function to fire event onclick
  const switchFormOnClick = event => {
    if (event.target.id === "login") {
      alternateForm[0].style.display = "none";
      alternateForm[1].style.display = "block";
    } else {
      alternateForm[1].style.display = "none";
      alternateForm[0].style.display = "block";
    }
  };

  // display specify form on click
  signUp.addEventListener("click", switchFormOnClick);
  signIn.addEventListener("click", switchFormOnClick);

  // get the button of Admin Login
  const adminLogin = document.querySelector("#admin-login");
  //function to display admin.html
  
  adminLogin.addEventListener("click", function(){
    this.parentNode.action = ("admin.html");
  });

});
