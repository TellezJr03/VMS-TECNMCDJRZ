document.addEventListener("DOMContentLoaded", () => {
    // Mostrar nombre del usuario
    const nombreUsuario = sessionStorage.getItem("usuario");
    if (nombreUsuario) {
        document.getElementById("user-name").textContent = nombreUsuario;
    } else {
        document.getElementById("user-name").textContent = "Invitado";
    }

    // Verificar si el usuario es administrador
    const esAdmin = sessionStorage.getItem("esAdmin") === "true";
    if (!esAdmin) {
        window.location.href = "menu.html";
        return;
    }

    // Cargar datos y crear gráficas
    cargarDatosHistorial();

    function cargarDatosHistorial() {
        // Simulación de datos - en producción esto vendría de una API
        const datosEjemplo = {
            visitasMes: {
                labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
                data: [15, 22, 18, 25]
            },
            visitasSemana: {
                labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
                data: [5, 7, 3, 8, 6, 2]
            },
            topUsuarios: {
                labels: ['Juan Pérez', 'María García', 'Carlos López', 'Ana Martínez', 'Luis Ramírez'],
                data: [12, 9, 7, 5, 3]
            }
        };

        crearGraficas(datosEjemplo);
    }

    function crearGraficas(datos) {
        // Gráfica de visitas este mes
        const ctxMes = document.getElementById('visitasMesChart').getContext('2d');
        new Chart(ctxMes, {
            type: 'bar',
            data: {
                labels: datos.visitasMes.labels,
                datasets: [{
                    label: 'Visitas por semana',
                    data: datos.visitasMes.data,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Gráfica de visitas esta semana
        const ctxSemana = document.getElementById('visitasSemanaChart').getContext('2d');
        new Chart(ctxSemana, {
            type: 'line',
            data: {
                labels: datos.visitasSemana.labels,
                datasets: [{
                    label: 'Visitas por día',
                    data: datos.visitasSemana.data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    tension: 0.1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Gráfica de top usuarios
        const ctxUsuarios = document.getElementById('topUsuariosChart').getContext('2d');
        new Chart(ctxUsuarios, {
            type: 'doughnut',
            data: {
                labels: datos.topUsuarios.labels,
                datasets: [{
                    label: 'Visitas por usuario',
                    data: datos.topUsuarios.data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                    }
                }
            }
        });
    }
});