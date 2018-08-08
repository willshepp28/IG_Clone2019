import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private router: Router,
    private _authService: AuthService
  ){}

 
  isAuthenticated(): boolean{
    
    if(this._authService.loggedIn()) {
      // console.log(localStorage.getItem('token'))
      return true;
    } else {
      return false;
    }
  }


  clear(){
    localStorage.clear();
  }

  showToken(){
    return localStorage.getItem('token');
  }

}
