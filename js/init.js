const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

document.addEventListener("DOMContentLoaded", function () {
  let usuarioCargado = JSON.parse(sessionStorage.getItem("sesion"));
  let usernameElement = document.getElementById('username');

  if (usuarioCargado) {
    usernameElement.textContent = `Hola, ${usuarioCargado.usuario}`;
  } else {
    Swal.fire({
      title: 'No has Iniciado Sesion',
      text: "Es mejor que inicies sesion para continuar",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iniciar sesion',
      cancelButtonText: 'Continuar offline'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "login.html";
      }
    })
  }
});
document.addEventListener("DOMContentLoaded", function () {
  // Obtengo el botón "Día/Noche" por su ID
  const darkModeButton = document.getElementById("darkModeSwitch");
  const body = document.body;

  // Función para cambiar el modo
  function cambiarModo() {
    const isDarkMode = body.classList.contains("dark-mode");
    if (isDarkMode) {
      body.classList.remove("dark-mode");
      localStorage.setItem("claseBody", "light"); // Guardo el modo "light" en el Local Storage
    } else {
      body.classList.add("dark-mode");
      localStorage.setItem("claseBody", "dark"); // Guardo el modo "dark" en el Local Storage
    }
  }

  // Escuchar el evento clic en el botón "Día/Noche"
  darkModeButton.addEventListener("click", cambiarModo);

  // Obtengo el estado almacenado en el Local Storage
  const claseActual = localStorage.getItem("claseBody");

  // Aplico la clase al cuerpo si está almacenada en el Local Storage
  if (claseActual === "dark") {
    body.classList.add("dark-mode");
  }

  // Me aseguro de que el botón refleje el estado correcto
  darkModeButton.checked = claseActual === "dark";
});
