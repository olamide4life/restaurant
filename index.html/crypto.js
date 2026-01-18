"use strict";

// ===== LOCAL STORAGE =====
let allOrders = JSON.parse(localStorage.getItem('allOrders')) || {};

// ===== MENU DATA =====
const menuData = {
    boba: {
        name: "BOBA",
        items: [
            {id: 'boba1', name: "Classic Boba", description: "Vanilla, Strawberry, Taro, Nutella, Lotus biscoff, Caramel, Oreos cookies chocolate", image: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&h=300&fit=crop", sizes: {large: 8000, medium: 7200}},
        ]
    },
    matcha: {
        name: "MATCHA",
        items: [
            {id: 'matcha1', name: "Classic Matcha", description: "Iced matcha latte, Strawberry matcha, Caramel matcha, Taro Matcha, Latte", image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=300&fit=crop", sizes: {large: 7000, medium: 6500}},
        ]
    },
    smoothies: {
        name: "SMOOTHIES",
        items: [
            {id: 'smooth1', name: "Berry Energy Smoothie", description: "Mixed Strawberry With Blueberry And Banana", image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop", price: 6000},
            {id: 'smooth2', name: "Green Detox Smoothie", description: "Mixed Spinach, Apple With Pineapple And Yoghurt", image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop", price: 3800},
            {id: 'smooth3', name: "Date Banana Smoothie", description: "", image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop", price: 3500},
            {id: 'smooth4', name: "Berry Blast Smoothie", description: "Mixed Banana, Oats, Yogurt With Milk And honey", image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop", price: 3800},
            {id: 'smooth5', name: "Berry Blast Smoothie", description: "Mixed Pineapple With Banana And Milk", image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop", price: 3500},
        ]
    },
    yoghurtparfait: {
        name: "YOGHURT PARFAIT",
        items: [
            {id: 'yoghurt parfait1', name: "450ML", description: "", image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop", price: 6000},
            {id: 'yoghurt parfait2', name: "500ML", description: "", image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop", price: 3800},
            {id: 'yoghurt parfait3', name: "550ML", description: "", image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop", price: 3500},
            {id: 'yoghurt parfait4', name: "1 Liter Bowl", description: "", image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop", price: 3800},
        ]
    } 
};

let orderLocked = false;
let cart = [];

// Restore cart from previous session if available
const savedCart = localStorage.getItem("savedCart");
if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
}


// ===== HELPER: SCROLL TO TOP =====
function scrollToTopSafe() {
    if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        window.scrollTo(0, 0);
    }
}

// ===== MENU =====
function showMenu() {
    document.getElementById('hero').style.display = 'none';
    animateScreen(document.getElementById('menu'));
    document.getElementById('lookupSection').style.display = 'block';
    renderMenu();
    showMenuPopup();
    scrollToTopSafe();
}

function renderMenu() {
    const container = document.getElementById('menuCategories');
    container.innerHTML = '';
    Object.keys(menuData).forEach(categoryKey => {
        const category = menuData[categoryKey];
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'menu-category';
        categoryDiv.innerHTML = `
            <div class="category-header" onclick="toggleCategory('${categoryKey}')">
                <span class="category-title">${category.name}</span>
                <span class="category-icon">▼</span>
            </div>
            <div class="category-items" id="${categoryKey}-items">
                ${category.items.map(item => renderMenuItem(item)).join('')}
            </div>
        `;
        container.appendChild(categoryDiv);
    });
}

function renderMenuItem(item) {
    if (item.sizes) {
        return `
            <div class="menu-item">
                <div class="item-content">
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                    <div class="item-details">
                        <h3 class="item-name">${item.name}</h3>
                        <p class="item-description">${item.description}</p>
                        <div class="size-options">
                            <div class="size-option" onclick="addToCart('${item.id}','${item.name}',${item.sizes.medium},'Medium','${item.image}')">
                                <span class="size-label">Medium</span>
                                <span class="size-price">₦${item.sizes.medium.toLocaleString()}</span>
                            </div>
                            <div class="size-option" onclick="addToCart('${item.id}','${item.name}',${item.sizes.large},'Large','${item.image}')">
                                <span class="size-label">Large</span>
                                <span class="size-price">₦${item.sizes.large.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="menu-item">
                <div class="item-content">
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                    <div class="item-details">
                        <h3 class="item-name">${item.name}</h3>
                        <p class="item-description">${item.description}</p>
                        <div class="single-price-item">
                            <span class="item-price">₦${item.price.toLocaleString()}</span>
                            <button class="add-btn" onclick="addToCart('${item.id}','${item.name}',${item.price},null,'${item.image}')">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function toggleCategory(categoryKey) {
    const items = document.getElementById(categoryKey + '-items');
    items.classList.toggle('active');
    items.previousElementSibling.classList.toggle('active');
}

// ===== CART =====
function addToCart(id, name, price, size, image) {
    if (orderLocked) return;
    const itemName = size ? `${name} (${size})` : name;
    const existingIndex = cart.findIndex(i => i.name === itemName);
    if (existingIndex !== -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({ id, name: itemName, price, image, qty: 1 });
    }
    updateCart();
}

// ===== CART QUANTITY & REMOVE =====
function changeQty(index, delta) {
    if (orderLocked) return;
    cart[index].qty += delta;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    updateCart();
    if (document.getElementById('eatHereForm').classList.contains('active')) renderOrderSummary('eatHereSummary');
    if (document.getElementById('deliveryForm').classList.contains('active')) renderOrderSummary('deliverySummary');
}

function removeItem(index) {
    if (orderLocked) return;
    cart.splice(index, 1);
    updateCart();
    if (cart.length === 0) goBackToMenu();
    if (document.getElementById('eatHereForm').classList.contains('active')) renderOrderSummary('eatHereSummary');
    if (document.getElementById('deliveryForm').classList.contains('active')) renderOrderSummary('deliverySummary');
}

function goBackToMenu() {
    document.getElementById('orderType').classList.remove('active');
    document.getElementById('eatHereForm').classList.remove('active');
    document.getElementById('deliveryForm').classList.remove('active');
    document.getElementById('menu').classList.add('active');
    scrollToTopSafe();
}

// ===== RENDER ORDER SUMMARY =====
function renderOrderSummary(elementId) {
    const container = document.getElementById(elementId);
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    container.innerHTML = `
        <h3 class="summary-title">Order Summary</h3>
        ${cart.map((item, index) => `
            <div class="summary-item">
                <div class="summary-item-info">
                    <img src="${item.image}" alt="${item.name}" class="summary-item-img">
                    <span>${item.name}</span>
                </div>
                <div style="display:flex; align-items:center; gap:10px;">
                    <button onclick="changeQty(${index}, -1)">−</button>
                    <strong>${item.qty}</strong>
                    <button onclick="changeQty(${index}, 1)">+</button>
                    <button onclick="removeItem(${index})">❌</button>
                </div>
                <span>₦${(item.price * item.qty).toLocaleString()}</span>
            </div>
        `).join('')}
        <div class="summary-total">
            <span>Total</span>
            <span>₦${total.toLocaleString()}</span>
        </div>
       <button type="button" class="back-btn" onclick="goBackToMenu()">← Back</button>
    `;
}

// ===== RENDER CONFIRMED ORDER SUMMARY (GLOBAL FIX) =====
function renderConfirmedSummary() {
    const container = document.getElementById('confirmSummary');
    const lastOrder = Object.values(allOrders).slice(-1)[0];
    if (!lastOrder) return;
    container.innerHTML = `
        <h3 class="summary-title">Order Summary</h3>
        ${lastOrder.items.map(item => `
            <div class="summary-item">
                <div class="summary-item-info">
                    <img src="${item.image}" class="summary-item-img">
                    <span>${item.name} × ${item.qty}</span>
                </div>
                <span>₦${(item.price * item.qty).toLocaleString()}</span>
            </div>
        `).join('')}
        <div class="summary-total">
            <span>Total</span>
            <span>₦${lastOrder.total.toLocaleString()}</span>
        </div>
    `;
}

// ===== UPDATE CART DISPLAY =====
function updateCart() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    document.getElementById('cartCount').textContent = count;
    document.getElementById('cartTotal').textContent = total.toLocaleString();
    document.getElementById('cartSummary').style.display = count > 0 ? 'block' : 'none';

    // Save cart to localStorage to persist on refresh
    localStorage.setItem("savedCart", JSON.stringify(cart));
}

// ===== ORDER TYPE =====
function proceedToOrderType() {
    if (cart.length === 0) return;
    document.getElementById('menu').classList.remove('active');
    animateScreen(document.getElementById('orderType'));
}

function selectOrderType(type) {
    document.getElementById('orderType').classList.remove('active');
    if (type === 'eathere') {
        animateScreen(document.getElementById('eatHereForm'));
        renderOrderSummary('eatHereSummary');
    } else {
        animateScreen(document.getElementById('deliveryForm'));
        renderOrderSummary('deliverySummary');
    }
    scrollToTopSafe();
}

// ===== SUBMIT ORDER =====
function submitOrder(event, type) {
    event.preventDefault();

    if (!cart || cart.length === 0) {
        alert("Your cart is empty. Please add items before placing an order.");
        return;
    }

    const customer = type === 'eathere'
        ? { 
            name: document.getElementById('nameEatHere').value, 
            phone: document.getElementById('phoneEatHere').value, 
            table: document.getElementById('tableNumber').value 
        }
        : { 
            name: document.getElementById('nameDelivery').value, 
            phone: document.getElementById('phoneDelivery').value, 
            address: document.getElementById('address').value, 
            city: document.getElementById('city').value, 
            notes: document.getElementById('notes') ? document.getElementById('notes').value : 'None' 
        };

    if (!customer.name || !customer.phone || (type === 'eathere' && !customer.table) || (type === 'delivery' && (!customer.address || !customer.city))) {
        alert("Please fill all required fields!");
        return;
    }

    const orderId = 'YN' + Date.now().toString().slice(-6);
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const now = new Date();

    const orderData = {
        orderId,
        type,
        customer,
        items: cart,
        total,
        createdAt: now.getTime(),
        createdAtText: now.toLocaleString('en-NG', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    };

    allOrders[orderId] = orderData;
    localStorage.setItem('allOrders', JSON.stringify(allOrders));

    document.getElementById('eatHereForm').classList.remove('active');
    document.getElementById('deliveryForm').classList.remove('active');
    animateScreen(document.getElementById('confirmation'));
    document.getElementById('confirmOrderId').textContent = orderId;

    if (document.getElementById('confirmOrderDate')) {
        document.getElementById('confirmOrderDate').textContent = `Date & Time: ${orderData.createdAtText}`;
    }

    orderLocked = true;
    renderConfirmedSummary();

    // WhatsApp message
    const orderListText = cart.map(i => `• ${i.name} - ₦${i.price.toLocaleString()} x${i.qty}`).join('\n');
    const myWhatsAppNumber = "2349162809649";

    let message = `
Hello Yogurt & Nut,

Order ID: ${orderId}
Date & Time: ${orderData.createdAtText}
Order Type: ${type === 'eathere' ? 'Eat Here' : 'Delivery'}

Customer:
${type === 'eathere' 
    ? `Name: ${customer.name}\nPhone: ${customer.phone}\nTable: ${customer.table}` 
    : `Name: ${customer.name}\nPhone: ${customer.phone}\nAddress: ${customer.address}\nCity: ${customer.city}\nNotes: ${customer.notes}`
}

Order Details:
${orderListText}

Total: ₦${total.toLocaleString()}
    `;

    const whatsappBtn = document.getElementById('whatsappBtn');
    whatsappBtn.href = `https://wa.me/${myWhatsAppNumber}?text=${encodeURIComponent(message.trim())}`;
    whatsappBtn.target = "_blank";

    // ✅ Clear cart once at the end
    cart = [];
    updateCart();
    localStorage.removeItem("savedCart"); // remove saved cart after successful order
}


// ===== LOOKUP =====
let lookupRunning = false;
function lookupOrder() {
    if (lookupRunning) return;
    lookupRunning = true;
    const id = document.getElementById("lookupId").value.trim();
    const pin = document.getElementById("adminPin").value.trim();
    const output = document.getElementById("lookupResults");

    if (!id || !pin) {
        output.innerHTML = "<p>Please enter Order ID and Admin PIN.</p>";
        lookupRunning = false;
        return;
    }

    if (pin !== "7247") {
        output.innerHTML = "<p>❌ Invalid Admin PIN.</p>";
        lookupRunning = false;
        return;
    }

    requestAnimationFrame(() => {
        const order = allOrders[id];
        if (!order) {
            output.innerHTML = "<p>❌ Order not found.</p>";
        } else {
            output.innerHTML = `
                <h3>Order ID: ${order.orderId}</h3>
                <p><strong>Date & Time:</strong> ${order.createdAtText}</p>
                <p><strong>Type:</strong> ${order.type === "eathere" ? "Eat Here" : "Delivery"}</p>
                <p><strong>Name:</strong> ${order.customer.name}</p>
                <p><strong>Phone:</strong> ${order.customer.phone}</p>
                ${order.type === "delivery" ? `
                    <p><strong>Address:</strong> ${order.customer.address}</p>
                    <p><strong>City:</strong> ${order.customer.city}</p>` : `<p><strong>Table:</strong> ${order.customer.table}</p>`}
                <hr>
                <ul>
                    ${order.items.map(i => `<li>${i.name} — ₦${i.price.toLocaleString()} x${i.qty}</li>`).join("")}
                </ul>
                <p><strong>Total:</strong> ₦${order.total.toLocaleString()}</p>
            `;
        }
        lookupRunning = false;
    });
}

// ===== COPY ACCOUNT =====
function copyAccountNumber(accountId) {
    const acc = document.getElementById(accountId).textContent;
    navigator.clipboard.writeText(acc).then(() => {
        alert("Account number copied: " + acc);
    }).catch(err => {
        console.error("Failed to copy account number:", err);
    });
}

// ===== RESET APP =====
function resetApp() {
    orderLocked = false;
    cart = [];
    updateCart();
    document.getElementById('confirmation').classList.remove('active');
    document.getElementById('hero').style.display = 'flex';
    localStorage.removeItem("currentSection"); // reset section
    document.getElementById('nameEatHere').value = '';
    document.getElementById('phoneEatHere').value = '';
    document.getElementById('tableNumber').value = '';
    document.getElementById('nameDelivery').value = '';
    document.getElementById('phoneDelivery').value = '';
    document.getElementById('address').value = '';
    document.getElementById('city').value = '';
    if(document.getElementById('notes')) document.getElementById('notes').value = '';
}

// ===== THEME =====
function toggleTheme() { document.body.classList.toggle('light-mode'); }

/* ===== MENU POPUP CONTROL ===== */
function showMenuPopup() {
    const popup = document.getElementById("menuPopup");
    if (!popup) return;
    popup.style.display = "flex";
    requestAnimationFrame(() => { popup.classList.add("active"); });
}
function closeMenuPopup() {
    const popup = document.getElementById("menuPopup");
    if (!popup) return;
    popup.classList.remove("active");
    setTimeout(() => { popup.style.display = "none"; }, 300);
}

// ===== OPEN STATUS =====
function updateOpenStatus() {
  const statusText = document.querySelector(".status-text");
  const statusDot = document.querySelector(".status-dot");
  const hourItems = document.querySelectorAll(".hours-list li");
  if (!statusText || !statusDot) return;

  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  let isOpen = false, closeHour = null, closeTimeText = "";

  hourItems.forEach(li => li.classList.remove("today"));
  if (hourItems[day === 0 ? 2 : day <= 4 ? 0 : 1]) {
    hourItems[day === 0 ? 2 : day <= 4 ? 0 : 1].classList.add("today");
  }

  if (day >= 1 && day <= 4) { isOpen = hour >= 9 && hour < 21; closeHour = 21; closeTimeText = "9:00 PM"; }
  else if (day === 5 || day === 6) { isOpen = hour >= 9 && hour < 22; closeHour = 22; closeTimeText = "10:00 PM"; }
  else if (day === 0) { isOpen = hour >= 12 && hour < 20; closeHour = 20; closeTimeText = "8:00 PM"; }

  const timeLeft = closeHour !== null ? closeHour - hour : 0;
  if (isOpen) {
    if (timeLeft <= 1) { statusText.textContent = "Closing Soon"; statusDot.style.background = "#f1c40f"; statusDot.style.boxShadow = "0 0 10px rgba(241, 196, 15, 0.9)"; }
    else { statusText.textContent = `Open Now — Closes at ${closeTimeText}`; statusDot.style.background = "#2ecc71"; statusDot.style.boxShadow = "0 0 10px rgba(46, 204, 113, 0.8)"; }
  } else { statusText.textContent = "Closed Now"; statusDot.style.background = "#e74c3c"; statusDot.style.boxShadow = "0 0 10px rgba(231, 76, 60, 0.7)"; }
}
updateOpenStatus();
setInterval(updateOpenStatus, 60000);

function animateScreen(el) {
    if (!el) return;

    el.classList.remove("active");
    void el.offsetWidth; // force reflow
    requestAnimationFrame(() => {
        el.classList.add("active");

        // Save current section ID in localStorage
        localStorage.setItem("currentSection", el.id);
    });
}

// LAYOUT IMAGE

const viewer = document.getElementById("templateViewer");
const viewerImg = document.getElementById("viewerImage");
const backBtn = document.getElementById("viewerBack");

document.querySelectorAll(".menu-template").forEach(img => {
  img.addEventListener("click", () => {
    viewerImg.src = img.src;
    viewer.classList.add("active");
    document.body.style.overflow = "hidden"; // stop background scroll
  });
});

backBtn.addEventListener("click", closeViewer);

// Tap black background to close
viewer.addEventListener("click", e => {
  if (e.target === viewer) closeViewer();
});

function closeViewer() {
  viewer.classList.remove("active");

  // wait for animation before clearing
  setTimeout(() => {
    viewerImg.src = "";
    document.body.style.overflow = "";
  }, 350);
}



