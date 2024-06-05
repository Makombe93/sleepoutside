// productDetails.mjs
import { numberOfItemsIcon, setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId);
        // once we have the product details we can render out the HTML
        this.renderProductDetails("main");
        
        document.getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart() {
        let productsList = getLocalStorage("so-cart");

        if (!Array.isArray(productsList)) {
            productsList = [];
        }

        const existingProductIndex = productsList.findIndex(item => item.Id === this.product.Id);
        
        if (existingProductIndex === -1) {
            this.product.quantity = 1;
            this.product.totalPrice = this.product.FinalPrice * this.product.quantity;
            productsList.push(this.product);
        } else {
            productsList[existingProductIndex].quantity += 1;
            this.product.totalPrice = this.product.FinalPrice * this.product.quantity;
        }

        setLocalStorage("so-cart", productsList);
        numberOfItemsIcon();
    }

    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.insertAdjacentHTML("afterBegin", productDetailsTemplate(this.product));
    }

    calculateDiscountPercentage(originalPrice, finalPrice) {
        if (originalPrice <= finalPrice) {
            return 0;
        }
        return ((originalPrice - finalPrice) / originalPrice) * 100;
    }
}

function productDetailsTemplate(product) {
    const discountPercentage = product.OriginalPrice 
        ? new ProductDetails().calculateDiscountPercentage(product.OriginalPrice, product.FinalPrice)
        : 0;

    return `<section class="product-detail"> 
      <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      <img class="divider" src="${product.Images.PrimaryLarge}" alt="${product.NameWithoutBrand}" />
      <p class="product-card__price">
        $${product.FinalPrice}
        ${discountPercentage > 0 ? `<span class="discount">(${discountPercentage.toFixed(2)}% off)</span>` : ''}
      </p>
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">${product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
    </section>`;
}
