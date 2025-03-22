
class CartItem {
    constructor(name, price, size, image) {
        this.name = name;
        this.price = parseFloat(price);
        this.size = size;
        this.image = image;
        this.quantity = 1;
    }
}

class CartManager {
    constructor() {
        this.cart = this.loadCart();
    }

    loadCart() {
        const savedCart = localStorage.getItem('shoppingCart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    }

    addItem(name, price, size, image) {
        const existingItem = this.cart.find(item => 
            item.name === name && item.size === size
        );

        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.cart.push(new CartItem(name, price, size, image));
        }
        
        this.saveCart();
        this.updateCartCount();
    }

    updateCartCount() {
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
        }
    }

    calculateTotals() {
        const subtotal = this.cart.reduce((sum, item) => 
            sum + (item.price * item.quantity), 0
        );
        const shipping = subtotal > 0 ? 10 : 0;
        const total = subtotal + shipping;

        return { subtotal, shipping, total };
    }

    renderCheckoutItems() {
        const cartList = document.getElementById('cart-list');
        if (!cartList) return;

        cartList.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-name">
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                    ${item.name} (${item.size})
                </div>
                <div>$${item.price.toFixed(2)}</div>
                <div>${item.quantity}</div>
                <div>$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `).join('');

        const totals = this.calculateTotals();
        document.querySelector('.summary-subtotal').textContent = `$${totals.subtotal.toFixed(2)}`;
        document.querySelector('.shipping-cost').textContent = `$${totals.shipping.toFixed(2)}`;
        document.querySelector('.order-total').textContent = `$${totals.total.toFixed(2)}`;
    }
}

const cartManager = new CartManager();

window.cartManager = cartManager;

document.addEventListener('DOMContentLoaded', () => {

    cartManager.renderCheckoutItems();
    document.querySelector('.apply-promo')?.addEventListener('click', () => {
        const promoCode = document.querySelector('.promo-input').value;
        alert('Promo code applied: ' + promoCode);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    cartManager.updateCartCount();
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('p').textContent.replace('$', '');
            const productSize = productCard.querySelector('.size-select').value;
            const productImage = productCard.querySelector('img').src;
            
            cartManager.addItem(productName, productPrice, productSize, productImage);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    cartManager.renderCheckoutItems();
    document.querySelector('.apply-promo')?.addEventListener('click', () => {
        const promoCode = document.querySelector('.promo-input').value;
        alert('Promo code applied: ' + promoCode);
    });
});

