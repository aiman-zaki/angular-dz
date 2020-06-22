import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StockTypesStore, StockTypesState } from './stock-types.store';
import { StockType } from './stock-type.model';
@Injectable({ providedIn: 'root' })
export class StockTypesService {

  constructor(protected store: StockTypesStore,private httpClient:HttpClient) {
  }

  get(){
    return this.httpClient.get<StockType[]>("/api/master-data/stock-types").pipe(
      tap(res => this.store.add(res))
    )
  }

  add(){

  }

  remove(){

  }

  update(){

  }

}
