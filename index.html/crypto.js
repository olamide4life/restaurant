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
    },
    sawllow: {
        name: "SAWLLOW",
        items: [
            {id: 'Amala Dudu', name: "Amala Dudu", description: "", image: "amala dudu.jpeg", price: 500, isSwallow: true},
            {id: 'Semovita', name: "Semovita", description: "", image: "semo.jpeg", price: 700, isSwallow: true},
            {id: 'Poundo Yam', name: "Poundo Yam", description: "", image: "yam.jpeg", price: 1000, isSwallow: true},
            {id: 'Eba Yellow', name: "Eba Yellow", description: "", image: "eba yellow.jpeg", price: 700, isSwallow: true},
            {id: '-Jollof rice', name: "Jollof rice", description: "", image: "jollof rice.jpeg", price: 700, isSwallow: true},
            {id: 'Ofada', name: "Ofada", description: "", image: "ofada.jpeg", price: 700, isSwallow: true},
        ]   
    },
    soup: {
        name: "SOUP",
        items: [
            {id: 'Eforiro', name: "Eforiro", description: "Free with Swallow", image: "eforiro.jpeg", price: 0, isSoup: true},
            {id: 'Egusi', name: "Egusi", description: "Free with Swallow", image: "egusi.jpeg", price: 0, isSoup: true},
            {id: 'Ogbono ', name: "Ogbono", description: "Free with Swallow", image: "ogbono.jpeg", price: 0, isSoup: true},
            {id: 'Oha Soup', name: "Oha Soup", description: "Free with Swallow", image: "oha.jpeg", price: 0, isSoup: true},
            {id: 'Ewedu', name: "Ewedu", description: "Free with Swallow", image: "ewedu.jpeg", price: 0, isSoup: true},
        ]
    }, 
     protein: {
        name: "PROTEIN",
        items: [
            {id: 'Turkey', name: "Turkey", description: "", image: "chicken.jpeg", price: 1500},
            {id: 'Titus Fish', name: "Titus Fish", description: "", image: "titus.jpeg", price: 1200},
            {id: 'Chicken', name: "Chicken", description: "", image: "turkey.jpeg", price: 1000},
            {id: 'Beef Meat', name: "Beef Meat", description: "", image: "beef meat.jpeg", price: 500},
            {id: 'Goat Meat', name: "Goat Meat", description: "", image: "beef meat.jpeg", price: 600},
            {id: 'Ponmo', name: "Ponmo", description: "", image: "ponmo.jpeg", price: 400},
            {id: 'Panla Fish', name: "Panla fish", description: "", image: "panla.jpeg", price: 800},
            {id: 'Plantain', name: "Plantain", description: "", image: "plantain.jpeg", price: 300},
        ]
    }, 
};

let orderLocked = false;
let cart = [];

// Restore cart from previous session if available
const savedCart = localStorage.getItem("savedCart");
if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
}

// ===== HERO BACKGROUND SLIDESHOW =====
let currentSlide = 0;
const slides = document.querySelectorAll('.bg-slide');
const totalSlides = slides.length;

function rotateSlides() {
    if (totalSlides === 0) return;
    
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % totalSlides;
    slides[currentSlide].classList.add('active');
}

// Start slideshow if slides exist
if (totalSlides > 1) {
    setInterval(rotateSlides, 4000);
}

// ===== LIQUID BUTTON EFFECTS =====
const liquidBtn = document.querySelector('.liquid-btn');
if (liquidBtn) {
    liquidBtn.addEventListener('click', function(e) {
        // Add filling class
        this.classList.add('filling');
        
        // Create star particles
        const rect = this.getBoundingClientRect();
        const bubbleLayer = this.querySelector('.bubble-layer');
        
        if (bubbleLayer) {
            for (let i = 0; i < 8; i++) {
                createStar(bubbleLayer, rect);
            }
            for (let i = 0; i < 12; i++) {
                createSparkle(bubbleLayer, rect);
            }
            for (let i = 0; i < 6; i++) {
                createBubble(bubbleLayer, rect);
            }
        }
        
        // Trigger drain after fill
        setTimeout(() => {
            this.classList.remove('filling');
            this.classList.add('draining');
            
            setTimeout(() => {
                this.classList.remove('draining');
            }, 750);
        }, 600);
    });
}

