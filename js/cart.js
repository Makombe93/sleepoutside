import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;


document.addEventListener('DOMContentLoaded', () => {
    const cartFooter = document.querySelector('.cart-footer');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    if (cartItems.length > 0) {
        cartFooter.classList.remove('hide');
        const total = calculateCartTotal(cartItems);
        cartTotalAmount.textContent = total.toFixed(2);
    }
});

function calculateCartTotal(cartItems) {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}


  return newItem;
}

renderCartContents();