import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";
loadHeaderFooter();

//
let cartTotal = document.querySelector(".cart-total");
let amount = document.querySelector("#amount");
let totalPrice = 0;

const productList = document.querySelector(".product-list");
function renderCartContents() {
  try {
    const cartItems = getLocalStorage("so-cart");
    if (!cartItems || cartItems.length === 0) {
      cartTotal.classList.remove("show");
      document.querySelector(".product-list").innerHTML =
        "<li class='cart-card divider'>Your cart is empty.</li>";
      return;
    }

    let index = 0;
    const htmlItems = cartItems.map((item) => {
      index++;
      totalPrice += item.FinalPrice;
      return cartItemTemplate(item, index);
    });
    productList.innerHTML = htmlItems.join("");
    amount.innerHTML = `$${totalPrice}`;
    cartTotal.classList.add("show");
  } catch (Error) {
    console.log(Error.message);
    productList.innerHTML =
      "<li class='cart-card divider'>An error occured.</li>";
  }
}

function cartItemTemplate(item, num) {
  const newItem = `<li class="cart-card divider" id="item-${num}">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryExtraLarge}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="remove" title="remove item">
      <span class="item-id" Id="${num}" hidden>${item.Id}</span>
  </button>
</li>`;

  return newItem;
}

renderCartContents();

//
function attachListenerForBtns() {
  let removeBtn = document.querySelectorAll(".remove");
  removeBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      removeItem(btn);
    });
  });
}
function removeItem(btn) {
  let itemId = btn.querySelector("span").textContent;
  let uniqueId = btn.querySelector("span").getAttribute("id");
  let localStorageItems = getLocalStorage("so-cart");
  // const el =  localStorageItems.pop(uniqueId-1)
  localStorageItems.splice(uniqueId - 1, 1);
  setLocalStorage("so-cart", localStorageItems);
  let li = document.querySelector(`#item-${uniqueId}`);
  productList.removeChild(li);
  renderCartContents();
  attachListenerForBtns();
}
attachListenerForBtns();

