import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LikeService } from '../like.service';
import { Observable } from 'rxjs';
import { CommentService } from '../comment.service';
import { FollowerService } from '../follower.service';

import * as jwt_decode from "jwt-decode";
import { SavedPostService } from '../saved-post.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts = [];
  postLength: number;
  comments = [];
  followers = [];
  userComment;
  // comments = {
  //   comment: "",
  //   postId: 0
  // };
  

  postSaved: boolean = false;


  private _likeUrl = "http://localhost:3000/api/v1/likes";



  constructor(
    private authService: AuthService,
    private likeService: LikeService,
    private commentService: CommentService,
    private followerService: FollowerService,
    private savePostService: SavedPostService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {

  

    this.authService.getPosts()
      .subscribe(
        response => { console.log(response),
          this.posts = response,
          this.postLength = this.posts.length },
        error => {
          if (error instanceof HttpErrorResponse) {

            if (error.status === 401) {
              this.router.navigate(["/login"]);
            }
          }
        }
      )

      

  }




  LikePost(id) {

    this.likeService.addLike({ id: id })
      .subscribe(
        response => {
          
          this.authService.getPosts()
          .subscribe(
            response => { console.log(response),
              this.posts = response,
              this.postLength = this.posts.length },
            error => {
              if (error instanceof HttpErrorResponse) {
    
                if (error.status === 401) {
                  this.router.navigate(["/login"]);
                }
              }
            }
          )
    

        },
      error => { console.log("Not going through"), console.log(error)}
      )

  }


  save(id) {

    console.log(id);
    
    this.savePostService.savePost({id: id})
      .subscribe(
        response => {
          
          // Update post with new save
          this.authService.getPosts()
            .subscribe(
              response => { console.log(response), this.posts = response},
              error => console.log(error)
            )
        }
      )
  }

// comment = {};
  addComment(postId){

    this.comments.push({ postId: postId, comment: this.userComment});
    console.log(this.comments);

  }





  unSave() {
    this.postSaved = false;
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
