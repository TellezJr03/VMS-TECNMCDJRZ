document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    const validUsers = [
        { username: "admin", password: "admin123" },
        { username: "capturista1", password: "pass1" },
        { username: "capturista2", password: "pass2" }
    ];

    loginBtn.addEventListener("click", () => {
        if (username.value.trim() === "" || password.value.trim() === "") {
            alert("Hay campos vacíos. Completa con tu información.");
        } else {
            // Validar si el usuario existe
            const user = validUsers.find(user => user.username === username.value.trim() && user.password === password.value.trim());

            if (user) {
                // Si el usuario existe, guardar el nombre de usuario en sessionStorage
                sessionStorage.setItem("usuario", username.value.trim());

                // Redirigir a la página de trabajo
                window.location.href = 'menu.html';
            } else {
                // Si no se encuentra el usuario, mostrar una alerta
                alert("El usuario o la contraseña son incorrectos.");
            }
        }
    });
});


