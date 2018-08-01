import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {};

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
        response => {
          console.log(response)
          localStorage.setItem("token", response.token);
          this._router.navigate(["/home"])
        },
        error => console.log( error )
      )
  }

  // loginUser() {
  //   console.log(this.loginUserData)
  // }

  // loginUser(event){
  //   event.preventDefault();
  //   const target = event.target;

  //   const username = target.querySelector("#username").value;
  //   const password = target.querySelector("#password").value;

  //   this.Auth.getUserDetails(username, password);
  //   console.log(username, password);
  // }

}
