document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');

    // Simulación de base de datos local con productos iniciales de Don Rosel
    let products = [
        { name: 'Café Orgánico Molido 500g', category: 'Café', price: 25.00, stock: 15 },
        { name: 'Cacao en Polvo Puro 250g', category: 'Cacao', price: 18.50, stock: 20 }
    ];

    // Función para renderizar la tabla de productos
    function renderProducts() {
        productList.innerHTML = '';
        
        products.forEach((product) => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>S/. ${Number(product.price).toFixed(2)}</td>
                <td>${product.stock}</td>
            `;
            
            productList.appendChild(row);
        });
    }

    // Evento para registrar un nuevo producto desde el formulario
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const category = document.getElementById('category').value;
        const price = parseFloat(document.getElementById('price').value);
        const stock = parseInt(document.getElementById('stock').value);

        if (name && category && !isNaN(price) && !isNaN(stock)) {
            const newProduct = { name, category, price, stock };
            products.push(newProduct);

            renderProducts();
            productForm.reset();
        }
    });

    // Cargar la lista inicial al abrir la página
    renderProducts();
});
