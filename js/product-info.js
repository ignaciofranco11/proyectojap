let ProdID = localStorage.getItem("ProdID");
let divProducto = document.getElementById("infoProducto");
PRODUCTS_COMMENTS = `https://japceibal.github.io/emercado-api/products_comments/${ProdID}.json`;
let URL_PRODUCTO = `https://japceibal.github.io/emercado-api/products/${ProdID}.json`;
let filledStar = `<i class="fas fa-star" style="color: rgb(218, 165, 32)"></i>`
let emptyStar = `<i class="far fa-star" style="color: #000000;"></i>`;
let divRelacionados = document.getElementById("relacionados");
let botonComprar = document.getElementById("addCart");
let carrito = [];

function hora() {

    const fechaHoraActual = new Date();

    const año = fechaHoraActual.getFullYear();
    const mes = String(fechaHoraActual.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaHoraActual.getDate()).padStart(2, '0');
    const horas = String(fechaHoraActual.getHours()).padStart(2, '0');
    const minutos = String(fechaHoraActual.getMinutes()).padStart(2, '0');
    const segundos = String(fechaHoraActual.getSeconds()).padStart(2, '0');

    return fechaHoraFormateada = `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
}

//Genera una fila con la informacion
function addData(info) {
    let htmlContentToAppend = "";
    let starsHtml = "";
    for (let i = 1; i <= 5; i++) {
        if (info.score >= i) {
            starsHtml += filledStar;
        } else {
            starsHtml += emptyStar;
        }
    }
    htmlContentToAppend += `
    <div class="list-group-item list-group-item-action cursor-active">
    <div class="row">
        <div class="col">
            <div class=" w-100 d-flex justify-content-between">
            <h4 class="mb-1"> ${info.user}</h4>
            <small class="text-muted">${info.dateTime}</small>
            </div>
            <div class="stars">${starsHtml}</div>
            </div>
            <br>
            <p class="mb-1">${info.description}</p>
            </div>
            </div>
 </div>`
    contenedor.innerHTML += htmlContentToAppend;
}

//Recorre el arreglo con todos los comentarios y genera una fila por cada uno
function showComments(Array) {
    for (const comment of Array) {
        addData(comment)
    }
}
//Guarda la id del producto seleccionado en el localStorage y nos redirige a product-info.html
function setProdID(id) {
    localStorage.setItem("ProdID", id);
    window.location = "product-info.html"
}


function mostrarRelacionados(Array) {
    let htmlContentToAppend = "";

    for (const item of Array) {
        htmlContentToAppend += `
        <div class="divRel cursor-active" onclick="setProdID(${item.id})">
            <img src="${item.image}" ><br>
            <p>${item.name}</p>
        </div>
     
        `}

    divRelacionados.innerHTML = htmlContentToAppend;
}


//Cuando hacemos clic en enviar se agrega el comentario
let btnSend = document.getElementById("btnSend");
btnSend.addEventListener("click", function () {
    let comment = document.getElementById("comment")
    let score = document.getElementById("rating")
    let user = JSON.parse(sessionStorage.getItem("sesion"));
    let now = hora();
    let info = { user: user.usuario, score: score.value, dateTime: now, description: comment.value }
    addData(info)
    comment.value = ""
    score.value = 1
})

document.addEventListener("DOMContentLoaded", function () {
    fetch(URL_PRODUCTO)
        .then(response => response.json())
        .then(data => {
            let htmlContentToAppend = "";

            htmlContentToAppend += `
          <div class="presentation">
            <div class="text">
                <h2>${data.name}</h2>
                
                <hr>
                <h4>Precio</h4>
                <p>${data.currency} ${data.cost}</p>
                <br>
                <h4>Descripción</h4>
                <p>${data.description}</p>
                <br>
                <h4>Categoría</h4>
                <p>${data.category}</p>
                <br>
                <h4>Cantidad de vendidos</h4>
                <p>${data.soldCount}</p>
            </div>
            <br>
            <div class="imagenes">
                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="${data.images[0]}" class="d-block w-100">
                        </div>`;

            for (let i = 1; i < data.images.length; i++) {
                htmlContentToAppend +=
                    `<div class="carousel-item">
                        <img src="${data.images[i]}" class="d-block w-100">
                        </div>`;
            }

            htmlContentToAppend +=
                `</div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
            </button>
            </div>
            </div>
          </div>`;

            divProducto.innerHTML = htmlContentToAppend;
            mostrarRelacionados(data.relatedProducts);


        })
        .catch(error => {
            console.error("Error al cargar los datos:", error);
        });
    getJSONData(PRODUCTS_COMMENTS)
        .then(result => {
            if (result.status === "ok") {
                arreglo = result.data;
                showComments(arreglo);
            } else {
                console.error(result.data);
            }
        });
})


//Cuando hacemos clic en comprar agrega el producto al carrito y tira una alerta para seguir comprando o ir al carrito.
botonComprar.addEventListener("click", () => {
    fetch(URL_PRODUCTO)
        .then(response => response.json())
        .then(data => {
            let carrito = localStorage.getItem("Carrito");

            // Verificar si carrito es null o no existe en localStorage
            if (carrito === null) {
                carrito = [];
            } else {
                carrito = JSON.parse(carrito); // Convierte la cadena JSON almacenada en un array
            }

            let producto = { id: data.id, name: data.name, count: 1, unitCost: data.cost, currency: data.currency, image: data.images[0] };
            carrito.push(producto);

            // Almacenar el carrito actualizado en localStorage
            localStorage.setItem("Carrito", JSON.stringify(carrito));
            Swal.fire({
                title: 'Exito',
                text: "Producto agregado al carrito",
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ir al carrito',
                cancelButtonText: 'Continuar comprando'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "cart.html";
                }
            })
        })
})
