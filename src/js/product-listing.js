import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

const headerEl = document.querySelector("header");
const footerEl = document.querySelector("footer");
loadHeaderFooter(headerEl, footerEl);

const category = getParam("category");
const sortType = getParam("product-list-sort");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");

// Set html tags
document.getElementById("product-list-sort").value = sortType;
document.getElementById("product-list-category").value = category;
document.getElementById("product-category").innerHTML = category;

const listing = new ProductList(category, dataSource, element, sortType);

listing.init();
