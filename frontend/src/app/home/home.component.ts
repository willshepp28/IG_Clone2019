import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

  this.authService.getPosts()
    .subscribe(
      response => this.posts = response,
      error => { 
        if (error instanceof HttpErrorResponse){

          if (error.status === 401) {
            this.router.navigate(["/login"]);
          }
        }
      }
    )
    
  }

}
