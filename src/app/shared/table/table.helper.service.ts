import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Table, TableColumn, TableResponse } from './table.model';
import { tap  } from 'rxjs/operators';
import { Injectable, ElementRef } from '@angular/core';

/*
  Example URL Query Generated

  draw	"2"
  columns[0].data	"id"
  columns[0].name	""
  columns[0].searchable	"true"
  columns[0].orderable	"false"
  columns[0].search.value	""
  columns[0].search.regex	"true"
  columns[0].index	"id"
  columns[0].customStyle	"text-align:center;width:300px;font-size:14px"
  columns[0].customHeaderText	"Actions"
  columns[1].data	"name"
  columns[1].name	""
  columns[1].searchable	"true"
  columns[1].orderable	"true"
  columns[1].search.value	""
  columns[1].search.regex	"true"
  columns[1].index	"name"
  columns[1].customStyle	"width:500px;font-size:14px"
  columns[2].data	"value"
  columns[2].name	""
  columns[2].searchable	"true"
  columns[2].orderable	"true"
  columns[2].search.value	""
  columns[2].search.regex	"true"
  columns[2].index	"value"
  columns[2].customStyle	"font-size:14px"
  order[0].column	"1"
  order[0].dir	"asc"
  start	"0"
  length	"5"
  search.value	""
  search.regex	"false"
*/

/*
  Example API Response for the Table to auto generate

  draw	2
  recordsTotal	16
  recordsFiltered	16
  data	[ {…}, {…}, {…}, {…}, {…} ]
  error	null
*/


@Injectable({
  providedIn: 'root',
})
export class TableHelperService {
  loadingSubject$: BehaviorSubject<boolean>;
  table: Table
  url:string
  draw:number
  sortableHeader:ElementRef[]


  constructor(private httpClient: HttpClient) {
    this.loadingSubject$ = new BehaviorSubject(false);
    this.draw = 1
  }


  get loading$(): Observable<boolean> {
    return this.loadingSubject$.asObservable();
  }

  sort(colIndex:number,dir:string){
    if(dir == ''){
      colIndex = 1
      dir = 'asc'
    }
    this.table.order = [{
      column:colIndex,
      dir:dir
    }]
    this.draw = this.draw + 1
    this.table.draw = this.draw
    let query = this.table.tableToQuery()
    return this.get(query, this.url)
  }

  paginate(start:number){
    this.table.start = start
    this.draw = this.draw + 1
    this.table.draw = this.draw
    let query = this.table.tableToQuery()

    return this.get(query,this.url)
  }

  get(query: string, url: string) {
    return this.httpClient.get<TableResponse>(`${url}?${query}`).pipe(
      tap(()=>{ })
    )
  }

  createTable(tableColumn: TableColumn[], url: string, length: number) {
    if(this.url !== url){
      this.draw = 1
    }
    let table = new Table();
    table.length = length;
    table.columns = tableColumn;
    table.draw = this.draw
    let query = table.tableToQuery();
    this.table = table
    this.url = url
    return this.get(query, url)
  }
}
