import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsStore, ProductsState } from './products.store';
import { Product } from './product.model';
import { ID } from '@datorama/akita';
import { NgEntityService,NgEntityServiceConfig } from '@datorama/akita-ng-entity-service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductsService extends NgEntityService<ProductsState>  {

  constructor(protected store: ProductsStore,private httpClient:HttpClient) {
    super(store)
  }

  getById(id) {
    return this.httpClient.get<Product>(`${environment.serverUrl}/products/${id}`)
  }

}
