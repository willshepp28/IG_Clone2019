import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = [];
  postLength: number;

  constructor(
    private userService : UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    var token = this.getDecodedAccessToken(localStorage.getItem('token'));
    var tokenId = token.user[0].id;

    console.log(token.user[0].id);
    // console.log(localStorage.getItem('token'));
    this.userService.getUser(tokenId)
      .subscribe(
        response => { console.log(response) ,
           this.user = response
          },
        error => console.log(error)
      )
  }


  showPosts(){
   this.router.navigate(['post'], { relativeTo: this.route})
  }


  showSaved(){
    this.router.navigate(['saved'], { relativeTo: this.route})
  }


  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }


  

}
