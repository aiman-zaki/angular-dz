import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { StocksStore, StocksState } from './stocks.store';

@Injectable({ providedIn: 'root' })
export class StocksQuery extends QueryEntity<StocksState> {

  constructor(protected store: StocksStore) {
    super(store);
  }

}
