import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../../data-type';
import { timeout } from 'rxjs';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  productList : undefined | product[]; 
  productMessage : undefined | string;
  constructor(private product: ProductService){
  }

  ngOnInit():void {
    this.productLists();
  }

  deleteProduct(id:number)
  {
    console.warn(id);
    this.product.deleteProduct(id).subscribe((result)=>{
        if(result){
          this.productMessage = "Product is deleted";
          this.productLists();
        }
        setTimeout(()=>this.productMessage=undefined,3000);
    })
  }

  productLists()
  {
     this.product.productList().subscribe((result)=>{
        console.warn(result);
        this.productList =  result;
     })
  }

  updateProduct(id : number){
    console.warn(id);
  }

  
}
