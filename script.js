/* =============================================
   Campus SnackPass — Main Script
   Handles menu display, filtering, ordering,
   and order confirmation.
   ============================================= */

// =============================================
// Menu Data — array of food item objects
// =============================================
const menu = [
    // Snacks
    { id: 1,  name: "Veg Burger",      category: "Snacks", price: 60,  emoji: "🍔" },
    { id: 2,  name: "Samosa (2 pcs)",   category: "Snacks", price: 30,  emoji: "🥟" },
    { id: 3,  name: "French Fries",     category: "Snacks", price: 50,  emoji: "🍟" },
    { id: 4,  name: "Paneer Wrap",      category: "Snacks", price: 80,  emoji: "🌯" },

    // Meals
    { id: 5,  name: "Chicken Biryani",  category: "Meals",  price: 120, emoji: "🍗" },
    { id: 6,  name: "Veg Thali",        category: "Meals",  price: 100, emoji: "🍱" },
    { id: 7,  name: "Egg Fried Rice",   category: "Meals",  price: 90,  emoji: "🍳" },
    { id: 8,  name: "Pasta Alfredo",    category: "Meals",  price: 110, emoji: "🍝" },

    // Drinks
    { id: 9,  name: "Fresh Lime Soda",  category: "Drinks", price: 35,  emoji: "🍋" },
    { id: 10, name: "Cold Coffee",      category: "Drinks", price: 55,  emoji: "☕" },
    { id: 11, name: "Mango Lassi",      category: "Drinks", price: 45,  emoji: "🥭" },
    { id: 12, name: "Masala Chai",      category: "Drinks", price: 15,  emoji: "🫖" },
];

// =============================================
// Order State — stores selected items
// Each entry: { id, name, price, quantity }
// =============================================
let order = [];

// Currently active category filter
let activeCategory = "All";

// =============================================
// DOM Element References
// =============================================
const foodGrid       = document.getElementById("foodGrid");
const orderItems     = document.getElementById("orderItems");
const orderFooter    = document.getElementById("orderFooter");
const categoryFilters = document.getElementById("categoryFilters");
const modalOverlay   = document.getElementById("modalOverlay");
const modalContent   = document.getElementById("modalContent");
const cartToggle     = document.getElementById("cartToggle");
const cartCount      = document.getElementById("cartCount");
const orderSummary   = document.getElementById("orderSummary");


// =============================================
// displayMenu(items)
// Renders food cards into the grid.
// =============================================
function displayMenu(items) {
    foodGrid.innerHTML = "";

    items.forEach(function (item) {
        // Create a card for each food item
        const card = document.createElement("div");
        card.className = "food-card";
        card.innerHTML =
            '<div class="food-card-img">' + item.emoji + '</div>' +
            '<div class="food-card-body">' +
                '<div class="food-card-name">' + item.name + '</div>' +
                '<div class="food-card-category">' + item.category + '</div>' +
                '<div class="food-card-footer">' +
                    '<span class="food-card-price">₹' + item.price + '</span>' +
                    '<button class="add-btn" id="add-btn-' + item.id + '" onclick="addToOrder(' + item.id + ')">Add</button>' +
                '</div>' +
            '</div>';
        foodGrid.appendChild(card);
    });
}


