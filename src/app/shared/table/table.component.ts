import { Pagination } from './pagination/pagination.model';
import { Observable, Subject, BehaviorSubject, forkJoin } from 'rxjs';
import { TableColumn, TableResponse, TableButton, TableColumnDateFormat, TableColumnSearch } from './table.model';
import { TableHelperService } from './table.helper.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  /*
    The columns requested to be displayed
    Must existed on the backend
  */
  @Input() columns: TableColumn[];
  /*
    The api of the dtlist
  */
  @Input() url: string;
  /*
    The length of per page response
  */
  @Input() length$: Observable<number>;
  @Input() initialLength: number
  /*
    The buttons that will populate the 'id' fields
  */
  @Input() buttons: TableButton[]
  /*
    TODO :
    Transforms date to desire format
  */
  @Input() dateFormats: TableColumnDateFormat[]
  /*
    state to trigger rebuild of the table

  */
  @Input() state$: Observable<TableColumnSearch[]>
  /*
    The handlers for give buttons
    Emit the index of button and the id of data
  */
  @Output() buttonsHandler = new EventEmitter()



  @Input() customClass:string



  /*
    Pagination State

  */
  length: number;
  paginationState$:Subject<boolean> = new Subject()

  entity: TableResponse = {};
  searchs: TableColumnSearch[]
  temp:number
  pagination$: BehaviorSubject<Pagination> = new BehaviorSubject({
    recordsTotal: 10,
    recordsFiltered: 10,
    length: 10,
  })

  loading$: Observable<boolean>;
  constructor(private tableService: TableHelperService) {
    this.loading$ = this.tableService.loading$;
    this.entity.data = []
  }

  onConvertDataToDate(dateString:string){
    let date = new Date(dateString)
    return new Date(dateString)
  }

  onCheckFormatIndex(index: number) {
    let formatIndex = this.dateFormats.findIndex((d) => d.column == index)
    this.temp = formatIndex
    return formatIndex
  }

  onResToEntity(res: any) {
    this.entity = res;
    if(this.entity.error !== null && this.entity.error){
      alert(this.entity.error)
    } else {
      this.pagination$.next({
        recordsTotal: res.recordsTotal,
        recordsFiltered: res.recordsFiltered,
        length: this.length,
      })
    }
    this.tableService.loadingSubject$.next(true);
  }

  onSorting(event: any) {
    this.tableService.sort(event.column, event.direction).subscribe(res => {
      this.onResToEntity(res)
    })

  }

  onButtonsAction(index: number, id: string) {
    this.buttonsHandler.emit({ index: index, id: id })
  }

  onNavigate(page: number) {
    let start = page * this.length
    this.tableService.paginate(start).subscribe(res => {
      this.onResToEntity(res)

    })
  }

  onReturnColumnValue(index: number) {
    return this.columns[index];
  }

  ngOnInit(): void {
    this.length = this.initialLength
    if (this.state$) {
      this.state$.subscribe(res => {
        this.searchs = res
        this.searchs.map((search) => {
          this.columns[search.colIndex].search = {
            regex:false,
            value:search.searchParam
          }
        })
        if(this.tableService.draw > 1 ){
          this.paginationState$.next(true)
        }
        this.length$.subscribe((l) => {

          this.length = l
          this.paginationState$.next(false)
          this.tableService.createTable(this.columns, this.url, this.length).subscribe((res) => {
            this.onResToEntity(res)

          })
        })
        })

    } else {
      this.tableService.createTable(this.columns, this.url, this.length).subscribe((res) => {
        this.onResToEntity(res)
      });
    }

  }
}
