import ProductData from './productData.mjs';
import ProductListing from './productList.mjs';

const dataSource = new ProductData('tents.json');
const productListElement = document.querySelector('.product-list');
const productListing = new ProductListing('tents', dataSource, productListElement);

productListing.init();
