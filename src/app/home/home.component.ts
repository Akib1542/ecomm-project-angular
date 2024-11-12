import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, product } from '../../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  popularProduct : undefined | product[]
  trendyProduct : undefined | product[]
  constructor(private product : ProductService){



  }

  ngOnInit() : void {
    this.product.popularProducts().subscribe((data)=>{
      this.popularProduct = data
    })

    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProduct = data
    })

    this.localCartToRemoteCart();
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    if (data && user) {
      let cartDataList: product[] = JSON.parse(data);
      debugger

      let userProfile = JSON.parse(user);

      cartDataList.forEach((product: product,index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId: userProfile.id
        };
        
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result)=>{
            if(result)
            {
              console.warn("item stored in db!");
            }
          })
          if(cartDataList.length===index+1)
          {
            localStorage.removeItem('localCart');
          }
        }, 500);

      });
    }
  }
  
}
