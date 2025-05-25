document.addEventListener("DOMContentLoaded", () => {
    // Mostrar nombre del usuario
    const nombreUsuario = sessionStorage.getItem("usuario");
    if (nombreUsuario) {
        document.getElementById("user-name").textContent = nombreUsuario;
    } else {
        document.getElementById("user-name").textContent = "Invitado";
    }

    // Obtener ID de la visita de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const visitaId = urlParams.get('id');

    if (visitaId) {
        cargarDetallesVisita(visitaId);
        cargarInvitadosVisita(visitaId);
    } else {
        // Redirigir si no hay ID
        window.location.href = "menu.html";
    }

    function cargarDetallesVisita(id) {
        // Simulación de datos - en producción esto vendría de una API
        const visitaEjemplo = {
            id: id,
            nombre: "Juan Pérez",
            fecha: "2023-11-15",
            hora: "10:30",
            motivo: "Reunión académica",
            estatus: "Pendiente"
        };

        // Llenar los datos en la página
        document.getElementById("visita-id").textContent = visitaEjemplo.id;
        document.getElementById("visita-nombre").textContent = visitaEjemplo.nombre;
        document.getElementById("visita-fecha").textContent = visitaEjemplo.fecha;
        document.getElementById("visita-hora").textContent = visitaEjemplo.hora;
        document.getElementById("visita-motivo").textContent = visitaEjemplo.motivo;
        document.getElementById("visita-estatus").textContent = visitaEjemplo.estatus;
    }

    function cargarInvitadosVisita(visitaId) {
        // Simulación de datos - en producción esto vendría de una API
        const invitadosEjemplo = [
            { nombre: "María García", correo: "maria@example.com", telefono: "6561234567", empresa: "Tecnológico Nacional" },
            { nombre: "Carlos López", correo: "carlos@example.com", telefono: "6567654321", empresa: "Universidad XYZ" }
        ];

        const tbody = document.getElementById("invitados-table-body");
        tbody.innerHTML = "";

        if (invitadosEjemplo.length === 0) {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td colspan="4" class="text-center">No hay invitados registrados para esta visita</td>`;
            tbody.appendChild(tr);
            return;
        }

        invitadosEjemplo.forEach(invitado => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${invitado.nombre}</td>
                <td>${invitado.correo}</td>
                <td>${invitado.telefono}</td>
                <td>${invitado.empresa}</td>
            `;
            tbody.appendChild(tr);
        });
    }
});