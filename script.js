
// ---------- Shopping Cart ----------
let cart = [];
let total = 0;

function addToCart(product, price) {
    price = Number(price);

    cart.push({ product, price });
    total += price;

    document.getElementById("cart-count").innerText = `Cart: ${cart.length} items`;
    document.getElementById("total-price").innerText = `Total: ₹${total}`;

    const item = document.createElement("li");
    item.innerText = `${product} - ₹${price}`;
    document.getElementById("cart-list").appendChild(item);
}

function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert(`Order placed!\nItems: ${cart.length}\nTotal: ₹${total}`);

    cart = [];
    total = 0;
    document.getElementById("cart-count").innerText = "Cart: 0 items";
    document.getElementById("total-price").innerText = "Total: ₹0";
    document.getElementById("cart-list").innerHTML = "";
}

// ---------- Farmer Dashboard ----------
let products = JSON.parse(localStorage.getItem("products")) || [];

function displayProducts() {
    const list = document.getElementById("productList");
    if (!list) return;

    list.innerHTML = "";

    products.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h2>${item.name}</h2>
            <p>₹${item.price}/kg</p>
            <button onclick="deleteProduct(${index})">Delete</button>
        `;
        list.appendChild(card);
    });
}

function addProduct() {
    const name = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value.trim();

    if (!name || !price) {
        alert("Please fill all fields.");
        return;
    }

    products.push({ name, price });
    localStorage.setItem("products", JSON.stringify(products));

    displayProducts();

    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
}

function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}

// ---------- Consumer Page ----------
function loadConsumerProducts() {
    const container = document.getElementById("consumerProducts");
    if (!container) return;

    container.innerHTML = "";

    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

    storedProducts.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h2>${item.name}</h2>
            <p>₹${item.price}/kg</p>
            <button onclick="addToCart('${item.name}', ${Number(item.price)})">
                Buy Now
            </button>
        `;

        container.appendChild(card);
    });
}

displayProducts();
loadConsumerProducts();