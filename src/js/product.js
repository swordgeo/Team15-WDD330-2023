import { getLocalStorage, setLocalStorage } from "./utils.js";
import ProductData from "./ProductData.js";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  //addtoCart function had no arrays and I added one to store local information.
  let cartProducts = [];
  if (localStorage.getItem("so-cart")) {
    cartProducts = getLocalStorage("so-cart");
  }
  cartProducts.push(product)
  setLocalStorage("so-cart", cartProducts);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document.getElementById("addToCart").addEventListener("click", addToCartHandler);
