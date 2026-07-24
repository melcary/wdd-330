import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

const orderSummary = new CheckoutProcess("so-cart", "#checkOut");
orderSummary.init();

const submitBtn = document.querySelector("#submit");

document.querySelector("#zip").addEventListener("blur", () => {
  orderSummary.calculateOrderTotal();
});
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const myForm = document.forms[0];
  const chk_status = myForm.checkValidity();

  myForm.reportValidity();

  if (chk_status) {
    orderSummary.Checkout();
  }
});