function createStar(container, rect) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = 12 + Math.random() * 8;
    star.style.setProperty('--s', size + 'px');
    star.style.setProperty('--x', (Math.random() - 0.5) * 80 + 'px');
    star.style.setProperty('--y', -(30 + Math.random() * 40) + 'px');
    star.style.left = (rect.width / 2) + 'px';
    star.style.top = (rect.height / 2) + 'px';
    container.appendChild(star);
    setTimeout(() => star.remove(), 900);
}

function createSparkle(container, rect) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.setProperty('--x', (Math.random() - 0.5) * 100 + 'px');
    sparkle.style.setProperty('--y', -(20 + Math.random() * 50) + 'px');
    sparkle.style.left = (rect.width / 2) + 'px';
    sparkle.style.top = (rect.height / 2) + 'px';
    container.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
}

function createBubble(container, rect) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.left = (Math.random() * rect.width) + 'px';
    bubble.style.bottom = '0px';
    container.appendChild(bubble);
    setTimeout(() => bubble.remove(), 1200);
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
    document.getElementById('gallerySection').style.display = 'block';

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
                            <div class="size-option" onclick="addToCart('${item.id}','${item.name}',${item.sizes.medium},'Medium','${item.image}',${item.isSoup || false},${item.isSwallow || false})">
                                <span class="size-label">Medium</span>
                                <span class="size-price">₦${item.sizes.medium.toLocaleString()}</span>
                            </div>
                            <div class="size-option" onclick="addToCart('${item.id}','${item.name}',${item.sizes.large},'Large','${item.image}',${item.isSoup || false},${item.isSwallow || false})">
                                <span class="size-label">Large</span>
                                <span class="size-price">₦${item.sizes.large.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        // For soup items, show "FREE" instead of price
        const priceDisplay = item.isSoup ? 'FREE' : `₦${item.price.toLocaleString()}`;
        return `
            <div class="menu-item">
                <div class="item-content">
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                    <div class="item-details">
                        <h3 class="item-name">${item.name}</h3>
                        <p class="item-description">${item.description}</p>
                        <div class="single-price-item">
                            <span class="item-price">${priceDisplay}</span>
                            <button class="add-btn" onclick="addToCart('${item.id}','${item.name}',${item.price},null,'${item.image}',${item.isSoup || false},${item.isSwallow || false})">Add to Cart</button>
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
function addToCart(id, name, price, size, image, isSoup, isSwallow) {
    if (orderLocked) return;
    
    const itemName = size ? `${name} (${size})` : name;
    const existingIndex = cart.findIndex(i => i.name === itemName);
    
    // RULE: Swallow is NEVER blocked - always add it
    if (!isSoup) {
        if (existingIndex !== -1) {
            cart[existingIndex].qty += 1;
        } else {
            cart.push({ id, name: itemName, price, image, qty: 1, isSoup, isSwallow });
        }
        updateCart();
        return;
    }
    
    // SOUP LOGIC: Check current swallow count BEFORE adding soup
    const currentSwallowCount = cart.reduce((total, item) => {
        return item.isSwallow ? total + item.qty : total;
    }, 0);
    
    // Must have at least 1 swallow to add soup
    if (currentSwallowCount === 0) {
        showAlert("Please add a Swallow item first before selecting soup!", "warning");
        return;
    }
    
    // Count how many soups we'll have AFTER adding this one
    const currentSoupCount = cart.reduce((total, item) => {
        return item.isSoup ? total + item.qty : total;
    }, 0);
    
    const futureSoupCount = currentSoupCount + 1;
    
    // Check: future soup count cannot exceed current swallow count
    if (futureSoupCount > currentSwallowCount) {
        showAlert(`You can only have ${currentSwallowCount} soup${currentSwallowCount > 1 ? 's' : ''} for your ${currentSwallowCount} swallow item${currentSwallowCount > 1 ? 's' : ''}. Add more swallow to add more soup!`, "warning");
        return;
    }
    
    // All checks passed - add the soup
    if (existingIndex !== -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({ id, name: itemName, price, image, qty: 1, isSoup, isSwallow });
    }
    
    updateCart();
}

// ===== CART QUANTITY & REMOVE =====
function changeQty(index, delta) {
    if (orderLocked) return;
    
    const item = cart[index];
    const newQty = item.qty + delta;
    
    // If decreasing swallow, check if it will cause soup imbalance
    if (item.isSwallow && delta < 0) {
        const futureSwallowCount = cart.reduce((total, cartItem, i) => {
            if (!cartItem.isSwallow) return total;
            if (i === index) return total + newQty; // Use future qty for this item
            return total + cartItem.qty;
        }, 0);
        
        const currentSoupCount = cart.reduce((total, cartItem) => {
            return cartItem.isSoup ? total + cartItem.qty : total;
        }, 0);
        
        if (currentSoupCount > futureSwallowCount && futureSwallowCount >= 0) {
            showAlert(`You cannot remove this Swallow! You have ${currentSoupCount} soup${currentSoupCount > 1 ? 's' : ''} but would only have ${futureSwallowCount} Swallow${futureSwallowCount !== 1 ? 's' : ''}. Remove soup first.`, "warning");
            return;
        }
    }
    
    cart[index].qty = newQty;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    updateCart();
    if (document.getElementById('eatHereForm').classList.contains('active')) renderOrderSummary('eatHereSummary');
    if (document.getElementById('deliveryForm').classList.contains('active')) renderOrderSummary('deliverySummary');
}

function removeItem(index) {
    if (orderLocked) return;
    
    const item = cart[index];
    
    // If removing swallow, check if it will cause soup imbalance
    if (item.isSwallow) {
        const futureSwallowCount = cart.reduce((total, cartItem, i) => {
            if (!cartItem.isSwallow) return total;
            if (i === index) return total; // Don't count the item being removed
            return total + cartItem.qty;
        }, 0);
        
        const currentSoupCount = cart.reduce((total, cartItem) => {
            return cartItem.isSoup ? total + cartItem.qty : total;
        }, 0);
        
        if (currentSoupCount > futureSwallowCount) {
            showAlert(`You cannot remove this Swallow! You have ${currentSoupCount} soup${currentSoupCount > 1 ? 's' : ''} but would only have ${futureSwallowCount} Swallow${futureSwallowCount !== 1 ? 's' : ''}. Remove soup first.`, "warning");
            return;
        }
    }
    
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
                <img src="${item.image}" alt="${item.name}" class="summary-item-img">
                <div class="summary-item-info">
                    <div class="summary-item-name">${item.name}</div>
                </div>
                <div style="display:flex; align-items:center; gap:6px;">
                    <button onclick="changeQty(${index}, 1)">+</button>
                    <strong>${item.qty}</strong>
                    <button onclick="changeQty(${index}, -1)">−</button>
                    <button onclick="removeItem(${index})">❌</button>
                </div>
                <span>₦${(item.price * item.qty).toLocaleString()}</span>
            </div>
            ${index < cart.length - 1 ? '<div class="summary-divider"></div>' : ''}
        `).join('')}
        <div class="summary-total">
            <span>Total</span>
            <span>₦${total.toLocaleString()}</span>
        </div>
        <button type="button" class="back-btn" onclick="goBackToMenu()">← Back</button>
    `;
}

// ===== RENDER CONFIRMED ORDER SUMMARY =====
function renderConfirmedSummary() {
    const container = document.getElementById('confirmSummary');
    const lastOrder = Object.values(allOrders).slice(-1)[0];
    if (!lastOrder) return;
    container.innerHTML = `
        <h3 class="summary-title">Order Summary</h3>
        ${lastOrder.items.map((item, index) => `
            <div class="summary-item">
                <img src="${item.image}" class="summary-item-img">
                <div class="summary-item-info">
                    <div class="summary-item-name">${item.name} × ${item.qty}</div>
                </div>
                <span>₦${(item.price * item.qty).toLocaleString()}</span>
            </div>
            ${index < lastOrder.items.length - 1 ? '<div class="summary-divider"></div>' : ''}
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
    
    // Update mobile cart badge
    const mobileBadge = document.getElementById('mobileCartCount');
    if (mobileBadge) {
        mobileBadge.textContent = count;
        
        // Add pulse animation to show item was added
        mobileBadge.style.animation = 'none';
        setTimeout(() => {
            mobileBadge.style.animation = 'cartPulse 0.5s ease';
        }, 10);
    }
    
    // HIDE cart summary popup - keep it hidden always
    document.getElementById('cartSummary').style.display = 'none';

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
        showAlert("Your cart is empty. Please add items before placing an order.", "error");
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
        showAlert("Please fill all required fields!", "error");
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

    cart = [];
    updateCart();
    localStorage.removeItem("savedCart");
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
        showAlert(`Account number copied: ${acc}`, "success");
    }).catch(err => {
        console.error("Failed to copy account number:", err);
        showAlert("Failed to copy account number", "error");
    });
}

// ===== RESET APP =====
function resetApp() {
    orderLocked = false;
    cart = [];
    updateCart();
    document.getElementById('confirmation').classList.remove('active');
    document.getElementById('hero').style.display = 'flex';
    localStorage.removeItem("currentSection");
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
function toggleTheme() { 
    document.body.classList.toggle('light-mode'); 
}

// ===== MENU POPUP CONTROL =====
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

    if (day >= 1 && day <= 4) { 
        isOpen = hour >= 9 && hour < 21; 
        closeHour = 21; 
        closeTimeText = "9:00 PM"; 
    } else if (day === 5 || day === 6) { 
        isOpen = hour >= 9 && hour < 22; 
        closeHour = 22; 
        closeTimeText = "10:00 PM"; 
    } else if (day === 0) { 
        isOpen = hour >= 12 && hour < 20; 
        closeHour = 20; 
        closeTimeText = "8:00 PM"; 
    }

    const timeLeft = closeHour !== null ? closeHour - hour : 0;
    if (isOpen) {
        if (timeLeft <= 1) { 
            statusText.textContent = "Closing Soon"; 
            statusDot.style.background = "#f1c40f"; 
            statusDot.style.boxShadow = "0 0 10px rgba(241, 196, 15, 0.9)"; 
        } else { 
            statusText.textContent = `Open Now — Closes at ${closeTimeText}`; 
            statusDot.style.background = "#2ecc71"; 
            statusDot.style.boxShadow = "0 0 10px rgba(46, 204, 113, 0.8)"; 
        }
    } else { 
        statusText.textContent = "Closed Now"; 
        statusDot.style.background = "#e74c3c"; 
        statusDot.style.boxShadow = "0 0 10px rgba(231, 76, 60, 0.7)"; 
    }
}

updateOpenStatus();
setInterval(updateOpenStatus, 60000);

// ===== ANIMATE SCREEN =====
function animateScreen(el) {
    if (!el) return;

    el.classList.remove("active");
    void el.offsetWidth;
    requestAnimationFrame(() => {
        el.classList.add("active");
        localStorage.setItem("currentSection", el.id);
    });
}

// ===== GALLERY VIEWER =====
const viewer = document.getElementById("templateViewer");
const viewerImg = document.getElementById("viewerImage");
const backBtn = document.getElementById("viewerBack");

if (viewer && viewerImg && backBtn) {
    document.querySelectorAll(".menu-template").forEach(img => {
        img.addEventListener("click", () => {
            viewerImg.src = img.src;
            viewer.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    backBtn.addEventListener("click", closeViewer);

    viewer.addEventListener("click", e => {
        if (e.target === viewer) closeViewer();
    });
}

function closeViewer() {
    if (!viewer) return;
    viewer.classList.remove("active");
    setTimeout(() => {
        if (viewerImg) viewerImg.src = "";
        document.body.style.overflow = "";
    }, 350);
}

// ===== MOBILE NAV BAR =====
let activeNavItem = null;

function goHome(btn) {
    createRipple(btn);
    setActiveNav(btn);
    
    // Hide all sections
    document.getElementById('menu').classList.remove('active');
    document.getElementById('orderType').classList.remove('active');
    document.getElementById('eatHereForm').classList.remove('active');
    document.getElementById('deliveryForm').classList.remove('active');
    document.getElementById('confirmation').classList.remove('active');
    document.getElementById('gallerySection').style.display = 'none';
    document.getElementById('lookupSection').style.display = 'none';
    
    // Show hero
    document.getElementById('hero').style.display = 'flex';
    scrollToTopSafe();
}

function openMenuUnified(btn) {
    createRipple(btn);
    setActiveNav(btn);
    showMenu();
}

function openGallery(btn) {
    createRipple(btn);
    setActiveNav(btn);
    
    // Hide other sections
    document.getElementById('hero').style.display = 'none';
    document.getElementById('menu').classList.remove('active');
    document.getElementById('orderType').classList.remove('active');
    document.getElementById('eatHereForm').classList.remove('active');
    document.getElementById('deliveryForm').classList.remove('active');
    document.getElementById('confirmation').classList.remove('active');
    document.getElementById('lookupSection').style.display = 'none';
    
    // Show gallery
    document.getElementById('gallerySection').style.display = 'block';
    scrollToTopSafe();
}

function openCart(btn) {
    createRipple(btn);
    setActiveNav(btn);
    
    if (cart.length === 0) {
        showAlert("Your cart is empty!", "info");
        return;
    }
    
    // Hide all sections including gallery
    document.getElementById('hero').style.display = 'none';
    document.getElementById('menu').classList.remove('active');
    document.getElementById('gallerySection').style.display = 'none';
    document.getElementById('lookupSection').style.display = 'none';
    document.getElementById('eatHereForm').classList.remove('active');
    document.getElementById('deliveryForm').classList.remove('active');
    document.getElementById('confirmation').classList.remove('active');
    
    // Show order type selection
    animateScreen(document.getElementById('orderType'));
    scrollToTopSafe();
}

function stopTap(e) {
    e.preventDefault();
    e.stopPropagation();
}

function setActiveNav(btn) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    if (btn) {
        btn.classList.add('active');
        activeNavItem = btn;
    }
}

function createRipple(btn) {
    const ripple = btn.querySelector('.ripple');
    if (!ripple) return;
    
    ripple.style.transform = 'scale(0)';
    ripple.style.opacity = '1';
    
    requestAnimationFrame(() => {
        ripple.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
        ripple.style.transform = 'scale(4)';
        ripple.style.opacity = '0';
    });
    
    // Create bubble particles
    createNavBubbles(btn);
}

function createNavBubbles(btn) {
    const bubbleCount = 5;
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'nav-bubble';
        bubble.style.left = (20 + Math.random() * 16) + 'px';
        bubble.style.animationDelay = (i * 0.1) + 's';
        btn.appendChild(bubble);
        
        setTimeout(() => bubble.remove(), 700);
    }
}

// ===== CUSTOM ALERT SYSTEM =====
function showAlert(message, type = 'info') {
    // Remove existing alert if any
    const existingAlert = document.getElementById('customAlert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alertBox = document.createElement('div');
    alertBox.id = 'customAlert';
    alertBox.className = `custom-alert ${type}`;
    
    // Set icon based on type
    let icon = '';
    if (type === 'warning') icon = '⚠️';
    else if (type === 'error') icon = '❌';
    else if (type === 'success') icon = '✅';
    else icon = 'ℹ️';
    
    alertBox.innerHTML = `
        <div class="alert-content">
            <span class="alert-icon">${icon}</span>
            <span class="alert-message">${message}</span>
        </div>
        <button class="alert-close" onclick="closeAlert()">×</button>
    `;
    
    document.body.appendChild(alertBox);
    
    // Trigger animation
    requestAnimationFrame(() => {
        alertBox.classList.add('show');
    });
    
    // Auto remove after 4 seconds (optimized)
    alertBox.dataset.timeout = setTimeout(() => {
        closeAlert();
    }, 4000);
}

function closeAlert() {
    const alertBox = document.getElementById('customAlert');
    if (alertBox) {
        // Clear timeout if manually closed
        if (alertBox.dataset.timeout) {
            clearTimeout(parseInt(alertBox.dataset.timeout));
        }
        
        alertBox.classList.remove('show');
        setTimeout(() => {
            alertBox.remove();
        }, 300);
    }
}

// ===== INITIALIZE ON LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    // Attach order button click handler
    const orderBtn = document.getElementById('orderBtn');
    if (orderBtn) {
        orderBtn.addEventListener('click', function() {
            showMenu();
        });
    }
    
    // Set home as active on load
    const homeBtn = document.querySelector('.nav-item:first-child');
    if (homeBtn) {
        setActiveNav(homeBtn);
    }
});