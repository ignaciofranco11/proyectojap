let boton = document.getElementById("botonLogin")
let usuario = document.getElementById("usuario")
let pass = document.getElementById("pass")
window.addEventListener('load', function() {
   sessionStorage.clear();
});

boton.addEventListener("click", function(){
   let usuarioCargado = {usuario: usuario.value, pass: pass.value};
   sessionStorage.setItem("sesion", JSON.stringify(usuarioCargado));
})