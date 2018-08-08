
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from'@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, of , throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private _auth: AuthService
  ){}

intercept(
  request: HttpRequest<any>,
  next: HttpHandler
) {


  let authService = this.injector.get(AuthService)
    let tokenizedReq = request.clone(
      {
        headers: request.headers.set('Authorization', 'bearer ' + authService.getToken())
      }
    )
    return next.handle(tokenizedReq)




// return next.handle(request)
//   .pipe(map(data => {
//     localStorage.setItem('item', data.type.toString())
//     console.log(this._auth.getToken())
//     console.log(localStorage.getItem('item'))
//     console.log(data);
//     return data
//   }),
//   catchError( error => {
//     return throwError("Something went wrong")
//   })
// )


}



}