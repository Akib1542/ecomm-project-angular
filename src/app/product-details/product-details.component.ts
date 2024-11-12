import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  productData : undefined | product
  productQuantity : number = 1
  quality : number = 1 ;
  removeCart = false;


  constructor(private activeRoute : ActivatedRoute, private product : ProductService){

  }
  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId)
    productId && this.product.getProduct(productId).subscribe((result)=>{
      console.warn(result);

      productId && this.product.getProduct(productId).subscribe((result)=>{
        console.warn(result);
        this.productData =  result;


        let cartData = localStorage.getItem('localCart')
        if(productId && cartData){
          let items = JSON.parse(cartData);
          items = items.filter((item:product)=> productId == item.id.toString());
          if(items.length){
            this.removeCart = true;
          }
          else this.removeCart = false;
        }

      });
    })
  }

  handleQuanlity(value : string){
      if(this.productQuantity<20 && value == 'plus')
      {
        this.productQuantity+=1;
      }
      if(this.productQuantity>1 && value == 'minus')
      {
          this.productQuantity-=1;
      }
  }

  addToCart(){
    if(this.productData)
    {
      this.productData.quantity = this.productQuantity;
      if(!localStorage.getItem('user')){
        //console.warn(this.productData);
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      }
      else
      {
        console.warn('user is logged on!')
        let user = localStorage.getItem('user');
        let userId  = user && JSON.parse(user).id;
        console.log("userid", userId);
        let cartData : cart= {
          ...this.productData,
          productId: this.productData.id,
          userId,
        }
        delete cartData.id;
        console.warn(cartData);
        this.product.addToCart(cartData).subscribe((result)=>{
          console.warn(`result`,result);
          
          if(result)
          {
            alert('Product is added to the cart!');
          }
        })
         
      }
    }   
  }

  removeToCart(productId : number){
    this.product.localRemoveCart(productId);
    this.removeCart = false;

  }

}
