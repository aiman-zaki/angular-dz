import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { AuthModel } from '../../../shared/models/auth.model';

export interface AuthState extends AuthModel {

}

export function createInitialState(): AuthState {
  return {

  }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {

  constructor() {
    super(createInitialState());
  }

}
