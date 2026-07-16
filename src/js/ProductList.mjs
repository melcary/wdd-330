import { renderListWithTemplate} from "./utils.mjs";

function productCardTemplate(product){
     return `
     <li class="product-card">
      <a href ="/product_pages/?product=${product.Id}"> 
      <img src="${product.Images.PrimaryMedium}" alt = "an image of ${product.Name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <p>${product.NameWithoutBrand}</p>
      <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
      </li>`
}

export default class ProductList{
   constructor(category,dataSource,listElement){
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
   }
    async init(){
       const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    document.querySelector(".title").textContent = this.category;
   }
   renderList(listOfProducts){
       renderListWithTemplate(productCardTemplate,this.listElement,listOfProducts,"afterbegin")
      //  populatedElementList.forEach(element => {
      //     this.listElement.innerHTML += element;
      //  });
   }
}