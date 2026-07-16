import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const productId = getParam("product");
const dataSource = new ProductData("tents");
const product = new ProductDetails(productId, dataSource);
product.init();

//We don't need this anymore :

//function addProductToCart(product) {
// const cartItems = getLocalStorage("so-cart") || [];
//cartItems.push(product);
//  setLocalStorage("so-cart", cartItems);}

//async function addToCartHandler(e) {
//const product = await dataSource.findProductById(e.target.dataset.id);
//addProductToCart(product);}

//document
//.getElementById("addToCart")
//.addEventListener("click", addToCartHandler);//
