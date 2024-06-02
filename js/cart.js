import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  updateCartFooter(cartItems);
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.quantity}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

document.addEventListener('DOMContentLoaded', () => {
  renderCartContents();
});

function updateCartFooter(cartItems) {
  const cartFooter = document.querySelector('.cart-footer');
  const cartTotalAmount = document.getElementById('cart-total-amount');

  if (cartItems.length > 0) {
    cartFooter.classList.remove('hide');
    const total = calculateCartTotal(cartItems);
    cartTotalAmount.textContent = total.toFixed(2);
  } else {
    cartFooter.classList.add('hide');
  }
}

function calculateCartTotal(cartItems) {
  return cartItems.reduce((total, item) => total + item.FinalPrice * item.quantity, 0);
}

function addToCart(newItem) {
  let cartItems = getLocalStorage("so-cart") || [];
  const existingItemIndex = cartItems.findIndex(item => item.Name === newItem.Name);

  if (existingItemIndex >= 0) {
    cartItems[existingItemIndex].quantity += 1;
  } else {
    newItem.quantity = 1;
    cartItems.push(newItem);
  }

  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  renderCartContents();
}



renderCartContents();
