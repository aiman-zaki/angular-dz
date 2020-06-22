import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { StockType } from './stock-type.model';

export interface StockTypesState extends EntityState<StockType> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'stock-types' })
export class StockTypesStore extends EntityStore<StockTypesState> {

  constructor() {
    super();
  }

}
