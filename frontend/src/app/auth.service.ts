import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _signupUrl = "http://localhost:8000/api/v1/signup";
  private _loginUrl = "http://localhost:8000/api/v1/login";

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user) {
    return this.http.post<any>(this._signupUrl, user)
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }

  loggedIn() {

    // returns true or false
    // if token is in local storage it returns true. If not it returns false
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem("token");
  }

}


// Import HttpClientModule
// Inject it in the AuthService Constructor
