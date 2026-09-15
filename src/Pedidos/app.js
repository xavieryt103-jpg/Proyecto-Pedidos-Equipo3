document.addEventListener('DOMContentLoaded', () => {
	const orderForm = document.getElementById('order-form');
	const orderList = document.getElementById('order-list');
	const searchInput = document.getElementById('search');
	const emptyMessage = document.getElementById('empty-message');

	let orders = JSON.parse(localStorage.getItem('donRoselOrders')) || [];

	function saveOrders() {
		localStorage.setItem('donRoselOrders', JSON.stringify(orders));
	}

	function renderOrders() {
		const search = searchInput.value.trim().toLowerCase();
		const filteredOrders = orders.filter((order) =>
			String(order.number).includes(search) ||
			order.customer.toLowerCase().includes(search)
		);

		orderList.innerHTML = '';
		emptyMessage.hidden = filteredOrders.length > 0;

		filteredOrders.forEach((order) => {
			const row = document.createElement('tr');
			row.innerHTML = `
				<td>${order.number}</td>
				<td>${order.customer}</td>
				<td>${order.product}</td>
				<td>${order.quantity}</td>
				<td>${order.date}</td>
				<td><span class="status">${order.status}</span></td>
				<td><button type="button" class="btn-delete" data-number="${order.number}">Eliminar</button></td>
			`;
			orderList.appendChild(row);
		});
	}

	orderForm.addEventListener('submit', (event) => {
		event.preventDefault();

		const newOrder = {
			number: orders.length > 0 ? Math.max(...orders.map((order) => order.number)) + 1 : 1,
			customer: document.getElementById('customer').value.trim(),
			product: document.getElementById('product').value.trim(),
			quantity: Number(document.getElementById('quantity').value),
			date: document.getElementById('date').value,
			status: 'Pendiente'
		};

		orders.push(newOrder);
		saveOrders();
		renderOrders();
		orderForm.reset();
		document.getElementById('date').valueAsDate = new Date();
	});

	orderList.addEventListener('click', (event) => {
		if (!event.target.classList.contains('btn-delete')) {
			return;
		}

		const orderNumber = Number(event.target.dataset.number);
		orders = orders.filter((order) => order.number !== orderNumber);
		saveOrders();
		renderOrders();
	});

	searchInput.addEventListener('input', renderOrders);
	document.getElementById('date').valueAsDate = new Date();
	renderOrders();
});
