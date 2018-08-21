import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FollowerService {

  

  constructor(
    private http: HttpClient
  ) { }


  getFollowers(token){
    return this.http.get<any>(`http://localhost:3000/api/v1/follower/${token}`);
  }
}
