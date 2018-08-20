import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  users = [];
  posts = [];

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.discoverUsers()
      .subscribe(
        response => { console.log(response), this.users = response },
        error => console.log(error)
      )

    this.authService.getPost()
      .subscribe(
        response => { console.log(response), this.posts = response},
        error => console.log(error)
      )
  }

}
