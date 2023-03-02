import { getLocalStorage} from "./utils.mjs";

function updateCartCount() {
  const cartItems = getLocalStorage("so-cart");
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  console.log(cartCount);

  const cartCountEl = document.getElementById("cart-count");
  if (cartCount === 0) {
    cartCountEl.classList.add("hide");
  } else {
    cartCountEl.classList.remove("hide");
    cartCountEl.textContent = cartCount.toString();
  }

  
}

updateCartCount();