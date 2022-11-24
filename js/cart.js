let transfer = document.getElementById("transfer");
let credit = document.getElementById("credit");
let selecpaymentalert = document.getElementById("selecpaymentalert");
let shippingprem = document.getElementById("prem");
let shippingexp = document.getElementById("exp");
let shippingstand = document.getElementById("stand");
let form = document.getElementById("formuser");
let productdataList = [];

fetch(CART_INFO_URL).then(response => response.json()).then(data => {
  productdataList.push(data.articles[0]);
  showCartProduct();
  calcPrices();

});

function showCartProduct() {
  let selectedProdInfo = document.getElementById("selectedProducts");
  selectedProdInfo.innerHTML += `<table class="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Nombre</th>
            <th scope="col">Costo</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${loadCart()}
        </tbody>

          `
}

function calcPrices() {
  let productSubtotal= 0;
  let cantProd = 0;
    let priceProd = 0;
    let subtotal = 0;
  for (let i=0 ; i<productdataList.length; i++){ 
      let productData = productdataList[i];
      cantProd = document.getElementById(`cantProd-${productData.id}`).value;
      priceProd = productData.unitCost;
      productSubtotal = cantProd * priceProd;
      subtotal+= productSubtotal;
      document.getElementById(`result-${productData.id}`).innerText = productSubtotal;
    }
  document.getElementById("resultsubtotal").innerText= `U$S  ${subtotal} `;
  
  if (shippingprem.checked){
    result = subtotal*0.15;
    total = result + subtotal;
    document.getElementById("shippingcost").innerText = `U$S  ${result} `;
    document.getElementById("totalcost").innerText = `U$S  ${total} `;
  } else if (shippingexp.checked){
    result = subtotal*0.07;
    total = result + subtotal;
    document.getElementById("shippingcost").innerText = `U$S  ${result} `;
    document.getElementById("totalcost").innerText = `U$S  ${total} `;
  } else if (shippingstand.checked){
    result = subtotal*0.05;
    total = result + subtotal;
    document.getElementById("shippingcost").innerText = `U$S  ${result} `;
    document.getElementById("totalcost").innerText = `U$S  ${total} `;
  }

}



function loadCart() {
  let htmlContentToAppend = "";
 let cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
  if (cartProducts !== null && cartProducts !== undefined) {
    productdataList= productdataList.concat(cartProducts);
  }
   
    for (let i = 0; i < productdataList.length; i++) {
      htmlContentToAppend += createProductInfo(productdataList[i].image, productdataList[i].name, productdataList[i].unitCost, productdataList[i].id);
    }
      
  return htmlContentToAppend;
}

function createProductInfo (image, name, unitCost, id){
  return  `
  <tr>
        <th scope="row"><img src="${image}"class="img-thumbnail" width="110px"></th>
        <td>${name}</td>
        <td>U$S${unitCost}</td>
        <td><input type="number" min="1" value="1" id="cantProd-${id}" onclick="calcPrices()"></td>
        <td>U$S <span id="result-${id}"> </span></td>
      </tr>
      `;
}

(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()


function paymentMethod() {
  let credit = document.getElementById("credit").checked;
  let transfer = document.getElementById("trans-number");
  let ccnumber = document.getElementById("cc-number");
  let ccsecnumber = document.getElementById("cc-secnumber");
  let ccexpiration = document.getElementById("cc-expiration");
  if (credit) {
    transfer.disabled = true;
    ccnumber.disabled = false;
    ccsecnumber.disabled = false;
    ccexpiration.disabled = false;
  } else {
    transfer.disabled = false;
    ccnumber.disabled = true;
    ccsecnumber.disabled = true;
    ccexpiration.disabled = true;
  }

}

function validatePayments() {

  if (!transfer.checked && !credit.checked) {
    selecpaymentalert.style.color = "red";
    selecpaymentalert.innerHTML = "Debe seleccionar una forma de pago";


  } else {
    selecpaymentalert.innerHTML = "";
  }


}

let alertPlaceholder = document.getElementById('liveAlertPlaceholder');
let alertTrigger = document.getElementById('liveAlertBtn');

function alert(message, type) {
  if(form.checkValidity()){ 
  let wrapper = document.createElement('div')
  wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

  alertPlaceholder.append(wrapper)
    }
}

if (alertTrigger) {
  alertTrigger.addEventListener('click', function (event) {
    alert('¡Has comprado con éxito!', 'success')
    if(form.checkValidity()){  
    event.preventDefault()
  }

  })
}

