import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _postUrl = 'http://localhost:3000/api/v1/posts';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }



/*
|--------------------------------------------------------------------------
| Adds a new post
|--------------------------------------------------------------------------
*/

addPost(id) {
  return this.http.post<any>(this._postUrl,id);
};



/*
|--------------------------------------------------------------------------
| Get one post
|--------------------------------------------------------------------------
*/
  getPost(postId){
    return this.http.get(`http://localhost:3000/api/v1/posts/${postId}`)
  }



/*
|--------------------------------------------------------------------------
| Get all posts
|--------------------------------------------------------------------------
*/
getAllPosts(){
  return this.http.get(this._postUrl);
}


selectPost(postId) {
  this.router.navigate(['/post', postId])
}


}
