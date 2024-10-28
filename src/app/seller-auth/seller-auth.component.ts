import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {
  constructor(private selller : SellerService){}
  signUp(data : object) : void{
    console.log(data);
    this.selller.userSignUp(data).subscribe((result)=>{
      console.warn(result);
    });
  }
  
}
