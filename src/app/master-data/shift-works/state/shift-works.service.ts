import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ShiftWork } from './shift-work.model';
import { Injectable } from '@angular/core';
import { ShiftWorksStore, ShiftWorksState } from './shift-works.store';

@Injectable({ providedIn: 'root' })
export class ShiftWorksService  {

  constructor(protected store: ShiftWorksStore,private httpClient:HttpClient) {
  }


  get(){
    return this.httpClient.get<ShiftWork[]>("/api/master-data/shift-works").pipe(
      tap(res => this.store.add(res))
    )
  }

  create(entity:ShiftWork){
    return this.httpClient.post<ShiftWork>("/api/master-data/shift-works",entity).pipe(
      tap(res => this.store.add(res))
    )
  }

}
