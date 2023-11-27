let boton = document.getElementById("botonLogin")

window.addEventListener('load', function () {
   sessionStorage.clear();
});



boton.addEventListener("click", function () {
   let usuario = document.getElementById("usuario")
   let password = document.getElementById("pass")

   let usuarioCargado = { usuario: usuario.value, pass: password.value };
   sessionStorage.setItem("sesion", JSON.stringify(usuarioCargado));

   let body = JSON.stringify({
      "email": usuario.value,
      "pass": password.value
   });

   fetch("http://localhost:3000/login", {
      method: 'POST',
      mode: 'cors',
      body: body,
      headers: { "Content-Type": "application/json" }
   })
      .then(res => res.json())
      .then(data => {
         sessionStorage.setItem("token", JSON.stringify(data));

         window.location.href = "index.html";
      })

})

