import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { StockTypesStore, StockTypesState } from './stock-types.store';

@Injectable({ providedIn: 'root' })
export class StockTypesQuery extends QueryEntity<StockTypesState> {

  constructor(protected store: StockTypesStore) {
    super(store);
  }

}
