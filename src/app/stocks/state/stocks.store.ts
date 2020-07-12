import { Record } from '../stock-form/stock-form.model';
import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
export interface StocksState extends EntityState<Record> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'stocks' })
export class StocksStore extends EntityStore<StocksState> {

  constructor() {
    super();
  }

}
