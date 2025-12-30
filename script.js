// Cart
let carticon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closecart = document.querySelector("#cart-close");

// Cart content
let cartContent = document.querySelector(".cart-content");
let totalPriceElement = document.querySelector(".total-price");

// Cart items
let cartItems = [];

// Open Cart
carticon.onclick = () => {
    cart.classList.add("active");
};

// Close Cart
closecart.onclick = () => {
    cart.classList.remove("active");
};

// Add to Cart
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-cart")) {
        addProductToCart(event.target.parentElement);
    }
});

function addProductToCart(product) {
    let title = product.querySelector(".product-title").textContent;
    let price = parseFloat(product.querySelector(".price").textContent.replace("₹", ""));
    let imgSrc = product.querySelector(".product-img").getAttribute("src");

    // Check if the product is already in the cart
    for (let item of cartItems) {
        if (item.title === title) {
            alert("Product is already in the cart.");
            return;
        }
    }

    let cartItem = {
        title: title,
        price: price,
        imgSrc: imgSrc,
        quantity: 1
    };

    cartItems.push(cartItem);

    // Create a new cart item element
    let cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cart-box");
    cartItemElement.innerHTML = `
        <img src="${imgSrc}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">₹${price.toFixed(2)}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>
    `;

    // Add event listener to remove items from the cart
    let removeButton = cartItemElement.querySelector(".cart-remove");
    removeButton.addEventListener("click", () => {
        removeCartItem(cartItemElement, cartItem);
    });

    // Add event listener for quantity changes
    let quantityInput = cartItemElement.querySelector(".cart-quantity");
    quantityInput.addEventListener("change", () => {
        updateCartItemQuantity(cartItem, quantityInput.value);
    });

    // Append the cart item to the cart content
    cartContent.appendChild(cartItemElement);

    // Update the total price
    updateTotal();
}

function removeCartItem(cartItemElement, cartItem) {
    cartContent.removeChild(cartItemElement);
    cartItems = cartItems.filter(item => item !== cartItem);
    updateTotal();
}

function updateCartItemQuantity(cartItem, quantity) {
    cartItem.quantity = parseInt(quantity);
    updateTotal();
}

function updateTotal() {
    let total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPriceElement.textContent = `₹${total.toFixed(2)}`;
}


function addProductToCart(product) {
    let title = product.querySelector(".product-title").textContent;
    let price = parseFloat(product.querySelector(".price").textContent.replace("₹", ""));
    let imgSrc = product.querySelector(".product-img").getAttribute("src");

    // Check if the product is already in the cart
    for (let item of cartItems) {
        if (item.title === title) {
            alert("Product is already in the cart.");
            return;
        }
    }

    let cartItem = {
        title: title,
        price: price,
        imgSrc: imgSrc,
        quantity: 1
    };

    cartItems.push(cartItem);

    // Create a new cart item element
    let cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cart-box");
    cartItemElement.innerHTML = `
        <img src="${imgSrc}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">₹${price.toFixed(2)}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>
    `;

    // Add event listener to remove items from the cart
    let removeButton = cartItemElement.querySelector(".cart-remove");
    removeButton.addEventListener("click", () => {
        removeCartItem(cartItemElement, cartItem);
    });

    // Add event listener for quantity changes
    let quantityInput = cartItemElement.querySelector(".cart-quantity");
    quantityInput.addEventListener("change", () => {
        updateCartItemQuantity(cartItem, quantityInput.value);
    });

    // Append the cart item to the cart content
    cartContent.appendChild(cartItemElement);

    // Update the total price
    updateTotal();

    // Open the cart
    cart.classList.add("active");
}
// ----------- popup ---------------
// ... (existing code)

// Buy Now button
let buyButton = document.querySelector("#buy-button");
buyButton.onclick = () => {
    if (cartItems.length === 0) {
        alert("Your cart is empty. Add some items before proceeding.");
        window.location.replace("Product.html");
        
    } else {
        // Implement the logic for the "Buy Now" action here
        // For now, let's just log a message to the console
        console.log("Processing Buy Now action...");
    }
};

// Add to Cart
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-cart")) {
        // Extract product details
        let productElement = event.target.parentElement;
        let title = productElement.querySelector(".product-title").textContent;
        let price = parseFloat(productElement.querySelector(".price").textContent.replace("₹", ""));
        let quantity = parseInt(productElement.querySelector(".cart-quantity").value);

        // Add product to the cart
        addProductToCart(productElement);

        // Send data to PHP script using AJAX
        sendDataToPHP(title, price, quantity);
    }
});

function sendDataToPHP(title, price, quantity) {
    // Create a new XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Specify the PHP script URL
    let phpScript = "Product.php";

    // Prepare the data to be sent
    let data = "addToCart=1&productTitle=" + encodeURIComponent(title) + "&productPrice=" + encodeURIComponent(price) + "&productQuantity=" + encodeURIComponent(quantity);

    // Configure the request
    xhr.open("POST", phpScript, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Define a callback function to handle the response
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // You can handle the response from the server here if needed
            console.log(xhr.responseText);
        }
    };

    // Send the request
    xhr.send(data);
}


