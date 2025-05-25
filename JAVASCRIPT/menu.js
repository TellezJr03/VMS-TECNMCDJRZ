document.addEventListener("DOMContentLoaded", () => {
    // Mostrar nombre del usuario si está en sessionStorage
    const nombreUsuario = sessionStorage.getItem("usuario");
    const esAdmin = sessionStorage.getItem("esAdmin") === "true";
    
    if (nombreUsuario) {
        document.getElementById("user-name").textContent = nombreUsuario;
    } else {
        document.getElementById("user-name").textContent = "Invitado";
    }

    // Mostrar/ocultar opción de historial si es admin
    const historialLink = document.getElementById("nav-op4");
    if (!esAdmin) {
        historialLink.parentElement.style.display = "none";
    }

    // Cargar datos de visitas al cargar la página
    cargarVisitas();

    // Eventos para los botones del navbar
    document.getElementById("nav-op1").addEventListener("click", (e) => {
        e.preventDefault();
        cargarVisitas();
    });

    document.getElementById("nav-op2").addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "crear-visita.html";
    });

    document.getElementById("nav-op3").addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "crear-invitado.html";
    });

    document.getElementById("nav-op4").addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "historial-visitas.html";
    });

    document.getElementById("nav-op5").addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "ver-invitados.html";
    });

    // Función para cargar visitas desde la base de datos
    function cargarVisitas() {
        obtenerVisitasDesdeBD()
            .then(visitas => {
                llenarTablaVisitas(visitas);
            })
            .catch(error => {
                console.error("Error al cargar visitas:", error);
            });
    }

    // Esqueleto de función para obtener visitas desde la base de datos
    function obtenerVisitasDesdeBD() {
        return new Promise((resolve, reject) => {
            // Simulación de datos
            setTimeout(() => {
                const visitasEjemplo = [
                    { id: 1, nombre: "Juan Pérez", fecha: "2023-11-15", hora: "10:30", motivo: "Reunión académica", estatus: "Pendiente" },
                    { id: 2, nombre: "María García", fecha: "2023-11-16", hora: "14:00", motivo: "Entrevista laboral", estatus: "Aprobada" }
                ];
                resolve(visitasEjemplo);
            }, 500);
        });
    }

    // Función para llenar la tabla con los datos de las visitas
    function llenarTablaVisitas(visitas) {
        const tbody = document.getElementById("visitas-table-body");
        tbody.innerHTML = "";

        if (visitas.length === 0) {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td colspan="7" class="text-center">No hay visitas registradas</td>`;
            tbody.appendChild(tr);
            return;
        }

        visitas.forEach(visita => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${visita.id}</td>
                <td>${visita.nombre}</td>
                <td>${visita.fecha}</td>
                <td>${visita.hora}</td>
                <td>${visita.motivo}</td>
                <td>${visita.estatus}</td>
                <td>
                    <a href="ver-visita.html?id=${visita.id}" class="btn-action btn-view">Ver</a>
                    <a href="editar-visita.html?id=${visita.id}" class="btn-action btn-edit">Editar</a>
                    <button class="btn-action btn-delete" data-id="${visita.id}">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Agregar eventos a los botones de eliminar
        document.querySelectorAll(".btn-delete").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = e.target.getAttribute("data-id");
                if (confirm(`¿Estás seguro de eliminar la visita con ID: ${id}?`)) {
                    eliminarVisita(id);
                }
            });
        });
    }

    function eliminarVisita(id) {
        // Aquí normalmente harías una llamada a la API para eliminar la visita
        console.log(`Eliminando visita con ID: ${id}`);
        cargarVisitas();
        alert(`Visita con ID ${id} eliminada correctamente`);
    }
    
});