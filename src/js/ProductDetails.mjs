
import { setLocalStorage } from "./utils.mjs";

function productDetailsTemplate(obj) {
  return `<section class="product-detail"> <h3>${obj.Brand.Name}</h3>
    <h2 class="divider">${obj.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${obj.Image}"
      alt="${obj.NameWithoutBrand}"
    />
    <p class="product-card__price">$${obj.FinalPrice}</p>
    <p class="product__color">${obj.Colors[0]["ColorName"]}</p>
    <p class="product__description">
    ${obj.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${obj.Id}">Add to Cart</button>
    </div></section>`;
}

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
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    setLocalStorage("so-cart", this.product);
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }
}

  
  

