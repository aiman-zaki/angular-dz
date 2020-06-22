import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { ShiftWork } from './shift-work.model';

export interface ShiftWorksState extends EntityState<ShiftWork> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'shift-works' })
export class ShiftWorksStore extends EntityStore<ShiftWorksState> {

  constructor() {
    super();
  }

}
