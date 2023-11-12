let cart = document.getElementById('infoCart');
let tipodeEnvio = document.getElementById('shippingType');
let envioCosto = document.getElementById('envioCosto');
let totalCantidad = document.getElementById('totalCantidad');
let subtotalCantidad = document.getElementById('subtotalCantidad');

document.addEventListener("DOMContentLoaded", () => {
    const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
    getJSONData(url)
        .then(result => {
            if (result.status === "ok") {
                ShowCartData(result.data.articles[0]);
                completarCarro();
                recalcular();
            } else {
                console.error(result.data);
            }
        });

    const paymentTypeDisplay = document.getElementById("payment-type-display");
    const selectPaymentButton = document.getElementById("select-payment-button");
    const paymentSelection = document.getElementById("payment-selection");
    const paymentModal = document.getElementById("payment-modal");
    const closeModal = document.getElementById("close-modal");
    const savePayment = document.getElementById("save-payment");
    const paymentOptions = document.getElementsByName("payment-option");
    const creditCardFields = document.getElementById("credit-card-fields");
    const bankTransferFields = document.getElementById("bank-transfer-fields");
    let formModal = document.getElementById("formModal");



    //Muestra la ventana Modal cuando se hace click en "seleccionar"
    selectPaymentButton.addEventListener("click", () => {
        paymentModal.style.display = "block";
    });

    // Para cerrar el modal haciendo click en "X"
    closeModal.addEventListener("click", () => {
        paymentModal.style.display = "none";
    });

    // Guardar la forma de pago
    savePayment.addEventListener("click", () => {
        let selectedPayment = "";

        paymentOptions.forEach((option) => {
            if (option.checked) {
                selectedPayment = option.value;
                paymentSelection.innerHTML = selectedPayment;

            }
        });
        if (formModal.checkValidity()) {
            paymentModal.style.display = "none";
        }
    });

    paymentOptions.forEach((option) => {
        option.addEventListener("change", () => {
            if (option.value === "credit-card") {
                creditCardFields.querySelectorAll("input, select").forEach((element) => {
                    element.disabled = false;
                });
                bankTransferFields.querySelectorAll("input, select").forEach((element) => {
                    element.disabled = true;
                });
            } else if (option.value === "bank-transfer") {
                creditCardFields.querySelectorAll("input, select").forEach((element) => {
                    element.disabled = true;
                });
                bankTransferFields.querySelectorAll("input, select").forEach((element) => {
                    element.disabled = false;
                });
            }
        });
    });
});


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
    let total = 0;
    let moneda = document.getElementsByClassName("moneda");
    let monedaSubTotal = document.getElementsByClassName("monedaSubTotal");

    for (let i = 0; i < cantidad.length; i++) {
        if (moneda[i].innerHTML == "UYU") {
            let conversion = parseFloat(costo[i].innerHTML);
            costo[i].innerHTML = (conversion / 39).toFixed(2);
            moneda[i].innerHTML = "USD";
            monedaSubTotal[i].innerHTML = "USD";
        }

        let cantidadValor = parseInt(cantidad[i].value);
        let costoValor = parseFloat(costo[i].textContent);
        let subtotal = (cantidadValor * costoValor).toFixed(2);
        total += cantidadValor * costoValor;
        subTotal[i].textContent = subtotal;
    }
    subtotalCantidad.innerHTML = total.toFixed(2);

    // Obtengo el porcentaje de envío en base al tipo seleccionado
    let envioPorcentaje = 0;
    switch (tipodeEnvio.value) {
        case 'premium':
            envioPorcentaje = 0.15;
            break;
        case 'express':
            envioPorcentaje = 0.07;
            break;
        case 'standard':
            envioPorcentaje = 0.05;
            break;
    }

    // Calculo el costo de envío y el total a pagar
    let envio = total * envioPorcentaje;
    envioCosto.innerHTML = envio.toFixed(2);
    /*         const total = subtotal + envio; */
    totalCantidad.innerHTML = (envio + total).toFixed(2);

}

function primeraFila() {
    document.getElementById('primerProducto').innerHTML = ""
}

function ShowCartData(data) {
    let htmlContentToAppend = "";
    htmlContentToAppend += `<tr>   
                    <td><img class="img-fluid" src="${data.image}" alt=""></td>
                    <td class="align-middle">${data.name}</td>
                    <td class="align-middle">${data.currency} ${data.unitCost}</td>
                    <td class="align-middle"><input type="number" value="${data.count}" class="w-25 text-center" min="1" id="cantidad" onchange="modificar(${data.unitCost})"></td>
                    <td class="align-middle"><b>${data.currency}&nbsp;</b><b id="subtotalProducto">${data.unitCost}</b></td>
                    <td class="align-middle"><input type="button" onclick="primeraFila()" value="X" class="id"></td>
                    </tr>`;
    document.getElementById('primerProducto').innerHTML = htmlContentToAppend;
}

function borrar(index) {
    let carrito = JSON.parse(localStorage.getItem("Carrito"));
    carrito.splice(index, 1);
    localStorage.setItem("Carrito", JSON.stringify(carrito));
    completarCarro();
    recalcular();
}

// Escucho el evento 'change' en el tipo de envío para actualizar los valores cuando cambie
tipodeEnvio.addEventListener('change', recalcular);

function completarCarro() {
    let carrito = JSON.parse(localStorage.getItem("Carrito"));
    let htmlContentToAppend = "";

    for (let [index, producto] of carrito.entries()) {
        htmlContentToAppend += `<tr class="filas">   
        <td><img class="img-fluid" src="${producto.image}" alt=""></td>
        <td class="align-middle">${producto.name}</td>
        <td class="align-middle"><span class="moneda">${producto.currency}</span> <span class="costo">${producto.unitCost}</span></td>
        <td class="align-middle"><input type="number" value="${producto.count}" class="w-25 text-center cantidad" min="1"  onchange="recalcular()"></td>
        <td class="align-middle"><b><span class="monedaSubTotal">${producto.currency}</span>&nbsp;</b><b> <span class="subtotal">${producto.unitCost}</span></b></td>
        <td class="align-middle"><input type="button" onclick="borrar(${index})" value="X"></td>
        </tr>`;
    }
    cart.innerHTML = htmlContentToAppend;
}

(() => {
    'use strict'
    let formModal = document.getElementById("formModal");
    let formCompra = document.getElementById("formCompra");
    let divFormadePago = document.getElementById("pago");
    const selectPaymentButton = document.getElementById("select-payment-button");

    formCompra.addEventListener("submit", event => {
        divFormadePago.innerHTML = "";
        formCompra.classList.add('was-validated');
        if (!formModal.checkValidity()) {
            event.preventDefault();
            divFormadePago.classList.add('feedback-negativo');
            divFormadePago.innerHTML = "Debe seleccionar una forma de pago";
            selectPaymentButton.classList.add('feedback-negativo');
        }


        if (!formCompra.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }


        if (formCompra.checkValidity() && formModal.checkValidity()) {
            event.preventDefault();
            Swal.fire({
                title: 'Compra realizada',
                icon: 'success',
                showCancelButton: false,
            })
                .then(() => {
                    window.location.href = "cart.html";
                });
        }
    }, false)
    formModal.addEventListener("submit", event => {
        if (!formModal.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        formModal.classList.add('was-validated');
        if (formModal.checkValidity()) {
            event.preventDefault();
            divFormadePago.classList.remove('feedback-negativo');
            divFormadePago.innerHTML = "";
            selectPaymentButton.classList.remove('feedback-negativo');
        }
    }, false);

})()
