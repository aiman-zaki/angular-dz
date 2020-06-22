import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { StockFormModel } from './../stock-form/stock-form.model';
import { forkJoin, combineLatest, } from 'rxjs';
import { ProductsQuery } from './../../products/state/products.query';
import { StockTypesQuery } from './../../master-data/stock-types/state/stock-types.query';
import { Injectable } from '@angular/core';
import { StocksStore, StocksState } from './stocks.store';
import { Stock } from './stock.model';
@Injectable({ providedIn: 'root' })
export class StocksService{

  constructor(protected store: StocksStore,private httpClient:HttpClient) {
  }


  add(stockForm:StockFormModel){
    return this.httpClient.post("/api/stocks",stockForm)
  }


  getStockProducstFilter(date:any){
    return this.httpClient.get<StockFormModel>(`/api/stocks/stock-products/filters?prevDate=${date}`)
  }


  getStockProducts(id:string){
    return this.httpClient.get<StockFormModel>(`/api/stocks/stock-products/stock/${id}`)
  }

  get(){
    return this.httpClient.get<Stock[]>("/api/stocks").pipe(
      tap(res => this.store.set(res))
    )
  }


}
