import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Stock } from './stock.model';

export interface StocksState extends EntityState<Stock> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'stocks' })
export class StocksStore extends EntityStore<StocksState> {

  constructor() {
    super();
  }

}
