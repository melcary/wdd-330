import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage } from "./utils.mjs";

const services = new ExternalServices();

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
    this.list = getLocalStorage(this.key);
    this.calculateItemSubTotal();
  }
  calculateItemSubTotal(){
    
    let totalPriceList = this.list.map((item) => item.FinalPrice)
    let subtotal  = 0
    totalPriceList.forEach(element => {
        subtotal += element;
    });
    let cartItemNumber = this.list.length;
    this.itemTotal  = subtotal;

    // display
    document.querySelector("#subtotal").innerHTML = `$${subtotal.toFixed(2)}`;
    document.querySelector("#itemNum").innerHTML = `${cartItemNumber}`;
    }

  calculateOrderTotal(){
  
    this.tax = this.itemTotal * 6/100;
    let shipping = 0
    for (let i = 0; i < this.list.length; i++) {
            let qty = this.list[i].Quantity
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
     
     document.querySelector("#tax").innerHTML =` $${this.tax.toFixed(2)}`
     document.querySelector("#ShippingFee").innerHTML = `$${this.shipping.toFixed(2)}`
     document.querySelector("#totalamt").innerHTML = `$${this.orderTotal.toFixed(2)}`
  }
  
    async Checkout(form) {
      const checkout =  document.querySelector("#checkOut");
      const order = FormDataToJson(checkout);
      order.orderDate = new Date().toISOString();
      order.orderTotal = this.orderTotal.toFixed(2);
      order.shipping = this.shipping;
      order.tax = this.tax.toFixed(2);
      order.items = packageItems(this.list)
      

      try {
        const response = await services.checkout(order)
        console.log(response)
      } catch (error) {
           console.log(error)
      }
    }
}

function packageItems(items){
  // takes the items currently stored in the cart
  //  (localstorage) and returns them in a simplified form.
  const simplifiedItems =   items.map( item => {
        return {
          id: item.Id,
          name: item.Name,
          price: item.FinalPrice,
          quantity: item.Quantity
        }
    })
    return simplifiedItems;
    
}

function FormDataToJson(formElement){
   const formData = new FormData(formElement);
   let convertedToJson = {}

   formData.forEach((value,key)=>{
         convertedToJson[key] = value;
   })
   return convertedToJson;
}