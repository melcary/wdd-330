import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess{
  constructor(key,outputSelector){
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = []
    this.itemTotal = 0
    this.shipping = 0
    this.tax = 0
    this.orderTotal = 0;
  }
  init(){
    this.key = getLocalStorage(this.key);
    this.calculateItemSummary();
  }
  calculateItemSubTotal(){
    
    let totalPriceList = this.key.map((item) => item.FinalPrice)
    let subtotal  = 0
    totalPriceList.forEach(element => {
        subtotal += element;
    });
    let cartItemNumber = this.key.Length;
    this.itemTotal  = subtotal;

    // display
    document.querySelector("#subtotal").innerHTML = `$${subtotal.tofixed(2)}`;
    document.querySelector("#itemNum").innerHTML = `${cartItemNumber}`;
    }

  calculateOrderTotal(){
  
    this.tax = this.itemTotal * 6/100;
    let shipping = 0
    for (let i = 0; i < this.key.length; i++) {
            let qty = this.key.Quantity[i]
            if(i === 0){
               shipping = 10 + (qty-1) * 2
            }
            else{
                shipping += qty * 2;
            }    
    }
    this.shipping = shipping;
    this.orderTotal = this.itemTotal + this.tax + this.shipping

    // display
    this.displayOrderTotals();
  }
  displayOrderTotals(){
     // once the totals are all calculated display
     //  them in the order summary page

     document.querySelector("#tax").innerHTML =` $${this.tax.toFixed(2)}`
     document.querySelector("#ShippingFee").innerHTML = `$${this.shipping.toFixed(2)}`
     document.querySelector("#totalamt").innerHTML = `$${this.orderTotal.toFixed(2)}`
  }

}