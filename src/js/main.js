import { loadHeaderFooter } from "./utils.mjs";

const productList = document.querySelector(".product-list");

const productData = new ProductData("tents");
const productListInstance = new ProductList("tents", productData, productList);
productListInstance.init();


loadHeaderFooter()
// this call was omitted
