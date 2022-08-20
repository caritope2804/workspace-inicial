function validateLogin(){
    sessionStorage.setItem("loggedUser",true);
}
sessionStorage.setItem("loggedUser",false);

function SignOut(){
    sessionStorage.setItem("loggedUser",false);
        location.replace("login.html");
}