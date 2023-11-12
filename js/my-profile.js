let form = document.getElementById("form");
let email = document.getElementById("Email");
let nombre = document.getElementById("primerNombre");
let segNombre = document.getElementById("segundoNombre");
let apellido = document.getElementById("primerApellido");
let segApellido = document.getElementById("segundoApellido");
let telefono = document.getElementById("telefono");
let usuario = JSON.parse(sessionStorage.getItem("sesion"));
let datosUsuario = JSON.parse(localStorage.getItem("datosUsuario"));
let imagen = document.getElementById("imagenPerfil");
let inputImagen = document.getElementById("imagen");


document.addEventListener("DOMContentLoaded", function () {
    if (!usuario) {
        form.classList.add('d-none')
    }
    email.value = usuario.usuario

    if (datosUsuario) {
        nombre.value = datosUsuario.nombre1
        segNombre.value = datosUsuario.nombre2
        apellido.value = datosUsuario.apellido
        segApellido.value = datosUsuario.apellido2
        email.value = datosUsuario.email
        telefono.value = datosUsuario.telefono
        if (datosUsuario.imagen) {
            imagen.setAttribute("src", datosUsuario.imagen)
        }
    }

})

inputImagen.addEventListener("change", function () {

    let selectedFile = inputImagen.files[0];

    if (selectedFile) {
        let imagePath = URL.createObjectURL(selectedFile);
        imagen.setAttribute("src", imagePath)
        localStorage.setItem("perfil", JSON.stringify(imagePath))
    }

})

form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    }

    form.classList.add('was-validated')
    let perfil = JSON.parse(localStorage.getItem("perfil"));

    let datos = { nombre1: nombre.value, nombre2: segNombre.value, apellido: apellido.value, apellido2: segApellido.value, email: email.value, telefono: telefono.value, imagen: perfil }
    localStorage.setItem("datosUsuario", JSON.stringify(datos));

}, false)

