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

    if (!visitaId) {
        window.location.href = "menu.html";
        return;
    }

    // Cargar datos de la visita
    cargarDatosVisita(visitaId);
    cargarInvitados(visitaId);

    // Configurar el modal de invitados
    const invitadoModal = $('#invitadoModal');
    let editInvitadoIndex = null;

    // Botón para agregar invitado
    document.getElementById("agregar-invitado").addEventListener("click", () => {
        editInvitadoIndex = null;
        document.getElementById("invitadoModalLabel").textContent = "Agregar Invitado";
        document.getElementById("invitado-form").reset();
        invitadoModal.modal('show');
    });

    // Guardar invitado
    document.getElementById("guardar-invitado").addEventListener("click", () => {
        const form = document.getElementById("invitado-form");
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const nuevoInvitado = {
            nombre: document.getElementById("invitado-nombre").value,
            correo: document.getElementById("invitado-correo").value,
            telefono: document.getElementById("invitado-telefono").value,
            empresa: document.getElementById("invitado-empresa").value
        };

        // Aquí normalmente harías una llamada a la API para guardar el invitado
        // Por ahora simulamos la acción
        if (editInvitadoIndex !== null) {
            // Editar invitado existente
            console.log("Editando invitado:", editInvitadoIndex, nuevoInvitado);
        } else {
            // Agregar nuevo invitado
            console.log("Agregando nuevo invitado:", nuevoInvitado);
        }

        invitadoModal.modal('hide');
        cargarInvitados(visitaId); // Recargar la lista
    });

    // Formulario de edición de visita
    document.getElementById("editar-visita-form").addEventListener("submit", (e) => {
        e.preventDefault();
        
        const form = e.target;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const visitaEditada = {
            nombre: document.getElementById("nombre").value,
            fecha: document.getElementById("fecha").value,
            hora: document.getElementById("hora").value,
            motivo: document.getElementById("motivo").value,
            estatus: document.getElementById("estatus").value
        };

        // Aquí normalmente harías una llamada a la API para guardar los cambios
        console.log("Guardando cambios para visita ID:", visitaId, visitaEditada);
        
        alert("Los cambios se han guardado correctamente");
        window.location.href = "menu.html";
    });

    function cargarDatosVisita(id) {
        // Simulación de datos - en producción esto vendría de una API
        const visitaEjemplo = {
            id: id,
            nombre: "Juan Pérez",
            fecha: "2023-11-15",
            hora: "10:30",
            motivo: "Reunión académica",
            estatus: "Pendiente"
        };

        // Llenar el formulario
        document.getElementById("nombre").value = visitaEjemplo.nombre;
        document.getElementById("fecha").value = visitaEjemplo.fecha;
        document.getElementById("hora").value = visitaEjemplo.hora;
        document.getElementById("motivo").value = visitaEjemplo.motivo;
        document.getElementById("estatus").value = visitaEjemplo.estatus;
    }

    function cargarInvitados(visitaId) {
        // Simulación de datos - en producción esto vendría de una API
        const invitadosEjemplo = [
            { nombre: "María García", correo: "maria@example.com", telefono: "6561234567", empresa: "Tecnológico Nacional" },
            { nombre: "Carlos López", correo: "carlos@example.com", telefono: "6567654321", empresa: "Universidad XYZ" }
        ];

        const tbody = document.getElementById("invitados-table-body");
        tbody.innerHTML = "";

        if (invitadosEjemplo.length === 0) {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td colspan="5" class="text-center">No hay invitados registrados para esta visita</td>`;
            tbody.appendChild(tr);
            return;
        }

        invitadosEjemplo.forEach((invitado, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${invitado.nombre}</td>
                <td>${invitado.correo}</td>
                <td>${invitado.telefono}</td>
                <td>${invitado.empresa}</td>
                <td>
                    <button class="btn btn-action btn-primary editar-invitado" data-index="${index}">Editar</button>
                    <button class="btn btn-action btn-danger eliminar-invitado" data-index="${index}">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Agregar eventos a los botones de editar
        document.querySelectorAll(".editar-invitado").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                editarInvitado(index);
            });
        });

        // Agregar eventos a los botones de eliminar
        document.querySelectorAll(".eliminar-invitado").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                eliminarInvitado(index);
            });
        });
    }

    function editarInvitado(index) {
        // Simulación: obtener datos del invitado
        const invitadoEjemplo = {
            nombre: "María García",
            correo: "maria@example.com",
            telefono: "6561234567",
            empresa: "Tecnológico Nacional"
        };

        editInvitadoIndex = index;
        document.getElementById("invitadoModalLabel").textContent = "Editar Invitado";
        document.getElementById("invitado-nombre").value = invitadoEjemplo.nombre;
        document.getElementById("invitado-correo").value = invitadoEjemplo.correo;
        document.getElementById("invitado-telefono").value = invitadoEjemplo.telefono;
        document.getElementById("invitado-empresa").value = invitadoEjemplo.empresa;
        $('#invitadoModal').modal('show');
    }

    function eliminarInvitado(index) {
        if (confirm("¿Estás seguro de eliminar este invitado?")) {
            // Aquí normalmente harías una llamada a la API para eliminar el invitado
            console.log("Eliminando invitado con índice:", index);
            cargarInvitados(visitaId); // Recargar la lista
        }
    }
});