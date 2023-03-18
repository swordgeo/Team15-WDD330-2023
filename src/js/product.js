import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { updateCartCount } from "./cart-count.js";

updateCartCount();

const headerEl = document.querySelector("header");
const footerEl = document.querySelector("footer");
loadHeaderFooter(headerEl, footerEl);

const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();


window.dispatchEvent(new Event('load'));