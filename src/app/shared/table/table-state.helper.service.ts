import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Table, TableColumn, TableResponse } from './table.model';
import { tap } from 'rxjs/operators';
import { Injectable, ElementRef } from '@angular/core';

interface HeaderElementRef {
  index:number,
  el:ElementRef
}

@Injectable({
  providedIn: 'root',
})
export class TableStateHelper {
  currentHeader:number
  private sortable:HeaderElementRef[] = []

  get headers():HeaderElementRef[]{
    return this.sortable
  }

  set header(s:HeaderElementRef){
    this.sortable.push(s)
  }


}
