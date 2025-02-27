// Global cart array
let cart = [];

// Update cart count in the header
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

// Add products to the cart
function addToCart(productName, productPrice) {
    const product = {
        name: productName,
        price: productPrice,
        quantity: 1
    };

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    if (existingProductIndex >= 0) {
        // If product exists, increment the quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // Otherwise, add a new product to the cart
        cart.push(product);
    }

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count in the header and show an alert
    updateCartCount();
    alert(`${productName} has been added to your cart!`);
}

// Display the cart items on the cart page
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    const storedCart = localStorage.getItem('cart');

    // Check if cart is available in localStorage
    if (storedCart) {
        cart = JSON.parse(storedCart);
        cartItemsDiv.innerHTML = ''; // Clear previous cart items

        // Loop through cart items and display them
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>Price: Rs. ${item.price}</p>
                </div>
                <div class="quantity-control">
                    <button class="decrease" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase" data-index="${index}">+</button>
                </div>
            `;
            cartItemsDiv.appendChild(cartItem);
        });

        // Event listeners for increase/decrease buttons
        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                cart[index].quantity += 1;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay(); // Refresh cart display
            });
        });

        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1); // Remove item if quantity is 0
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay(); // Refresh cart display
            });
        });
    } else {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    }

    // Update the total price dynamically
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Initialize the cart on page load
function initializeCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
    updateCartCount(); // Set initial cart count on page load
}

// Event listeners for adding products to the cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.getAttribute('data-product');
        const productPrice = parseFloat(this.getAttribute('data-price'));
        addToCart(productName, productPrice);
    });
});

// Update cart count when the page loads on the index page
if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
    initializeCart(); // Load cart items and count on homepage
}

// Display cart items when on the cart page
if (window.location.pathname.endsWith('cart.html')) {
    updateCartDisplay();
}
