document.addEventListener("DOMContentLoaded", () => {
    // Mostrar nombre del usuario
    const nombreUsuario = sessionStorage.getItem("usuario");
    if (nombreUsuario) {
        document.getElementById("user-name").textContent = nombreUsuario;
    } else {
        document.getElementById("user-name").textContent = "Invitado";
    }

    // Formulario para crear invitado
    document.getElementById("crear-invitado-form").addEventListener("submit", (e) => {
        e.preventDefault();
        
        if (!document.getElementById("crear-invitado-form").checkValidity()) {
            e.target.reportValidity();
            return;
        }

        const nuevoInvitado = {
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            telefono: document.getElementById("telefono").value,
            correo: document.getElementById("correo").value,
            empresa: document.getElementById("empresa").value
        };

        // Aquí normalmente harías una llamada a la API para guardar el invitado
        console.log("Creando nuevo invitado:", nuevoInvitado);
        
        alert("El invitado ha sido creado exitosamente");
        document.getElementById("crear-invitado-form").reset();
    });
});