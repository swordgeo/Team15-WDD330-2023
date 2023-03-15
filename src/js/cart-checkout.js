import { loadHeaderFooter } from "./utils.mjs";
import { updateCartCount } from "./cart-count.js";
// import {renderCartTotal} from "./cart.js";
import CheckoutProcess from "./CheckoutProcess.mjs";

const headerEl = document.querySelector("header");
const footerEl = document.querySelector("footer");
loadHeaderFooter(headerEl, footerEl);


const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

document
  .querySelector("#zip")
  .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));
// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  myCheckout.checkout();
});





updateCartCount();
