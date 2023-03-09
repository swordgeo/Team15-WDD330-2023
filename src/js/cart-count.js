import { getLocalStorage } from "./utils.mjs";

export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart");
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const cartCountEl = document.getElementById("cart-count");
  if (cartCount === 0) {
    cartCountEl.classList.add("hide");
  } else {
    let displayCount = cartCount.toString(); // assign the cartCount to a new variable that we can modify
    if (cartCount >= 100) {
      displayCount = "99+"; // reassign the displayCount variable if the cartCount is greater than or equal to 100
    }
    cartCountEl.classList.remove("hide");
    cartCountEl.textContent = displayCount; // use the displayCount variable instead of the cartCount variable
  }
}

updateCartCount();
