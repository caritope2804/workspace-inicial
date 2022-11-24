let dataProducts = {};
let commentProducts = [];
let imagesProducts = [];
const checkedStar = "fa fa-star checked";
const uncheckedStar = "fa fa-star";
let infoProductsContainer = document.getElementById("infoproduct");

fetch(PRODUCT_INFO_URL).then(response => response.json()).then(data => {
    dataProducts = data;
    imagesProducts = dataProducts.images;
    showProductTitle();
    showProductData();
    showProductImages(imagesProducts);
    showRelatedProducts();
});

fetch(PRODUCT_INFO_COMMENTS_URL).then(response => response.json()).then(data => {
    let html = "";
    let comentarionuevo = JSON.parse(localStorage.getItem("comentarios"));
    if (comentarionuevo != undefined && comentarionuevo != null)
        data.push.apply(data, comentarionuevo);

    for (let i = 0; i < data.length; i++) {
        html += getProductComments(data[i].user, data[i].dateTime, data[i].score, data[i].description);


    }
    document.getElementById("productComments").innerHTML = html;
});


function showProductTitle() {
    let productTitle = document.getElementById("ProductTittle");
    productTitle.innerHTML = dataProducts.name;

}

function showProductData() {
    let productData = document.getElementById("productData");

    productData.innerHTML = `
    <p class="mb-2"> Precio: <p>
    <p class="mb-1">U$S ${dataProducts.cost}</p>
    <br></br>
    <p class="mb-2"> Descripción: <p>
    <p class="mb-1">${dataProducts.description}</p>
    <br></br>
    <p class="mb-2"> Categoria: <p>
    <p class="mb-1">${dataProducts.category}</p>
    <br></br>
    <p class="mb-2"> Cantidad de vendidos: <p>
    <p class="mb-1">${dataProducts.soldCount}</p>
    <br></br>
    <p class="mb-2"> Imagenes ilustrativas: <p>

    `;


}
function showProductImages() {
    let htmlImageToAppend = "";
    let itemClass = "carousel-item active";
    for (let image of imagesProducts) {
        htmlImageToAppend = `
            <div class="` + itemClass + `">
                <img src=" ` + image + `" alt="imagen de producto" class="d-block w-100" >
            </div>`
        itemClass = "carousel-item";
        document.getElementById("productImages").innerHTML += htmlImageToAppend;
    }

}

const getProductComments = (user, dateTime, score, description) => {
    return `<div>
      <p><b>${user}</b>-${dateTime}-${crearScore(score)}</p>
      <p>${description}</p>
      <hr>
      </div> 
  `
        ;

};
function crearScore(score) {
    let htmlScore = "";
    for (let i = 1; i < 6; i++) {
        htmlScore += `<span class="${score >= i ? checkedStar : uncheckedStar}"></span>`
    }
    return htmlScore;
}

function addComment() {
    let commentArray = [];
    if (localStorage.getItem("comentarios") != undefined && localStorage.getItem("comentarios") != null)
        commentArray = JSON.parse(localStorage.getItem("comentarios"));
    let comentario = new Object();
    comentario.product = localStorage.getItem("prodId");
    comentario.score = document.getElementById("puntaje").value;
    comentario.description = document.getElementById("comentarioUsuario").value;
    comentario.user = sessionStorage.getItem("email");
    comentario.dateTime = new Date().toISOString();

    commentArray.push(comentario);
    localStorage.setItem("comentarios", JSON.stringify(commentArray));

}

function showRelatedProducts() {
    let relatedProducts = document.getElementById("relatedProducts")

    for (let product of dataProducts.relatedProducts) {
        relatedProducts.innerHTML += `
   <div onclick="setProdId(${product.id})" class="m-0 w-25">
   
       
           <img src="${product.image}" alt="${product.name}" class="img-thumbnail  ">
           <p class="mb-1">${product.name}</p>
           
         
    </div>
     `
    }
}

function buy(){
    let cartProducts = [];
    let cartProductsString = localStorage.getItem("cartProducts");
    if (cartProductsString !== null && cartProductsString !== undefined){
      cartProducts = JSON.parse(cartProductsString);
    
    }
    let productId= localStorage.getItem("prodId");
    cartProducts.push(createProductInfo(dataProducts));
    localStorage.setItem("cartProducts",JSON.stringify(cartProducts));
  
  
  }
 function createProductInfo(dataProduct){
 let productInfo = new Object();
 productInfo.id = dataProduct.id;
 productInfo.name = dataProduct.name;
 productInfo.count = 1;
 productInfo.unitCost = dataProduct.cost;
 productInfo.currency = dataProduct.currency;
 productInfo.image = dataProduct.images[0];
 return productInfo;

 }


