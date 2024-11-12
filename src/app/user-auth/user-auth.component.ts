import { Component } from '@angular/core';
import { cart, login, product, Signup } from '../../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {

  showLogin: boolean = true;
  authError: string = "";
  constructor(private user: UserService, private product : ProductService) {
  }

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data: Signup) {
    this.user.userSignUp(data);
  }

  login(data: login) {
    console.warn(data);
    const userProfile = this.user.userLogin(data);

    this.user.invalidUserAuth.subscribe((result) => {
      console.warn("error or not: ", result);
      if (result) {
        console.warn("there is an error!");
        
        this.authError = "please enter valid user details!";
      }
      else {
      }
    });
  }

  openSignUp() {
    this.showLogin = false;
  }

  openLogin() {
    this.showLogin = true;
  }

 


}
