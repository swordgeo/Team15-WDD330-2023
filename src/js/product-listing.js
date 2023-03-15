import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import { updateCartCount } from "./cart-count.js";
//modal experiment
import ModalDetails from './modal.js';

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

// console.log("before")
// console.log(document.querySelectorAll(".quick-view-button"));

window.onload = async function() {
  // console.log("after")
  // console.log(document.querySelectorAll(".quick-view-button"));
  // const quickViewButtons = document.querySelectorAll(".quick-view-button");
  
  // quickViewButtons.forEach((button) => {
  //   button.addEventListener("click", (event) => {
  //     console.log("click");
  //     const productId = event.target.dataset.productId;
  //     modalClicker(productId);
  //   });
  // });
  // updateCartCount();
}

  // quickViewButtons.forEach((button) => {
  //   button.addEventListener("click", (event) => {
  //     const productId = event.target.dataset.productId;
  //     modalClicker(productId);
  //   });
  // });


// console.log(document.querySelectorAll(".quick-view-button"));
  // Get all the quick view buttons on the page


    // console.log(document.querySelectorAll(".quick-view-button"));

    // console.log(document.querySelectorAll(".quick-view-button"));
  

  // const quickViewButtons = document.querySelectorAll('.quick-view-button');

  // console.log(document.querySelectorAll(".quick-view-button"));
  // // Loop through each button and add a click event listener
  // quickViewButtons.forEach(button => {
  //   button.addEventListener('click', () => {
  //     // Get the product ID from the data-product-id attribute
  //     console.log('Click')
  //     const productId = button.dataset.productId;

  //     // Create a new instance of ModalDetails for the current product
  //     const modalDetails = new ModalDetails(productId, dataSource);

  //     // Initialize the modal details object and render the modal
  //     modalDetails.init();
  //     // // modalClicker();
  //     // modalClicker.call(modalDetails);
  //   });
  // });

//  updateCartCount();
