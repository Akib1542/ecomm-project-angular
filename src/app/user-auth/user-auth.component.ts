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
  }

  openSignUp(){
    this.showLogin = false;
  }

  openLogin(){
    this.showLogin = true;
  }
}
