import { getLocalStorage, setLocalStorage, alertMessage} from "./utils.mjs";

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

       const existingItem = cart.find((item) => item.Id === this.product.Id);

       if (existingItem) {
         existingItem.Quantity = (existingItem.Quantity || 1) + 1;
        } else {
        this.product.Quantity = 1;
        cart.push(this.product);
        }

        setLocalStorage("so-cart", cart);
     }
    renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}


function productDetailsTemplate(product) {
   document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;

  const productImage = document.querySelector("#product-image");
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;
  const euroPrice = new Intl.NumberFormat('de-DE',
    {
      style: 'currency', currency: 'EUR',
    }).format(Number(product.FinalPrice) * 0.85);
  document.querySelector("#product-price").textContent = `${euroPrice}`;
  document.querySelector("#product-color").textContent = product.Colors[0].ColorName;
  document.querySelector("#product-desc").innerHTML = product.DescriptionHtmlSimple;

  document.querySelector("#addToCart").dataset.id = product.Id;
}