import { Supplier } from './supplier.model';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuppliersStore, SuppliersState } from './suppliers.store';

@Injectable({ providedIn: 'root' })
export class SuppliersService {

  constructor(protected store: SuppliersStore,protected httpClient:HttpClient) {
  }




  get(){
    return this.httpClient.get<Supplier[]>("/api/suppliers").pipe(
      tap((res) => this.store.set(res))
    )
  }
  add(){
  }
  remove(){

  }
  update(){
  }

}
