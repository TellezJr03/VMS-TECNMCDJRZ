document.addEventListener("DOMContentLoaded", () => {
    // Mostrar nombre del usuario
    const nombreUsuario = sessionStorage.getItem("usuario");
    if (nombreUsuario) {
        document.getElementById("user-name").textContent = nombreUsuario;
    } else {
        document.getElementById("user-name").textContent = "Invitado";
    }

    // Establecer fecha mínima como hoy
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById("fecha-visita").min = hoy;

    // Variables para almacenar invitados seleccionados
    let invitadosSeleccionados = [];

    // Botón para abrir modal de selección de invitados
    document.getElementById("agregar-invitados-btn").addEventListener("click", () => {
        cargarInvitadosDisponibles();
        $('#seleccionarInvitadosModal').modal('show');
    });

    // Guardar selección de invitados
    document.getElementById("guardar-invitados-seleccionados").addEventListener("click", () => {
        const checkboxes = document.querySelectorAll('#lista-invitados input[type="checkbox"]:checked');
        
        invitadosSeleccionados = Array.from(checkboxes).map(checkbox => {
            const row = checkbox.closest('tr');
            return {
                id: checkbox.value,
                nombre: row.cells[1].textContent,
                correo: row.cells[2].textContent,
                telefono: row.cells[3].textContent,
                empresa: row.cells[4].textContent
            };
        });

        actualizarTablaInvitadosSeleccionados();
        $('#seleccionarInvitadosModal').modal('hide');
    });

    // Formulario para crear visita
    document.getElementById("crear-visita-form").addEventListener("submit", (e) => {
        e.preventDefault();
        
        if (!validarFormulario()) {
            return;
        }

        const nuevaVisita = {
            nombre: document.getElementById("nombre-visita").value,
            fecha: document.getElementById("fecha-visita").value,
            hora: document.getElementById("hora-visita").value,
            razon: document.getElementById("razon-visita").value,
            invitados: invitadosSeleccionados
        };

        // Aquí normalmente harías una llamada a la API para guardar la visita
        console.log("Creando nueva visita:", nuevaVisita);
        
        alert("La visita ha sido creada exitosamente");
        window.location.href = "menu.html";
    });

    function cargarInvitadosDisponibles() {
        // Simulación de datos - en producción esto vendría de una API
        const invitadosEjemplo = [
            { id: 1, nombre: "María García", correo: "maria@example.com", telefono: "6561234567", empresa: "Tecnológico Nacional" },
            { id: 2, nombre: "Carlos López", correo: "carlos@example.com", telefono: "6567654321", empresa: "Universidad XYZ" },
            { id: 3, nombre: "Ana Martínez", correo: "ana@example.com", telefono: "6561112233", empresa: "Empresa ABC" },
            { id: 4, nombre: "Luis Ramírez", correo: "luis@example.com", telefono: "6564445566", empresa: "Instituto DEF" }
        ];

        const tbody = document.getElementById("lista-invitados");
        tbody.innerHTML = "";

        invitadosEjemplo.forEach(invitado => {
            const tr = document.createElement("tr");
            const estaSeleccionado = invitadosSeleccionados.some(i => i.id == invitado.id);
            
            tr.innerHTML = `
                <td><input type="checkbox" value="${invitado.id}" ${estaSeleccionado ? 'checked' : ''}></td>
                <td>${invitado.nombre}</td>
                <td>${invitado.correo}</td>
                <td>${invitado.telefono}</td>
                <td>${invitado.empresa}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    function actualizarTablaInvitadosSeleccionados() {
        const tbody = document.getElementById("invitados-seleccionados");
        tbody.innerHTML = "";

        if (invitadosSeleccionados.length === 0) {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td colspan="5" class="text-center">No hay invitados seleccionados</td>`;
            tbody.appendChild(tr);
            return;
        }

        invitadosSeleccionados.forEach((invitado, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${invitado.nombre}</td>
                <td>${invitado.correo}</td>
                <td>${invitado.telefono}</td>
                <td>${invitado.empresa}</td>
                <td>
                    <button class="btn btn-action btn-danger quitar-invitado" data-index="${index}">Quitar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Agregar eventos a los botones de quitar
        document.querySelectorAll(".quitar-invitado").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                invitadosSeleccionados.splice(index, 1);
                actualizarTablaInvitadosSeleccionados();
            });
        });
    }

    function validarFormulario() {
        const form = document.getElementById("crear-visita-form");
        
        if (!form.checkValidity()) {
            form.reportValidity();
            return false;
        }

        if (invitadosSeleccionados.length === 0) {
            alert("Debes seleccionar al menos un invitado");
            return false;
        }

        return true;
    }
});