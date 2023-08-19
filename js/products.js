const URL_Autos = "https://japceibal.github.io/emercado-api/cats_products/101.json";

function showData(Array) {
    let auto = document.getElementById("cat-list-container");
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
                    <h4 class="mb-1">${item.name}</h4>
                    <small class="text-muted">${item.soldCount} vendidos</small>
                </div>
                <p class="mb-1">${item.description}</p>
                </div>
                </div>
     </div>`
        auto.innerHTML = htmlContentToAppend;
    }
}

fetch(URL_Autos)
    .then(response => response.json())
    .then(data => showData(data.products))