import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { RecordForm,Record } from './../stock-form/stock-form.model';
import { forkJoin, combineLatest, } from 'rxjs';
import { ProductsQuery } from './../../products/state/products.query';
import { StockTypesQuery } from './../../master-data/stock-types/state/stock-types.query';
import { Injectable } from '@angular/core';
import { StocksStore, StocksState } from './stocks.store';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class StocksService{

  constructor(protected store: StocksStore,private httpClient:HttpClient) {
  }



  remove(id:string){
    return this.httpClient.delete(`${environment.serverUrl}/records/${id}`).pipe(
    tap(  this.store.remove(id))
    )
  }


  add(stockForm:RecordForm){
    return this.httpClient.post(`${environment.serverUrl}/records`,stockForm)
  }

  update(stockForm:RecordForm){
    return this.httpClient.put(`${environment.serverUrl}/records`,stockForm)
  }


  getStockProducstFilter(date:any,branchId:number,shiftWorkId:number){
    return this.httpClient.get<RecordForm>(`${environment.serverUrl}/records/filters?date=${date}&branchId=${branchId}&shiftWorkId=${shiftWorkId}`)
  }


  getStockProducts(id:string){
    return this.httpClient.get<RecordForm>(`${environment.serverUrl}/records/${id}`)
  }

  get(page:number,pageLimit:number){
    return this.httpClient.get<Record[]>(`${environment.serverUrl}/records?page=${page}&pageLimit=${pageLimit}`).pipe(
      tap(res => this.store.set(res['response']))
    )
  }


}
