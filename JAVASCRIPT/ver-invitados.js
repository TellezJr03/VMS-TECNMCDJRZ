document.addEventListener("DOMContentLoaded", () => {
    // Mostrar nombre del usuario
    const nombreUsuario = sessionStorage.getItem("usuario");
    if (nombreUsuario) {
        document.getElementById("user-name").textContent = nombreUsuario;
    } else {
        document.getElementById("user-name").textContent = "Invitado";
    }

    // Variables para manejar la eliminación
    let invitadoAEliminar = null;

    // Cargar lista de invitados
    cargarInvitados();

    // Configurar modal de confirmación
    document.getElementById("confirmar-eliminar").addEventListener("click", () => {
        if (invitadoAEliminar) {
            eliminarInvitado(invitadoAEliminar);
            $('#confirmarEliminarModal').modal('hide');
        }
    });

    function cargarInvitados() {
        // Simulación de datos - en producción esto vendría de una API
        const invitadosEjemplo = [
            { id: 1, nombre: "Juan", apellido: "Pérez", telefono: "6561234567", correo: "juan@example.com", empresa: "Tecnológico Nacional" },
            { id: 2, nombre: "María", apellido: "García", telefono: "6567654321", correo: "maria@example.com", empresa: "Universidad XYZ" },
            { id: 3, nombre: "Carlos", apellido: "López", telefono: "6561112233", correo: "carlos@example.com", empresa: "Empresa ABC" },
            { id: 4, nombre: "Ana", apellido: "Martínez", telefono: "6564445566", correo: "ana@example.com", empresa: "Instituto DEF" }
        ];

        const tbody = document.getElementById("lista-invitados");
        tbody.innerHTML = "";

        if (invitadosEjemplo.length === 0) {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td colspan="6" class="text-center">No hay invitados registrados</td>`;
            tbody.appendChild(tr);
            return;
        }

        invitadosEjemplo.forEach(invitado => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${invitado.nombre}</td>
                <td>${invitado.apellido}</td>
                <td>${invitado.telefono}</td>
                <td>${invitado.correo}</td>
                <td>${invitado.empresa}</td>
                <td>
                    <button class="btn btn-action btn-danger eliminar-invitado" data-id="${invitado.id}">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Agregar eventos a los botones de eliminar
        document.querySelectorAll(".eliminar-invitado").forEach(btn => {
            btn.addEventListener("click", (e) => {
                invitadoAEliminar = e.target.getAttribute("data-id");
                $('#confirmarEliminarModal').modal('show');
            });
        });
    }

    function eliminarInvitado(id) {
        // Aquí normalmente harías una llamada a la API para eliminar el invitado
        console.log(`Eliminando invitado con ID: ${id}`);
        
        // Simulamos la eliminación recargando la lista
        cargarInvitados();
        alert("Invitado eliminado correctamente");
    }
});