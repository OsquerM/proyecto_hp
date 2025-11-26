document.getElementById("btn-iniciar-sesion").addEventListener("click", async () => {
  const usuario = document.getElementById("usuario-admin").value.trim();
  const contrasena = document.getElementById("contrasena-admin").value.trim();
  const mensajeError = document.getElementById("mensaje-error");

  mensajeError.classList.add("d-none");

  try {
    const response = await fetch("/login", {   // <-- solo /login, relativo al servidor
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: usuario, password: contrasena })
    });

    if (!response.ok) throw new Error("Usuario o contraseña incorrectos");

    const data = await response.json();

    if (data.success) {
      window.location.href = "/panel";       // redirige al panel
    } else {
      mensajeError.classList.remove("d-none");
    }
  } catch (err) {
    console.error("Error en login:", err);
    mensajeError.classList.remove("d-none");
  }
});
