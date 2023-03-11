import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  let discountPercent = parseFloat(product.FinalPrice) / parseFloat(product.SuggestedRetailPrice) * 100;

  return `<li class="product-card">
  <a href="product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Images.PrimaryMedium}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">$${product.FinalPrice}<br> (${discountPercent.toFixed(0)}% off retail)</p></a>
</li>`;
}

function filterList(list){

// Only thing I could find to filter by was price
//This may change later
var filtered = list.filter(item => item.FinalPrice !== 179.99);

return filtered

}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData(this.category);
    // render the list
    this.renderList(filterList(list));
  }

  //Filter list
  filterList(list){
    //Object.keys(list).
    //filter((key) => key.includes('Name')).
    //reduce((cur, key) => { return Object.assign(cur, { [key]: list[key] })}, {});
    return list
  }
  // render after doing the first stretch
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  // render before doing the stretch
  // renderList(list) {
  //   const htmlStrings = list.map(productCardTemplate);
  //   this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
  // }
}
