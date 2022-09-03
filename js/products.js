const PRODUCT_AUTOS_URL = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`;
const ORDER_ASC_BY_PRICE = "0-10000000";
const ORDER_DESC_BY_PRICE = "10000000-0";
const ORDER_BY_PROD_CANT_SOLD = "Cant.sold";
const LiveSearch = document.querySelector("#livesearch");
//const Boton = document.querySelector("#buscar");
const resultado = document.querySelector("#prod-list-container")
let productCarsArray = [];
let currentSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;


function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_CANT_SOLD){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}


const filtrar = () =>{
    resultado.innerHTML = "";
    const texto = LiveSearch.value.toLowerCase();

    for(let product of productCarsArray ){
        let nombre = product.name.toLowerCase();
        let descripcion = product.description.toLowerCase();
        if(nombre.indexOf(texto) !== -1 || descripcion.indexOf(texto) !== -1){
             resultado.innerHTML += ` 
             <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name}</h4>
                            <small class="text-muted">${product.soldCount} cantidad artículos vendidos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                        <br>
                        <p class="mb-1">${product.currency}</p>
                        <p class="mb-1">${product.cost}</p>

                    </div>
                </div>
                ` 

        }
    }
    if (resultado.innerHTML === ""){
        resultado.innerHTML += `
        <h2> Producto no encontrado... <h2>
        `
    }

}
//Boton.addEventListener("click", filtrar)
LiveSearch.addEventListener("keyup", filtrar)

filtrar();








function showProductCarsList() {

    let htmlContentToAppend = "";
    
    for (let i = 0; i < productCarsArray.length; i++) {
        let productCars = productCarsArray[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(productCars.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(productCars.cost) <= maxPrice))){
        

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
            }
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend; 
    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        productCarsArray = productsArray;
    }

    productCarsArray = sortProducts(currentSortCriteria, productCarsArray);

    //Muestro las categorías ordenadas
    showProductCarsList();
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_AUTOS_URL).then(function(resultObj){
        if(resultObj.status === "ok"){
            productCarsArray= resultObj.data.products
            showProductCarsList()
        }
    });
    document.getElementById("sortByDescPrice").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByAscPrice").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortBySoldCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_CANT_SOLD);
    });
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterMinPrice").value = "";
        document.getElementById("rangeFilterMaxPrice").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductCarsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        minPrice = document.getElementById("rangeFilterMinPrice").value;
        maxPrice = document.getElementById("rangeFilterMaxPrice").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }

        showProductCarsList();
    });
});

if (localStorage.getItem("text")) {
    document.getElementById("Usermail").innerHTML = localStorage.getItem("text"); 
}