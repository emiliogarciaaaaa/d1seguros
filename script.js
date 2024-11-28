// Lista de vehículos con la nueva información
const vehicles = [
    { 
        name: "Sentra gris", 
        nextPaymentDate: "2024-12-10", 
        amountToPay: 1500, // Monto a pagar
        vin: "1HGBH41JXMN109186" // Número de serie
    },
    { 
        name: "yaris 22", 
        nextPaymentDate: "2024-11-30", 
        amountToPay: 1200, 
        vin: "2HGFA16518H101234" 
    },
    { 
        name: "ford roja", 
        nextPaymentDate: "2024-12-05", 
        amountToPay: 2000, 
        vin: "1FTFW1EF1EKF12345" 
    },
    { 
        name: "carro azul", 
        nextPaymentDate: "2025-01-02", 
        amountToPay: 1800, 
        vin: "1G1ZB5ST5LF123456" 
    }
];

// Función para convertir la fecha numérica en una fecha escrita
function formatDateToString(dateString) {
    const months = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio", 
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} de ${month} de ${year}`;
}

// Función para verificar si el pago está vencido
function isPaymentDue(nextPaymentDate) {
    const today = new Date();
    const paymentDate = new Date(nextPaymentDate);
    return paymentDate <= today;
}

// Función para calcular los días restantes
function daysRemaining(nextPaymentDate) {
    const today = new Date();
    const paymentDate = new Date(nextPaymentDate);
    const diffTime = paymentDate - today; // Diferencia en milisegundos
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convertimos de milisegundos a días
}

// Selecciona el cuerpo de la tabla donde se agregarán las filas
const tableBody = document.getElementById("table-body");

// Función para actualizar la tabla
function updateTable() {
    // Limpia la tabla antes de agregar las nuevas filas
    tableBody.innerHTML = "";

    // Recorre el arreglo de vehículos y genera las filas dinámicamente
    vehicles.forEach(vehicle => {
        const row = document.createElement("tr"); // Crea una fila
        row.innerHTML = `
            <td>${vehicle.name}</td> <!-- Nombre del vehículo -->
            <td>${vehicle.vin}</td> <!-- Número de serie -->
            <td>${vehicle.amountToPay} MXN</td> <!-- Monto a pagar -->
            <td>${formatDateToString(vehicle.nextPaymentDate)}</td> <!-- Fecha escrita -->
            <td>${isPaymentDue(vehicle.nextPaymentDate) ? "Sí" : "No"}</td> <!-- Pago vencido -->
            <td>${daysRemaining(vehicle.nextPaymentDate)} días</td> <!-- Días restantes -->
        `;
        tableBody.appendChild(row); // Agrega la fila a la tabla
    });
}

// Actualiza la tabla al cargar la página
updateTable();

// Actualiza la tabla cada minuto (60000 milisegundos)
setInterval(updateTable, 60000);