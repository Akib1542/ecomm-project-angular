import { Component } from '@angular/core';
import { login, Signup } from '../../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {

  showLogin : boolean = true;
  authError : string = "";
  constructor(private user : UserService)
  {
  }

  ngOnInit(): void{
    this.user.userAuthReload();
  }

  signUp(data : Signup){
      this.user.userSignUp(data);
  }

  login(data : login){
    console.warn(data);
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result)=>{
      console.warn("hello",result);
      if(result){
        this.authError = "please enter valid user details!";
      }
    });
  }

  openSignUp(){
    this.showLogin = false;
  }

  openLogin(){
    this.showLogin = true;
  }
}
