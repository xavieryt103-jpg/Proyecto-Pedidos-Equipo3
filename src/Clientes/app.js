// Obtener clientes guardados
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];


// FORMULARIO
const formulario = document.getElementById("formCliente");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Obtener datos
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const dni = document.getElementById("dni").value;
    const telefono = document.getElementById("telefono").value;
    const correo = document.getElementById("correo").value;

    // Crear cliente
    const cliente = {
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        telefono: telefono,
        correo: correo
    };

    // Agregar cliente
    clientes.push(cliente);

    // Guardar en navegador
    localStorage.setItem("clientes", JSON.stringify(clientes));

    alert("Cliente registrado correctamente");

    // Limpiar formulario
    formulario.reset();

    // Mostrar clientes
    mostrarClientes();
});


// MOSTRAR CLIENTES
function mostrarClientes(lista = clientes) {

    const tabla = document.getElementById("tablaClientes");

    tabla.innerHTML = "";

    lista.forEach(function(cliente, indice) {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${cliente.nombre}</td>
            <td>${cliente.apellido}</td>
            <td>${cliente.dni}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.correo}</td>
            <td>
                <button onclick="eliminarCliente(${indice})">
                    Eliminar
                </button>
            </td>
        `;

        tabla.appendChild(fila);
    });
}


// BUSCAR CLIENTE
document.getElementById("buscar").addEventListener("input", function() {

    const texto = this.value.toLowerCase();

    const resultados = clientes.filter(function(cliente) {

        return (
            cliente.nombre.toLowerCase().includes(texto) ||
            cliente.apellido.toLowerCase().includes(texto) ||
            cliente.dni.includes(texto)
        );

    });

    mostrarClientes(resultados);
});


// ELIMINAR CLIENTE
function eliminarCliente(indice) {

    if (confirm("¿Desea eliminar este cliente?")) {

        clientes.splice(indice, 1);

        localStorage.setItem(
            "clientes",
            JSON.stringify(clientes)
        );

        mostrarClientes();
    }
}


// Mostrar clientes al iniciar
mostrarClientes();