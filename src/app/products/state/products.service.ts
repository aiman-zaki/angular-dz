import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsStore, ProductsState } from './products.store';
import { Product } from './product.model';
import { ID } from '@datorama/akita';
@Injectable({ providedIn: 'root' })
export class ProductsService  {

  constructor(protected store: ProductsStore,private http:HttpClient) {

  }

  getById(id) {
    return this.http.get<Product>(`api/products/${id}`)
  }

  get() {
    return this.http.get<Product[]>('api/products')
        .pipe(
          tap(products => this.store.set(products))
        );
  }


  add(product:Product) {
    return this.http.post<Product>('/api/products',product).pipe(
      tap(product => this.store.add(product))
    )
  }

  update(product:Product){
    return this.http.put<Product>(`/api/products/${product.id}`,product)
  }

  remove(id:ID){
    this.store.remove(id)
  }

}
