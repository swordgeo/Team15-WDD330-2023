import { getLocalStorage } from "./utils.mjs";

export function updateCartCount() {

  //We have to do this because of the header being loaded through a snippet.
  //It now waits until the ENTIRE page is loaded before proceeding.
  //In order to make this call update (during quanitity edits/deleted from cart)
  //window.dispatchEvent(new Event('load'));
  window.onload = function() {
    const cartItems = getLocalStorage("so-cart");
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
    const cartCountEl = document.querySelector("#cart-count");
    if (cartCount === 0 || !cartItems) {
      cartCountEl.style.display = "none";
    } else {
      let displayCount = cartCount.toString(); // assign the cartCount to a new variable that we can modify
      if (cartCount >= 100) {
        displayCount = "99+"; // reassign the displayCount variable if the cartCount is greater than or equal to 100
      }
      cartCountEl.classList.remove("hide");
      cartCountEl.textContent = displayCount; // use the displayCount variable instead of the cartCount variable
    }
  };
}
