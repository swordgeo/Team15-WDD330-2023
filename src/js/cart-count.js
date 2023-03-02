import { getLocalStorage} from "./utils.mjs";

function updateCartCount() {
  const cartItems = getLocalStorage("so-cart");
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartCountElement = document.getElementById("cart-count");
  cartCountElement.textContent = cartCount.toString();
}

updateCartCount();