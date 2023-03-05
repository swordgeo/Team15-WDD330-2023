import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./cart-count.js";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Get cart total and update cart html
  let total = 0
  cartItems.map((item) => {
    total += (parseFloat(item.FinalPrice) * parseInt(item.quantity))
  });
  document.querySelector(".cart-total").innerHTML = `Total: $${total.toLocaleString("en-US")}`;

  //Set total visible or hidden
  var element = document.querySelector(".cart-footer");
  if (total > 0){
    element.classList.remove("hide");
  }else{
    element.classList.add("hide");
  }


}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <span class="cart-delete" title="Delete Cart Item" id="${item.Id}">x</span>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div>
    <p class="cart-card__quantity">qty: <input type="number" value="${item.quantity}" min="1" class="cart-item-quantity-input"></p>
    <button class="update-quantity-btn" id="${item.Id}">Update Quantity</button>
  </div>

  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function deleteCartItem() {
  let cartItems = getLocalStorage("so-cart");
  const itemId = this.id;
  cartItems.splice(cartItems.findIndex(item => item.Id === itemId), 1);
  setLocalStorage("so-cart", cartItems);
  //regenerate
  renderCartContents();
  createItemDelete();
  createQuantityUpdate();
  updateCartCount();
}

function createItemDelete() {
  var cart = document.getElementsByClassName("cart-delete");
  for (var i = 0; i < cart.length; i++) {
    cart[i].addEventListener("click", deleteCartItem);
  }
}

function updateQuantity() {
  const cartItems = getLocalStorage("so-cart");
  const itemId = this.id;
  const quantityInput = this.parentNode.querySelector('.cart-item-quantity-input');
  const newQuantity = quantityInput.value.trim();

  const itemIndex = cartItems.findIndex((item) => item.Id === itemId);
  if (itemIndex !== -1) {
    // Check if newQuantity is a valid number
    if (!isNaN(newQuantity) && newQuantity !== '') {
      cartItems[itemIndex].quantity = parseInt(newQuantity);
      setLocalStorage("so-cart", cartItems);
      //regenerate
      renderCartContents();
      createItemDelete();
      createQuantityUpdate();
      updateCartCount();
    } else {
      console.error(`Invalid quantity: ${newQuantity}`);
    }
  } else {
    console.error(`No item found in cartItems at index ${itemIndex}`);
  }

}

function createQuantityUpdate() {
  var cart = document.getElementsByClassName("update-quantity-btn");
  for (var i = 0; i < cart.length; i++) {
    cart[i].addEventListener("click", updateQuantity);
  }
}

renderCartContents();
createItemDelete();
  //this wants to be here so that we can continue using all the buttons without refresh
createQuantityUpdate();