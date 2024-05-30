// ProductList.mjs

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.products = [];
    }

    async init() {
        this.products = await this.dataSource.getData(this.category);
        this.renderList();
    }

    renderList() {
        const productCardTemplate = (product) => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
            </div>
        `;

        const htmlStrings = this.products.map(productCardTemplate);
        this.listElement.innerHTML = htmlStrings.join('');
    }
}
