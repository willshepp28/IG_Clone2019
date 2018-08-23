import { Component, OnInit } from '@angular/core';
import { SavedPostService } from '../../saved-post.service';

import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {

  savedPost = [];
  savedPostLength: number;

  constructor(
    private saveService: SavedPostService
  ) { }

  ngOnInit() {
    var token = this.getDecodedAccessToken(localStorage.getItem('token'));
    var tokenId = token.user[0].id;

    this.saveService.getUsersSavedPost(tokenId)
      .subscribe(
        response => { console.log(response), this.savedPost = response, this.savedPostLength = this.savedPost.length},
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

}
