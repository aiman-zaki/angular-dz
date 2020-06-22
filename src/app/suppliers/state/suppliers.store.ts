import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Supplier } from './supplier.model';

export interface SuppliersState extends EntityState<Supplier> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'suppliers' })
export class SuppliersStore extends EntityStore<SuppliersState> {

  constructor() {
    super();
  }

}
