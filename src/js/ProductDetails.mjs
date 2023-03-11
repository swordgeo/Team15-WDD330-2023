// import { updateCartCount } from "./cart-count.js";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function productDetailsTemplate(obj) {
  return `<section class="product-detail"> <h3>${obj.Brand.Name}</h3>
    <h2 class="divider">${obj.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${obj.Images.PrimaryLarge}"
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
    document
      .getElementById("addToCart")
      .addEventListener("click", () => this.addProductToCart(this.product));

  }

  addProductToCart(product) {
    //first I need to grab the cart as it is
    let cartContents = getLocalStorage("so-cart");
    //If the cart is empty then .push errors because cartContents isn't an array
    //Therefore we're gonna create an empty array before moving on
    if (!Array.isArray(cartContents)) {
      cartContents = [];
    }
    //This is where we check to see if the cart already has the item in question and revises the quantity rather than adding a dupe item at quantity 1
    let existingProductIndex = cartContents.findIndex(p => p.Id === product.Id);
    if (existingProductIndex !== -1) {
      cartContents[existingProductIndex].quantity++;
    } else {
      product.quantity = 1;
      cartContents.push(product);
    }
    setLocalStorage("so-cart", cartContents);
    // updateCartCount();
  }


  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }
}

  
  

