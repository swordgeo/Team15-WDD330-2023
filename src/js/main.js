import Alert from "./Alert.js";
import { loadHeaderFooter } from "./utils.mjs";
import { updateCartCount } from "./cart-count.js";

const headerEl = document.querySelector("header");
const footerEl = document.querySelector("footer");
loadHeaderFooter(headerEl, footerEl);

const alerts = new Alert();
alerts.init();

updateCartCount();

