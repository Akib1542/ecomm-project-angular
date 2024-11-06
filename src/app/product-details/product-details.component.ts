import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  productData : undefined | product
  productQuantity : number = 1
  quality : number = 1 ;
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
        
      })
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
}
