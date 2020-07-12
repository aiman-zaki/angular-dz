import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthStore } from './auth.store';
import { AuthModel } from '../../../shared/models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private authStore: AuthStore, private http: HttpClient) {
  }

  login(creds:AuthModel) {
    return this.http.post<AuthModel>("/api/auth/login",creds).pipe(
      tap(auth => this.authStore.update(auth))
    )
  }

  logout(){
    localStorage.removeItem('access_token')
  }

  regster(creds:AuthModel){
    return this.http.post("/api/auth/register",creds).pipe(
      tap(auth => this.authStore.update(auth))
    )
  }

}
