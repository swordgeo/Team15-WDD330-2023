import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = 

`<li class="cart-card divider">
  <span class="cart-delete" title="Delete Cart Item" id="${item.Id}">x</span>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
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

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }
  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
  }
}