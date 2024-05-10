import { numberOfItemsIcon, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();


const shoppingCart = new ShoppingCart(".product-list");
shoppingCart.renderCart();
