document.addEventListener('DOMContentLoaded', () => {
    function loadCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function renderCartItems() {
        const cart = loadCart();
        const cartList = document.getElementById('cart-list');
        const summarySubtotal = document.querySelector('.summary-subtotal');
        const shippingCost = document.querySelector('.shipping-cost');
        const orderTotal = document.querySelector('.order-total');

        if (!cartList) return;

        cartList.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-name">
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                    ${item.name} (${item.size})
                </div>
                <div>$${item.price.toFixed(2)}</div>
                <div>${item.quantity}</div>
                <div>$${(item.price * item.quantity).toFixed(2)}</div>
                <button class="delete-item" data-index="${index}">Delete</button>
            </div>
        `).join('');

        const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        const shipping = subtotal > 0 ? 10 : 0;
        const total = subtotal + shipping;

        summarySubtotal.textContent = `$${subtotal.toFixed(2)}`;
        shippingCost.textContent = `$${shipping.toFixed(2)}`;
        orderTotal.textContent = `$${total.toFixed(2)}`;

        document.querySelectorAll('.delete-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                deleteCartItem(index);
            });
        });
    }

    function deleteCartItem(index) {
        const cart = loadCart();
        cart.splice(index, 1);
        saveCart(cart);
        renderCartItems();
    }

    renderCartItems();
});
