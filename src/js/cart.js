import { getLocalStorage, setLocalStorage } from "./utils.mjs";
// import { updateCartCount } from "./cart-count.js";
import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

const headerEl = document.querySelector("header");
const footerEl = document.querySelector("footer");
loadHeaderFooter(headerEl, footerEl);

const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();

function renderCartTotal() {
  const cartItems = getLocalStorage("so-cart");

  // Get cart total and update cart html
  let total = 0;
  cartItems.map((item) => {
    total += parseFloat(item.FinalPrice) * parseInt(item.quantity);
  });
  document.querySelector(
    ".cart-total"
  ).innerHTML = `Total: $${total.toLocaleString("en-US")}`;

  //Set total visible or hidden
  var element = document.querySelector(".cart-footer");
  if (total > 0) {
    element.classList.remove("hide");
  } else {
    element.classList.add("hide");
  }
}

function deleteCartItem() {
  let cartItems = getLocalStorage("so-cart");
  const itemId = this.id;
  cartItems.splice(
    cartItems.findIndex((item) => item.Id === itemId),
    1
  );
  setLocalStorage("so-cart", cartItems);
  //regenerate
  cart.renderCartContents();
  renderCartTotal();
  createItemDelete();
  createQuantityUpdate();
  // updateCartCount();
}

function createItemDelete() {
  var cartClass = document.getElementsByClassName("cart-delete");
  for (var i = 0; i < cart.length; i++) {
    cartClass[i].addEventListener("click", deleteCartItem);
  }
}

function updateQuantity() {
  const cartItems = getLocalStorage("so-cart");
  const itemId = this.id;
  const quantityInput = this.parentNode.querySelector(
    ".cart-item-quantity-input"
  );
  const newQuantity = quantityInput.value.trim();

  const itemIndex = cartItems.findIndex((item) => item.Id === itemId);
  if (itemIndex !== -1) {
    // Check if newQuantity is a valid number
    if (!isNaN(newQuantity) && newQuantity !== "") {
      cartItems[itemIndex].quantity = parseInt(newQuantity);
      setLocalStorage("so-cart", cartItems);
      //regenerate
      cart.renderCartContents();
      renderCartTotal();
      createItemDelete();
      createQuantityUpdate();
      // updateCartCount();
    } else {
      console.error(`Invalid quantity: ${newQuantity}`);
    }
  } else {
    console.error(`No item found in cartItems at index ${itemIndex}`);
  }
}

function createQuantityUpdate() {
  var cartClass = document.getElementsByClassName("update-quantity-btn");
  for (var i = 0; i < cart.length; i++) {
    cartClass[i].addEventListener("click", updateQuantity);
  }
}

renderCartTotal();
createItemDelete();
//this wants to be here so that we can continue using all the buttons without refresh
createQuantityUpdate();
