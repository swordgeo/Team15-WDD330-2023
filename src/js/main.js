import Alert from "./Alert.js";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const headerEl = document.querySelector("header");
const footerEl = document.querySelector("footer");
loadHeaderFooter(headerEl, footerEl);


const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductList("Tents", dataSource, element);

const alerts = new Alert;

listing.init();
alerts.init();

// updateCartCount();