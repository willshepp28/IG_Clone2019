import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post = <any>[];
  id: number;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //let id = parseInt( this.route.snapshot.paramMap.get('id')); // gets the id out of the params

    // using paramMap returns a observable
    this.route.paramMap 
      .subscribe(
        (params: ParamMap) => {
          let theid = parseInt(params.get('id'));
          this.id = theid;

          this.postService.getPost(theid)
            .subscribe(
              response => { console.log(response), this.post = response},
              error => console.log(error)
            )
          
        }
      )
    
    console.log(`The ID: ${this.id}`);
  }

}
