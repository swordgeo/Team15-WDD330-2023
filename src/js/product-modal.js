import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";


function modalClicker() {
  const quickViewButtons = document.getElementsByClassName("quick-view-button");
  for (let i = 0; i < quickViewButtons.length; i++) {
    quickViewButtons[i].addEventListener('click', () => this.renderModalDetails(this.product));
  }
}
function modalDetailsTemplate(obj) {
  return `<div id="modal-head-divider"><h3>${obj.Brand.Name} ${obj.NameWithoutBrand}</h3>
  <span id="modal-close">X</span></div>
    
    <img
      class="divider"
      src="${obj.Images.PrimaryLarge}"
      alt="${obj.NameWithoutBrand}"
    />
    <p class="product-card__price">$${obj.FinalPrice}</p>
    <p class="product__color">${obj.Colors[0]["ColorName"]}</p>
    <p class="product__description">
    ${obj.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${obj.Id}">Add to Cart</button>
    </div>`;
}


export default class ModalDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = null;
    this.modalElement = document.querySelector(".product-modal");
  }

  async init() {
    // const modalDiv = document.querySelector(".modal");

    const quickViewButtons = document.querySelectorAll(".quick-view-button");
    
    quickViewButtons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        const productId = event.target.dataset.productId;
        // console.log(productId);
        const dataSource = new ExternalServices("tents");
        try {
          const product = await dataSource.findProductById(productId);
          // console.log(product);
          this.renderModalDetails(product);
        } catch (error) {
          console.log(error);
        }
      });
    });
    
  }

  renderModalDetails(product) {
    this.modalElement = document.querySelector(".product-modal");
    const modalContent = modalDetailsTemplate(product);
    this.modalElement.innerHTML = modalContent;
    this.modalElement.classList.add("show");
    document
    .getElementById("modal-close")
    .addEventListener("click", () => this.closeModal());
    document
      .getElementById("addToCart")
      .addEventListener("click", () => this.addProductToCart(product));
  }

  closeModal() {
    this.modalElement.classList.remove("show");
  }

  async renderModal() {
    await this.init();
    this.renderModalDetails(this.product);
    modalClicker();
  }

  addProductToCart(product) {
    //first I need to grab the cart as it is
    let cartContents = getLocalStorage("so-cart");
    //If the cart is empty then .push errors because cartContents isn't an array
    //Therefore we're gonna create an empty array before moving on
    if (!Array.isArray(cartContents)) {
      cartContents = [];
    }
    //This is where we check to see if the cart already has the item in question and revises the quantity rather than adding a dupe item at quantity 1
    let existingProductIndex = cartContents.findIndex(p => p.Id === product.Id);
    if (existingProductIndex !== -1) {
      cartContents[existingProductIndex].quantity++;
    } else {
      product.quantity = 1;
      cartContents.push(product);
    }
    setLocalStorage("so-cart", cartContents);
    //re-up updateCartCount
    window.dispatchEvent(new Event('load'));
  }
}