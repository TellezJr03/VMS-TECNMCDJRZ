document.addEventListener("DOMContentLoaded", () => {
    const userNameElement = document.getElementById("user-name");

    // Obtener el nombre del usuario desde sessionStorage
    const userName = sessionStorage.getItem("usuario");

    if (userName) {
        userNameElement.textContent = userName;  // Mostrar el nombre del usuario
    } else {
        userNameElement.textContent = "Invitado";  // Si no hay usuario, mostrar "Invitado"
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const dropdownBtn = document.querySelector(".dropdown-btn");
    const dropdown = document.querySelector(".dropdown");

    dropdownBtn.addEventListener("click", () => {
        dropdown.classList.toggle("show");
    });

    // Ocultar el menú si se hace clic fuera
    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove("show");
        }
    });

    // Mostrar nombre del usuario si está en sessionStorage
    const nombreUsuario = sessionStorage.getItem("usuario");
    if (nombreUsuario) {
        document.getElementById("user-name").textContent = nombreUsuario;
    }
});


//IMPLEMENTACION DE BOTONES DE MENU 
document.addEventListener("DOMContentLoaded", () => {
    // Menú desplegable
    document.getElementById("dropdown-op1").addEventListener("click", () => {
        alert("Seleccionaste: Opción 1 del menú desplegable");
    });

    document.getElementById("dropdown-op2").addEventListener("click", () => {
        alert("Seleccionaste: Opción 2 del menú desplegable");
    });

    document.getElementById("dropdown-op3").addEventListener("click", () => {
        alert("Seleccionaste: Opción 3 del menú desplegable");
    });

    // Menú central
    document.getElementById("main-op1").addEventListener("click", () => {
        alert("Seleccionaste: Opción 1 del menú principal");
    });

    document.getElementById("main-op2").addEventListener("click", () => {
        alert("Seleccionaste: Opción 2 del menú principal");
    });

    document.getElementById("main-op3").addEventListener("click", () => {
        alert("Seleccionaste: Opción 3 del menú principal");
    });
});

