import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const ulElement = document.querySelector(".product-list");
const productsList = new ProductListing("Tents", dataSource, ulElement);

productsList.init();
