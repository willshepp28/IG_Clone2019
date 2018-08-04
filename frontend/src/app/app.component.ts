import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private _authService: AuthService
  ){}

  isAuthenticated(): boolean{
    console.log("Started")
    if(this._authService.loggedIn()) {
      console.log("true")
      return true;
    } else {
      console.log("false")
      return false;
    }
  }

}
