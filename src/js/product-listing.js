import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();

console.log(dataSource.getData("tents"));

// search
const searchIcon = document.querySelector("#searchIcon");
const searchBox = document.querySelector("#search");
searchIcon.addEventListener("click", (event) => {
  event.preventDefault();
  if (searchBox.value === "" || searchBox.value === null) {
    return;
  } else {
    const productId = searchBox.value;
    // I wanted to search by product name:
    // 404 error, said i wasnt authenticated.
    listing.renderSearchResults(productId);
  }
});
