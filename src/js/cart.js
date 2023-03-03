import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Get cart total and update cart html
  let total = 0
  cartItems.map((item) => {
    total += (parseFloat(item.FinalPrice) * parseInt(item.quantity))

   }
  );
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
  <span class="cart-delete">X</span>
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
  <p class="cart-card__quantity">qty: ${item.quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}


renderCartContents();
