import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _signupUrl = "http://localhost:3000/api/v1/signup";
  private _loginUrl = "http://localhost:3000/api/v1/login";
  private _postsUrl = "http://localhost:3000/api/v1/posts";
  private _postUrl = "http://localhost:3000/api/v1/post";
  private _userUrl = "http://localhost:3000/api/v1/users";

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  registerUser(user) {
    return this.http.post<any>(this._signupUrl, user)
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }

  getPosts() {
    return this.http.get<any>(this._postsUrl)
  }


  loggedIn() {

    // returns true or false
    // if token is in local storage it returns true. If not it returns false
    return !!localStorage.getItem('token')
  }

   public getToken(): string {
  
    return localStorage.getItem('token');
  }


  discoverUsers(){
    return this.http.get<any>(this._userUrl);
  }

  getPost(){
    return this.http.get<any>(this._postUrl);
  }
  
 
}


// Import HttpClientModule
// Inject it in the AuthService Constructor
