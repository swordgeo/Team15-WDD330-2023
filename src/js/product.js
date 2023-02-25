// import { setLocalStorage } from "./utils.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// function addProductToCart(product) {
//   setLocalStorage("so-cart", product);
// }
function addProductToCart(product) {
  //first I need to grab the cart as it is
  let cartContents = getLocalStorage("so-cart");
  //If the cart is empty then .push errors because cartContents isn't an array
  //Therefore we're gonna create an empty array before moving on
  if (!Array.isArray(cartContents)) {
    cartContents = [];
  }
  cartContents.push(product);
  setLocalStorage("so-cart", cartContents);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
