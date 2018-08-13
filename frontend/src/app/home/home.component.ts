import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LikeService } from '../like.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts = [];
  comments = [];

  postSaved: boolean = false;


  private _likeUrl = "http://localhost:8000/api/v1/likes";



  constructor(
    private authService: AuthService,
    private likeService: LikeService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {

    this.authService.getPosts()
      .subscribe(
        response => { console.log(response), this.posts = response },
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
          
          // Update post with new like
          this.authService.getPosts()
          .subscribe(
            response => { console.log(response), this.posts = response },
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


  save() {
    this.postSaved = true;
  }

  unSave() {
    this.postSaved = false;
  }


}
