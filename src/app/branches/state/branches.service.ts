import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchesStore, BranchesState } from './branches.store';
import { Branch } from './branch.model';
import { NgEntityService,NgEntityServiceConfig } from '@datorama/akita-ng-entity-service';
import { environment } from '../../../environments/environment'
@Injectable({ providedIn: 'root' })
export class BranchesService extends NgEntityService {

  constructor(protected store: BranchesStore,private httpClient:HttpClient) {
    super(store)
  }

  getById(id:string){
    console.log(environment.serverUrl)
    return this.httpClient.get<Branch>(`${environment.serverUrl}/branches/${id}`)
  }



}
