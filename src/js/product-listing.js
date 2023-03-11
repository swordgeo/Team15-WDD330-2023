import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

const headerEl = document.querySelector("header");
const footerEl = document.querySelector("footer");
loadHeaderFooter(headerEl, footerEl);

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);



listing.init();