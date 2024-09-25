const productsElement = document.getElementById('products');
const cartItemsElement = document.getElementById('cart-items');
const totalMRPElement = document.getElementById('total-mrp');
const totalAmountElement = document.getElementById('total-amount');

let products = [];
let cart = [];

// Fetch products from Fake Store API
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        products = data;
        displayProducts(products);
    });

function displayProducts(products) {
    productsElement.innerHTML = '';
    products.forEach(product => {
        productsElement.innerHTML += `
            <div class="product">
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>₹${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    cartItemsElement.innerHTML = '';
    let totalMRP = 0;

    cart.forEach(item => {
        totalMRP += item.price * item.quantity;
        cartItemsElement.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" width="50">
                <p>${item.title}</p>
                <p>₹${item.price} x ${item.quantity}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    });

    totalMRPElement.innerText = totalMRP;
    calculateTotal(totalMRP);
}

function calculateTotal(totalMRP) {
    const discount = 50;
    const platformFee = 10;
    const shipping = 20;

    const totalAmount = totalMRP - discount + platformFee + shipping;
    totalAmountElement.innerText = totalAmount;
}

// Search functionality
document.getElementById('search').addEventListener('input', function(e) {
    const searchText = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchText)
    );
    displayProducts(filteredProducts);
});
