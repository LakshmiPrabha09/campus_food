# 🍔 Campus SnackPass

A clean, modern, lightweight web application designed for college canteen food ordering. Built specifically as a **2nd-year college project** to demonstrate core frontend fundamentals without over-engineering or external framework dependencies.

---

## 📌 Features

- **🍔 Browse Food Menu:** Displays food items as visually clean cards with categories, pricing, and interactive buttons.
- **🏷️ Instant Category Filtering:** Easily filter menu items by **All**, **Snacks**, **Meals**, and **Drinks**.
- **🛒 Real-time Order Management:** Add items to cart, increment/decrement quantities, or remove items with immediate updates.
- **💰 Live Bill Summary:** Displays itemized cost and updates the total price dynamically.
- **🎫 Order Token Generator:** Generates a unique, randomized token (e.g., `SP-4827`) upon order confirmation to be presented at the canteen counter.
- **📱 Responsive Layout:** Clean side-by-side desktop layout that automatically adapts for mobile screens.

---

## 🛠️ Technology Stack

- **HTML5:** Semantic structure and accessible markup.
- **CSS3:** Custom styling using CSS variables, Flexbox, CSS Grid, and responsive media queries.
- **Vanilla JavaScript (ES6):** Clean array operations, DOM manipulation, state management, and event handling.

> *No frameworks, external libraries, databases, or build steps required!*

---

## 📁 Project Structure

```text
Campus-SnackPass/
│
├── index.html     # Main HTML document & app layout
├── style.css      # Custom styling, design tokens & layout rules
├── script.js     # Core JavaScript logic & state handling
└── README.md      # Project documentation
```

---

## 🚀 How to Run the Application

You can launch the application using any of the methods below:

### Option 1: Using `npx` (Node.js) — *Recommended*
Run the following command in your project terminal:
```bash
npx serve
```
Then open the provided URL (e.g., `http://localhost:3000`) in your browser.

### Option 2: Using Python HTTP Server
```bash
python -m http.server 8080
```
Then visit [`http://localhost:8080`](http://localhost:8080) in your browser.

### Option 3: Direct File Opening
Double-click `index.html` or run:
```powershell
Start-Process index.html
```

---

## 🧠 JavaScript Architecture Overview

The application follows a simple, unidirectional data flow:

```text
menu (Array of Objects)
       ↓
displayMenu() / filterMenu()
       ↓
addToOrder() / removeFromOrder()
       ↓
updateOrderSummary() & calculateTotal()
       ↓
confirmOrder() ──> generateToken()
```

### Key Functions Explained

- `displayMenu(items)`: Iterates through the menu data array and populates the grid with food cards.
- `filterMenu(category)`: Filters the menu array based on the selected category button.
- `addToOrder(itemId)`: Adds an item to the order array or increments its quantity if already present.
- `removeFromOrder(itemId)`: Decrements item quantity or removes it completely when quantity hits 0.
- `updateOrderSummary()`: Updates cart counts, itemized list, sub-totals, and total cost in real time.
- `calculateTotal()`: Computes total price using array iterations.
- `confirmOrder()`: Displays the confirmation modal with a unique generated order token.
- `generateToken()`: Creates a randomized alphanumeric order token (e.g., `SP-4827`).

---

## 🎨 UI/UX Design Principles

- **Color Palette:** Warm, canteen-inspired accent color (`#D35400`) paired with clean light neutrals (`#F7F7F5`).
- **Typography:** Uses Google Font **Inter** for clean readability and hierarchy.
- **No Over-Engineering:** Avoids heavy AI gradients, neon glows, or bloated libraries to maintain a authentic, practical student-built aesthetic.

---

## 📄 License

This project is open-source and available for learning and educational purposes.
