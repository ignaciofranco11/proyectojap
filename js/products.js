let idCat = localStorage.getItem("catID") 
const URL_PRODUCTOS = `https://japceibal.github.io/emercado-api/cats_products/${idCat}.json`
let contenedor = document.getElementById("cat-list-container");
let botonFiltrar = document.getElementById("rangeFilterCount");
let botonLimpiar = document.getElementById("clearRangeFilter");
let botonDesc = document.getElementById("sortDesc");
let botonAsc = document.getElementById("sortAsc");
let botonRele = document.getElementById("sortByCount");
let precioMin = document.getElementById("rangeFilterCountMin");
let precioMax = document.getElementById("rangeFilterCountMax");
let arreglo = [];

function namesCat(Array){
    let nombre = document.getElementById("nombreCat");
    let htmlContentToAppend = "";
    htmlContentToAppend += Array.catName
    nombre.innerHTML += htmlContentToAppend;
}
function showData(Array) {
    let htmlContentToAppend = "";
    for (const item of Array) {
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action cursor-active">
        <div class="row">
            <div class="col-3">
                <img src="${item.image}" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${item.name} - ${item.currency} ${item.cost}</h4>
                    <small class="text-muted">${item.soldCount} vendidos</small>
                </div>
                <p class="mb-1">${item.description}</p>
                </div>
                </div>
     </div>`
        contenedor.innerHTML = htmlContentToAppend;
    }
}

botonFiltrar.addEventListener("click", function () {


    let arrayFiltrado = arreglo.filter(item => {
        return item.cost >= precioMin.value && item.cost <= precioMax.value;

    });

    if (arrayFiltrado.length > 0) {
        showData(arrayFiltrado);
    } else {
        contenedor.innerHTML = `<div class="list-group-item list-group-item-action cursor-active"> 
                     <p>No hay productos en ese rango de precios</p>
                     </div>`;
    }
});

botonDesc.addEventListener("click", function () {
    let arrayOrdenado = [...arreglo].sort((function (a, b) {
        return a.cost - b.cost;
    }));
    showData(arrayOrdenado);
});

botonAsc.addEventListener("click", function () {

    let arrayOrdenado = [...arreglo].sort((function (a, b) {
        return b.cost - a.cost;
    }));
    showData(arrayOrdenado);
}

);

botonRele.addEventListener("click", function () {

    let arrayOrdenado = [...arreglo].sort((function (a, b) {
        return b.soldCount - a.soldCount;
    }));
    showData(arrayOrdenado);
}

);

botonLimpiar.addEventListener("click", function () {
    showData(arreglo);
    precioMax.value = "";
    precioMin.value = "";
});
let buscador = document.getElementById("filtrado")
buscador.addEventListener('input', function() {
    let arregloFiltrado = arreglo.filter(producto => producto.name.toLowerCase().includes(buscador.value.toLowerCase())||producto.description.toLowerCase().includes(buscador.value.toLowerCase()) );
    showData(arregloFiltrado);
})
document.addEventListener("DOMContentLoaded", function () {
    getJSONData(URL_PRODUCTOS)
        .then(result => {
            if (result.status === "ok") {
                arreglo = result.data.products;
                namesCat(result.data);
                showData(arreglo);
            } else {
                console.error(result.data);
            }
        });
})


