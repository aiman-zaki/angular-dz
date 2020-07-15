import { Router } from '@angular/router';
import { AuthQuery } from './../core/auth/state/auth.query';
import { AuthService } from './../core/auth/state/auth.service';
import { ToastService } from 'src/app/shared/toast/toast.service';


import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, timeoutWith } from 'rxjs/operators'

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private toastService:ToastService,private authService:AuthService,private authQuery:AuthQuery,private router:Router){}

  private errorHandler(req: HttpRequest<any>,response: HttpErrorResponse,next: HttpHandler): Observable<HttpEvent<any>> {
    if(response.status == 401){
      if(this.authQuery.refreshToken){
        this.authService.refreshToken(this.authQuery.refreshToken()).subscribe(res => {
          localStorage.setItem("access_token",res)
          return next.handle(req)
        },(error => {
          this.toastService.showErrorMessage(response.error)
          this.authService.logout()
          this.router.navigateByUrl("/login")
          throw response
        }))
      }
    } else {
      this.toastService.showErrorMessage(response.error)
      throw response
    }
    throw null
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => this.errorHandler(req,error,next)))
  }
}
