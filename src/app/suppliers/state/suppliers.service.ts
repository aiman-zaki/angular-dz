import { Supplier } from './supplier.model';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuppliersStore, SuppliersState } from './suppliers.store';
import { NgEntityService,NgEntityServiceConfig } from '@datorama/akita-ng-entity-service';

@Injectable({ providedIn: 'root' })
export class SuppliersService  extends NgEntityService<SuppliersState>{

  constructor(protected store: SuppliersStore,protected httpClient:HttpClient) {
    super(store)
  }

}
