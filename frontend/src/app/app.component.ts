import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { FollowerService } from './follower.service';

import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
  followRequests = <any>[];

  constructor(
    private router: Router,
    private _authService: AuthService,
    private _followService: FollowerService
  ){}


  getFollowers(){
    // get userId
    var token = this.getDecodedAccessToken(localStorage.getItem('token'));
    var tokenId = token.user[0].id;


    this._followService.getFollowers(tokenId)
      .subscribe(
        response => { console.log(response), this.followRequests = response},
        error => console.log(error)
      )
  }


  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }


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
