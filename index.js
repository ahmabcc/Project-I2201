document.addEventListener('DOMContentLoaded', () => {
    let cartCount = 0;

    function updateCartCount() {
        document.querySelector('.cart-count').textContent = cartCount;
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function loadCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    function addToCart(productName, productPrice, productSize, productImage) {
        const cart = loadCart();
        const existingItem = cart.find(item => item.name === productName && item.size === productSize);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name: productName, price: productPrice, size: productSize, image: productImage, quantity: 1 });
        }

        saveCart(cart);
        cartCount++;
        updateCartCount();
        console.log(`Added to Cart: ${productName} - $${productPrice} - Size: ${productSize}`);
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('p').textContent.replace('$', '');
            const productSize = productCard.querySelector('.size-select').value;
            const productImage = productCard.querySelector('img').src;

            addToCart(productName, productPrice, productSize, productImage);
        });
    });

    const cart = loadCart();
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    updateCartCount();
});

