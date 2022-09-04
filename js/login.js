function validateLogin(){
    sessionStorage.setItem("logged",true);
    sessionStorage.setItem("email",document.getElementById("email").value);
}
sessionStorage.setItem("logged",false);
sessionStorage.setItem("email","")

