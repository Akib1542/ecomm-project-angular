import { EventEmitter, Injectable } from '@angular/core';
import { login, Signup } from '../../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth = new EventEmitter<boolean>(false);
  constructor(private http : HttpClient, private router : Router) { }
  userSignUp(user : Signup){
    this.http.post("http://localhost:3000/users",user,{observe: 'response'})
    .subscribe((result)=>{
      console.warn(user);
      if(result){
        localStorage.setItem('user', JSON.stringify(result.body))
        this.router.navigate(['/']);
      }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user'))
    {
      this.router.navigate(['/'])
    }
  }

  userLogin(data : login) {
    this.http.get<Signup[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
      {observe:'response'}).subscribe((result)=>{
        if(result && result.body?.length){
          this.invalidUserAuth.emit(false);
          console.warn(result);
          localStorage.setItem('user', JSON.stringify(result.body[0]))
          this.router.navigate(['/']); 
        }
        else
        {
          this.invalidUserAuth.emit(true);
        }
      })
  }

}
