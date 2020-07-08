import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersStore, UsersState } from './users.store';
import { User } from './user.model';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { RolesState } from '../../roles/state/roles.store';

@Injectable({ providedIn: 'root' })
export class UsersService extends NgEntityService<RolesState> {

  constructor(protected store: UsersStore,private httpClient:HttpClient) {
    super(store);

  }


}
