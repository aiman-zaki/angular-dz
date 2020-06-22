import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchesStore, BranchesState } from './branches.store';
import { Branch } from './branch.model';

@Injectable({ providedIn: 'root' })
export class BranchesService {

  constructor(protected store: BranchesStore,private httpClient:HttpClient) {

  }

  get(){
    return this.httpClient.get<Branch[]>("/api/branches").pipe(
      tap(res => this.store.set(res))
    )
  }

  add(branch:Branch){
    return this.httpClient.post<Branch>("/api/branches",branch).pipe(
      tap(res => this.store.add(branch))
    )
  }
  remove(){

  }

  update(){

  }

}
