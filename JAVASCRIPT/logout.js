// logout.js
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".logout-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Mostrar mensaje de cerrando sesión
            alert("Cerrando sesión...");
            
            // Limpiar sessionStorage
            sessionStorage.removeItem("usuario");
            sessionStorage.removeItem("esAdmin");
            
            // Redirigir al index.html
            window.location.href = "index.html";
        });
    });
});