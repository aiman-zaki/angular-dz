import { ToastService } from 'src/app/shared/toast/toast.service';


import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private toastService:ToastService){}

  private errorHandler(response: any): Observable<HttpEvent<any>> {
    console.log(response)
    this.toastService.showErrorMessage(response.error)
    throw response
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => this.errorHandler(error)))
  }
}
