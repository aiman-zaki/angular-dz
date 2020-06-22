import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AuthStore, AuthState } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
  selectIsLogin$ = this.select('access_token')

  constructor(protected store: AuthStore) {
    super(store);
  }

  getAccesToken(){
    return this.getValue().refresh_token
  }

  isLoggedIn(){
    return this.getValue().refresh_token ? true : false
  }

}
