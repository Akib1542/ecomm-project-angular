import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../../data-type';
import { Router } from '@angular/router';


@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {

  productMessage : undefined | string;
  productData: undefined | product
  constructor(private route: ActivatedRoute, private product: ProductService, private router: Router) {

  }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    //console.warn('idd =', productId)
    productId && this.product.getProduct(productId).subscribe((data) => {
      console.warn(data);
      this.productData = data;
    })
  }
  submit(data: product) {
      console.warn(data);
      if(this.productData)
      {
        data.id = this.productData.id;
      }
      this.product.updateProduct(data).subscribe((result)=>{
        if(result)
        {
            this.productMessage = "Product has updated!"
        }
        setTimeout(() => {
          this.productMessage = undefined;
          this.router.navigate(['/seller-home']);
        }, 3000);
      })
  }
}