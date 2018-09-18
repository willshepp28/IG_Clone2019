import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { Observable } from 'rxjs';


import { AuthService } from '../core/authentication/auth.service';
import { LikeService } from '../core/services/like/like.service';
import { CommentService } from '../core/services//comments/comment.service';
import { FollowerService } from '../core/services//follower/follower.service';
import { SavedPostService } from '../core/services/saved-post/saved-post.service';
import { PostService } from '../core/services/post/post.service';






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
  commentPlaceholder: string = "Add a Comment ...";



  postSaved: boolean = false;


  private _likeUrl = "http://localhost:3000/api/v1/likes";



  constructor(
    private authService: AuthService,
    private likeService: LikeService,
    private commentService: CommentService,
    private followerService: FollowerService,
    private savePostService: SavedPostService,
    private postService: PostService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {

    



    this.authService.getPosts()
      .subscribe(
        response => {
          console.log(response),
          this.posts = response,
          this.postLength = this.posts.length
        },
        error => {
          if (error instanceof HttpErrorResponse) {

            if (error.status === 401) {
              this.router.navigate(["/login"]);
            }
          }
        }
      )



  }


  submit(event, postId) {
    // https://stackoverflow.com/questions/37577919/angular2-submit-form-by-pressing-enter-without-submit-button


    if (event.keyCode == 13) {
      console.log(event.target.value);
      event.preventDefault();
      console.log("Yup you pressed enter");
      console.log(`Event:  ${event}`)
      console.log(`PostID: ${postId}`)

      this.commentService.addComment({ id: postId, comment: event.target.value })
        .subscribe(
          response => {

            this.authService.getPosts()
              .subscribe(
                response => {
                  this.posts = response,
                    this.postLength = this.posts.length
                  // this.commentPlaceholder = "Add a Comment...."
                  event.target.value = " ";
                },
                error => console.log(error)
              )
          }
        )


    }
  }



  LikePost(id) {

    this.likeService.addLike({ id: id })
      .subscribe(
        response => {


          // What we need to do here is get the specific post the user liked, then update the posts array
          console.log(this.posts);
          // this.authService.getPosts()
          //   .subscribe(
          //     response => {
          //       console.log(response),
          //       this.posts = response,
          //       this.postLength = this.posts.length
          //     },

          this.postService.getUpdatedPost(id)
            .subscribe(

              response => {
                console.log(response)
              },
              error => {
                if (error instanceof HttpErrorResponse) {

                  if (error.status === 401) {
                    this.router.navigate(["/login"]);
                  }
                }
              }
            )


        },
        error => { console.log("Not going through"), console.log(error) }
      )

  }


  save(id) {

    console.log(id);

    this.savePostService.savePost({ id: id })
      .subscribe(
        response => {

          // Update post with new save
          this.authService.getPosts()
            .subscribe(
              response => { console.log(response), this.posts = response },
              error => console.log(error)
            )
        }
      )
  }

  // comment = {};
  addComment(postId) {

    this.comments.push({ postId: postId, comment: this.userComment });
    console.log(this.comments);

  }



  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }




}
