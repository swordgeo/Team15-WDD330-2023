import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import { updateCartCount } from "./cart-count.js";

const headerEl = document.querySelector("header");
const footerEl = document.querySelector("footer");
loadHeaderFooter(headerEl, footerEl);

const category = getParam("category");
const sortType = getParam("product-list-sort");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
ExternalServices
// Set html tags
document.getElementById("product-list-sort").value = sortType;
document.getElementById("product-list-category").value = category;
document.getElementById("product-category").innerHTML = category;

const breadcrumb = document.getElementById("breadCrumbs")
const breadCrumbChild = document.createElement("a")
breadCrumbChild.href = ""
breadCrumbChild.innerHTML = category
breadcrumb.appendChild(breadCrumbChild)
console.log("bread crumb is here...")
console.log(breadcrumb)

const listing = new ProductList(category, dataSource, element, sortType);

listing.init();

 updateCartCount();
