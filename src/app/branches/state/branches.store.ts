import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Branch } from './branch.model';

export interface BranchesState extends EntityState<Branch> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'branches' })
export class BranchesStore extends EntityStore<BranchesState> {

  constructor() {
    super();
  }

}
