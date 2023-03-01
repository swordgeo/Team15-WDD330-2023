
import { setLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
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
  
  
 /* 
  
  function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Bad Response");
    }
  }

  export function getParam(param){

  }
  
  export default class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
      }
      init(){
        this.product = this.dataSource.findProductById(this.productId);
      }
      addProductToCart(product) {
        setLocalStorage("so-cart", product);
      }
      renderProductDetails(
      ){
        productName = this.product["Name"];
        return productName;
        console.log(productName);
        /*
        details = "
        "NameWithoutBrand": "Ajax Tent - 2-Person, 3-Season",
    "Name": "Marmot Ajax Tent - 2-Person, 3-Season",
    "Image": "../images/tents/marmot-ajax-tent-2-person-3-season-in-pale-pumpkin-terracotta~p~880rt_01~320.jpg",

    "SizesAvailable": {},
    "Colors": [
      {
        "ColorCode": "01",
        "ColorName": "Pale Pumpkin/Terracotta"
      }
    ],
    "DescriptionHtmlSimple": "<strong>Excess</strong>. Get out and enjoy nature with Marmot&#39;s Ajax tent, featuring a smart design with durable, waterproof construction and two doors for easy access.",
    "SuggestedRetailPrice": 275.0,
    "Brand": {
      "Id": "1308",
      "Name": "Marmot"
    },
    "ListPrice": 179.99,
    "FinalPrice": 179.99
        "

      }
    

  }
*/