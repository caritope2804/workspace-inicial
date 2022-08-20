const PRODUCT_AUTOS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"
let productCarsArray = [];


function showProductCarsList() {

    let htmlContentToAppend = "";
    
    for (let i = 0; i < productCarsArray.length; i++) {
        let productCars = productCarsArray[i];
        

        htmlContentToAppend += `
     <div onclick="setCatID(${productCars.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${productCars.image}" alt="${productCars.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${productCars.name}</h4>
                            <small class="text-muted">${productCars.soldCount} cantidad artículos vendidos</small>
                        </div>
                        <p class="mb-1">${productCars.description}</p>
                        <br>
                        <p class="mb-1">${productCars.currency}</p>
                        <p class="mb-1">${productCars.cost}</p>

                    </div>
                </div>
             </div>
    `
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
     
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_AUTOS_URL).then(function(resultObj){
        if(resultObj.status === "ok"){
            productCarsArray= resultObj.data.products
            showProductCarsList()
        }
    });
});

if (sessionStorage.getItem("loggedUser")===null || sessionStorage.getItem("loggedUser")==="false")
location.replace("login.html");