// =============================================
// filterMenu(category)
// Filters the displayed items by category.
// =============================================
function filterMenu(category) {
    activeCategory = category;

    // Update which button looks "active"
    var buttons = categoryFilters.querySelectorAll(".category-btn");
    buttons.forEach(function (btn) {
        if (btn.dataset.category === category) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // Filter the menu array and re-display
    if (category === "All") {
        displayMenu(menu);
    } else {
        var filtered = menu.filter(function (item) {
            return item.category === category;
        });
        displayMenu(filtered);
    }
}


// =============================================
// addToOrder(itemId)
// Adds an item to the order, or increases its
// quantity if it's already there.
// =============================================
function addToOrder(itemId) {
    // Find the item in the menu
    var menuItem = menu.find(function (item) {
        return item.id === itemId;
    });

    if (!menuItem) return;

    // Check if already in the order
    var existing = order.find(function (orderItem) {
        return orderItem.id === itemId;
    });

    if (existing) {
        // Increase quantity
        existing.quantity += 1;
    } else {
        // Add new item to order
        order.push({
            id: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1
        });
    }

    updateOrderSummary();
}


// =============================================
// removeFromOrder(itemId)
// Decreases quantity by 1. If quantity reaches
// 0, the item is removed from the order.
// =============================================
function removeFromOrder(itemId) {
    var index = order.findIndex(function (item) {
        return item.id === itemId;
    });

    if (index === -1) return;

    if (order[index].quantity > 1) {
        order[index].quantity -= 1;
    } else {
        // Remove the item entirely
        order.splice(index, 1);
    }

    updateOrderSummary();
}


// =============================================
// calculateTotal()
// Returns the total price of all order items.
// =============================================
function calculateTotal() {
    var total = 0;
    for (var i = 0; i < order.length; i++) {
        total += order[i].price * order[i].quantity;
    }
    return total;
}


// =============================================
// updateOrderSummary()
// Re-renders the order sidebar with current
// items, quantities, and total.
// =============================================
function updateOrderSummary() {
    // Update the cart badge count (total items)
    var totalItems = 0;
    for (var i = 0; i < order.length; i++) {
        totalItems += order[i].quantity;
    }
    cartCount.textContent = totalItems;

    // If the order is empty, show empty state
    if (order.length === 0) {
        orderItems.innerHTML =
            '<div class="order-empty">' +
                '<div class="order-empty-icon">🛒</div>' +
                '<p>Your order is empty.<br>Add something from the menu!</p>' +
            '</div>';
        orderFooter.innerHTML = "";
        return;
    }

    // Build HTML for each order item
    var itemsHTML = "";
    for (var i = 0; i < order.length; i++) {
        var item = order[i];
        itemsHTML +=
            '<div class="order-item">' +
                '<div class="order-item-info">' +
                    '<div class="order-item-name">' + item.name + '</div>' +
                    '<div class="order-item-price">₹' + item.price + ' × ' + item.quantity + ' = ₹' + (item.price * item.quantity) + '</div>' +
                '</div>' +
                '<div class="order-item-controls">' +
                    '<button class="qty-btn remove" onclick="removeFromOrder(' + item.id + ')" aria-label="Decrease quantity">−</button>' +
                    '<span class="qty-value">' + item.quantity + '</span>' +
                    '<button class="qty-btn" onclick="addToOrder(' + item.id + ')" aria-label="Increase quantity">+</button>' +
                '</div>' +
            '</div>';
    }
    orderItems.innerHTML = itemsHTML;

    // Build the footer with total and confirm button
    var total = calculateTotal();
    orderFooter.innerHTML =
        '<div class="order-total">' +
            '<span class="order-total-label">Total</span>' +
            '<span class="order-total-amount">₹' + total + '</span>' +
        '</div>' +
        '<button class="confirm-btn" id="confirmBtn" onclick="confirmOrder()">Confirm Order</button>';
}


// =============================================
// generateToken()
// Creates a simple random order token like
// "SP-4827" for the confirmation.
// =============================================
function generateToken() {
    var number = Math.floor(1000 + Math.random() * 9000);
    return "SP-" + number;
}


// =============================================
// confirmOrder()
// Shows the confirmation modal with a token.
// =============================================
function confirmOrder() {
    if (order.length === 0) return;

    var token = generateToken();

    modalContent.innerHTML =
        '<div class="modal-check">✓</div>' +
        '<h2 class="modal-title">Order Confirmed!</h2>' +
        '<p class="modal-subtitle">Your order has been placed successfully.</p>' +
        '<div class="modal-token">' +
            '<div class="modal-token-label">Your order token</div>' +
            '<div class="modal-token-code">' + token + '</div>' +
        '</div>' +
        '<p class="modal-instruction">Please show this token at the canteen counter<br>to collect your order.</p>' +
        '<button class="new-order-btn" onclick="startNewOrder()">Start New Order</button>';

    modalOverlay.classList.add("active");
}


// =============================================
// startNewOrder()
// Resets the order and closes the modal.
// =============================================
function startNewOrder() {
    order = [];
    modalOverlay.classList.remove("active");
    filterMenu("All");
    updateOrderSummary();
}


// =============================================
// Event Listeners
// =============================================

// Category filter — listen on the container (event delegation)
categoryFilters.addEventListener("click", function (e) {
    if (e.target.classList.contains("category-btn")) {
        filterMenu(e.target.dataset.category);
    }
});

// Mobile cart toggle — show/hide order summary
cartToggle.addEventListener("click", function () {
    orderSummary.classList.toggle("show");
});

// Close modal by clicking the dark overlay
modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove("active");
    }
});


// =============================================
// Initialize the App
// =============================================
displayMenu(menu);
updateOrderSummary();
