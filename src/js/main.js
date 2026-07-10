import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSourse = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSourse, element);

productList.init();