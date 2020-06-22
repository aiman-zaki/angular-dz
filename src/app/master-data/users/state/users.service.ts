import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersStore, UsersState } from './users.store';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {

  constructor(protected store: UsersStore,private httpClient:HttpClient) {
  }


  get(){
    return this.httpClient.get<User[]>("/api/users").pipe(
      tap(res => this.store.set(res))
    )
  }

  add(user:User){
    return this.httpClient.post<User>("/api/users",user).pipe(
      tap(res => this.store.add(user))
    )
  }

  update(){

  }

  delete(){

  }


}
