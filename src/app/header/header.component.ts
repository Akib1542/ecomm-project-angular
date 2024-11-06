import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private route: Router, private product: ProductService) { }
  menuType: string = 'default'
  sellerName: string = '';
  userName: string = '';
  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        console.warn(val.url);
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.warn("in seller area")
          this.menuType = 'seller'
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
            console.warn(this.sellerName);
          }
        }
        else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
        }
        else {
          this.menuType = 'default'
        }
      }
    })
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
  }

  searchProduct(searchItem: KeyboardEvent) {
    if (searchItem) {
      const element = searchItem.target as HTMLInputElement;
      console.warn(element.value);
      this.product.serchProduct(element.value).subscribe((result) => {
        console.warn(result)
      })
    }
  }
}
