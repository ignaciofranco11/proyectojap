let cart = document.getElementById('infoCart');

document.addEventListener("DOMContentLoaded", () => {
    const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
    getJSONData(url)
        .then(result => {
            if (result.status === "ok") {
                ShowCartData(result.data.articles[0]);
                completarCarro();
            } else {
                console.error(result.data);
            }
        });
});

/*const shippingTypeSelect = document.getElementById("shippingType");
const streetInput = document.getElementById("street");
const numberInput = document.getElementById("number");
const cornerInput = document.getElementById("corner");
const confirmButton = document.getElementById("confirmButton");

confirmButton.addEventListener("click", confirmShipping);

function confirmShipping() {
    const selectedShippingType = shippingTypeSelect.value;
    const selectedStreet = streetInput.value;
    const selectedNumber = numberInput.value;
    const selectedCorner = cornerInput.value;


}*/
function modificar(data) {
    let subtotalProducto = document.getElementById('subtotalProducto');
    let cant = document.getElementById('cantidad');
    let cantidad = parseInt(cant.value);
    let subtotal = parseInt(cantidad * data);
    subtotalProducto.innerHTML = `${subtotal}`;
}

function recalcular() {
    let cantidad = document.getElementsByClassName("cantidad");
    let costo = document.getElementsByClassName("costo");
    let subTotal = document.getElementsByClassName("subtotal");

    for (let i = 0; i < cantidad.length; i++) {
        let cantidadValor = parseInt(cantidad[i].value);
        let costoValor = parseFloat(costo[i].textContent);
        let subtotal = cantidadValor * costoValor;
        subTotal[i].textContent = subtotal;
    }
}


function ShowCartData(data) {
    let htmlContentToAppend = "";
    htmlContentToAppend += `<tr>   
                    <td><img class="img-fluid" src="${data.image}" alt=""></td>
                    <td class="align-middle">${data.name}</td>
                    <td class="align-middle">${data.currency} ${data.unitCost}</td>
                    <td class="align-middle"><input type="number" value="${data.count}" class="w-25 text-center" min="1" id="cantidad" onchange="modificar(${data.unitCost})"></td>
                    <td class="align-middle"><b>${data.currency}&nbsp;</b><b id="subtotalProducto">${data.unitCost}</b></td>
                    </tr>`;
    cart.innerHTML = htmlContentToAppend;
}





function completarCarro() {
    let carrito = JSON.parse(localStorage.getItem("Carrito"));
    let htmlContentToAppend = "";

    for (let producto of carrito) {
        htmlContentToAppend += `<tr>   
        <td><img class="img-fluid" src="${producto.image}" alt=""></td>
        <td class="align-middle">${producto.name}</td>
        <td class="align-middle">${producto.currency} <span class="costo">${producto.unitCost}</span></td>
        <td class="align-middle"><input type="number" value="${producto.count}" class="w-25 text-center cantidad" min="1"  onchange="recalcular()"></td>
        <td class="align-middle"><b>${producto.currency}&nbsp;</b><b> <span class="subtotal">${producto.unitCost}</span></b></td>
        </tr>`;
    }
    cart.innerHTML += htmlContentToAppend;
}



/*let shippingHtml = `

            <label for="shippingType">Tipo de Envío:</label>
            <select id="shippingType" name="shippingType">
              <option value="premium">Premium 2 a 5 días (15%)</option>
              <option value="express">Express 5 a 8 días (7%)</option>
              <option value="standard">Standard 12 a 15 días (5%)</option>
            </select>
         
            <label for="street">Calle:</label>
            <input type="text" id="street" name="street" required>
         
            <label for="number">Número:</label>
            <input type="text" id="number" name="number" required>
         
            <label for="corner">Esquina:</label>
            <input type="text" id="corner" name="corner">
         
            <button id="confirmButton">Confirmar Envío</button>`;


cart.innerHTML += shippingHtml;*/

