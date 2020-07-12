import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ShiftWork } from './shift-work.model';
import { Injectable } from '@angular/core';
import { ShiftWorksStore, ShiftWorksState } from './shift-works.store';
import { NgEntityService,NgEntityServiceConfig } from '@datorama/akita-ng-entity-service';
import { environment } from 'src/environments/environment';
@NgEntityServiceConfig({
  resourceName: 'shift-works',
  baseUrl: `${environment.serverUrl}/master-data`
})
@Injectable({ providedIn: 'root' })
export class ShiftWorksService   extends NgEntityService<ShiftWorksState> {

  constructor(protected store: ShiftWorksStore,private httpClient:HttpClient) {
    super(store)
  }

}
