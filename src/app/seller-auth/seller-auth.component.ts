import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router }  from '@angular/router';
import { Signup } from '../../data-type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {
  constructor(private seller : SellerService, private router : Router){}
  showLogin = false;
  authError:string='';
  ngOnInit():void{
    this.seller.reloadSeller();
  }

  signUp(data : Signup) : void{
    console.warn(data);
    this.seller.userSignUp(data)
  }

  login(data : Signup) : void{
    this.authError="";
    //console.warn(data);
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((error)=>{
      if(error){
          this.authError = "Email or Password is not correct!"
      }
    })
  }

  openLogin(){
      this.showLogin = true;
  }

  openSignUp(){
    this.showLogin = false;
  }
  
}
