import { getLocalStorage } from "./utils.mjs";

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

  return newItem;
}

export default class ShoppingCart {
  constructor(htmlElement) {
    this.htmlElement = htmlElement;
  }

  renderCart() {
    const cartItems = getLocalStorage("so-cart");

    if (cartItems == null) {
      const p = document.createElement("p");
      p.textContent = "No items yet";
      document.querySelector(".product-list").appendChild(p);
    } else {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector(this.htmlElement).innerHTML = htmlItems.join("");

      const cartTotal = document.querySelector(".cart-total");
      let totalPrice = 0;
      cartItems.forEach((item) => {
        totalPrice += item.FinalPrice
      });
      cartTotal.textContent = `Total: $${totalPrice}`;
      document.querySelector(".cart-footer-hide").style.display = "block";

    }
  }
}