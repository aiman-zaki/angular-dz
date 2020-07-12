import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchesStore, BranchesState } from './branches.store';
import { Branch } from './branch.model';
import { NgEntityService,NgEntityServiceConfig } from '@datorama/akita-ng-entity-service';

@Injectable({ providedIn: 'root' })
export class BranchesService extends NgEntityService {

  constructor(protected store: BranchesStore,private httpClient:HttpClient) {
    super(store)
  }

  getById(id:string){
    return this.httpClient.get<Branch>(`/api/branches/${id}`)
  }



}
