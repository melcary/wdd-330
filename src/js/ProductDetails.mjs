import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
    }
async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
     let cart = getLocalStorage("so-cart");

    if (!cart) {
      cart = [];
    }

    cart.push(this.product);

    setLocalStorage("so-cart", cart);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}


function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Brand.Name;

  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("product-image");
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById("product-price").textContent = product.FinalPrice;

  document.getElementById("product-color").textContent =
    product.Colors[0].ColorName;

  document.getElementById("product-desc").innerHTML =
    product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}