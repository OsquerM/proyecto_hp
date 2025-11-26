const ADMIN_USER = "admin";
const ADMIN_PASS = "1234";

document.getElementById("btn-iniciar-sesion").addEventListener("click", () => {
  const usuario = document.getElementById("usuario-admin").value;
  const contrasena = document.getElementById("contrasena-admin").value;

  if(usuario === ADMIN_USER && contrasena === ADMIN_PASS){
    window.location.href = "/panel.html"; // redirige a panel.html
  } else {
    document.getElementById("mensaje-error").classList.remove("d-none");
  }
});
