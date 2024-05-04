function productCardTemplate(product) {
    return `<li class="product-card">
      <a href="product_pages/index.html?product=">
        <img src="" alt="Image of ">
        <h3 class="card__brand"></h3>
        <h2 class="card__name"></h2>
        <p class="product-card__price">$</p>
      </a>
    </li>`
  }

export default class ProductListing{
    constructor(category, dataSource, listElement){
        // passing in this information will make the class more reusable and flexible
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init(){
        const productList = await this.dataSource.getData();
        this.renderList(productList);
    }
    renderList(productList){
        renderListWithTemplate(productCardTemplate, this.listElement, productList);
    }
}