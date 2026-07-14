import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const productList = document.querySelector(".product-list")

const productData = new ProductData("tents");
const productListInstance = new ProductList("tents",productData,productList)
productListInstance.init();



