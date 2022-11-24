document.getElementById("name").value = localStorage.getItem("firstName");
document.getElementById("secondname").value = localStorage.getItem("secondName");
document.getElementById("surname").value = localStorage.getItem("firstSurname");
document.getElementById("secondsurname").value = localStorage.getItem("secondSurname");
document.getElementById("cellphone").value = localStorage.getItem("cellphone");
document.getElementById("userImageProfile").src = localStorage.getItem("userImage");

function userProfileSaveData() {
    localStorage.setItem("firstName", document.getElementById("name").value);
    localStorage.setItem("secondName", document.getElementById("secondname").value);
    localStorage.setItem("firstSurname", document.getElementById("surname").value);
    localStorage.setItem("secondSurname", document.getElementById("secondsurname").value);
    localStorage.setItem("cellphone", document.getElementById("cellphone").value);
}


function gotPhoto(element) { 
    let file = element.files[0];

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    
    async function Main() {
       const file = document.querySelector('#userImage').files[0];
       localStorage.setItem("userImage", await toBase64(file));
       document.getElementById("userImageProfile").src=localStorage.getItem("userImage");
    }
    
    Main();
   }
   