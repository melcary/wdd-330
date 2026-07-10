function productCardTemplate(product){
     return 
     `<li class="product-card">
      <a href ="product_pages/?product"> 
      <img src="" alt = "an image of">
      <h2 class="card__name"> </h3>
      <h3 class="card__brand"> </h3>
      <p class="product-card__price"> </p>
      </a>
      </li>`
}




export default class ProductList{
   constructor(category,dataSource,listElement){
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
   }
   // Finally, use the dataSource to get the list of products to work with
    async init(){
       const data = await this.dataSource.getData();
   }
//    renderList(productList){
//        productList.map(listitem => )
//    }
}