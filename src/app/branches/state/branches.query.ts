import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { BranchesStore, BranchesState } from './branches.store';

@Injectable({ providedIn: 'root' })
export class BranchesQuery extends QueryEntity<BranchesState> {

  constructor(protected store: BranchesStore) {
    super(store);
  }

}
