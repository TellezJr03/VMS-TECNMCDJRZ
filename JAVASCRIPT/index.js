// JS/main.js
document.addEventListener('DOMContentLoaded', function () {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function () {
            window.location.href = 'login.html'; // Ruta relativa válida
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const loginBtn = document.getElementById('loginBtn2');
    if (loginBtn) {
        loginBtn.addEventListener('click', function () {
            window.location.href = 'login.html'; // Ruta relativa válida
        });
    }
});
