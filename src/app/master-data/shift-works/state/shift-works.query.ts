import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ShiftWorksStore, ShiftWorksState } from './shift-works.store';

@Injectable({ providedIn: 'root' })
export class ShiftWorksQuery extends QueryEntity<ShiftWorksState> {

  constructor(protected store: ShiftWorksStore) {
    super(store);
  }

}
