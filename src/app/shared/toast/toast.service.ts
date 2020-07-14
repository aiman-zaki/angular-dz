import { Toast } from './toast.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ToastService {
  toastsSubject$:Subject<Toast[]> = new BehaviorSubject([])
  toastsList:Toast[] = []

  get toasts$():Observable<Toast[]>{
    return this.toastsSubject$.asObservable()
  }

  constructor(){
  }

  remove(toast:Toast){
    this.toastsList = this.toastsList.filter(t => t != toast)
    this.toastsSubject$.next(this.toastsList)
  }

  create(toast:Toast){
    this.toastsList.push(toast)
    this.toastsSubject$.next(this.toastsList)
  }

  generateToast(content:string,className:string){
    let toast:Toast = {
      id:this.toastsList.length+1,
      class:className,
      autohide:true,
      delay:4000,
      content:content
    }
    this.create(toast)
  }

  showErrorMessage(content:any){
    this.generateToast(content,"bg-danger text-light")

  }

  showSuccessMessage(content:any){
    this.generateToast(content,"bg-success text-light",)

  }


}
