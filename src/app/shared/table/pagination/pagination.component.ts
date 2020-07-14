import { TableStateHelper } from './../table-state.helper.service';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Pagination } from './pagination.model';
import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit,AfterContentInit {
  @Input() pagination$: Observable<Pagination>;
  @Output() navigate = new EventEmitter();

  @Input() state:Observable<boolean>
  pageArray$:BehaviorSubject<any> = new BehaviorSubject(new Array(1))

  pagination:Pagination = {
    recordsTotal:10,
    recordsFiltered:10,
    length:10
  }

  showPagination$:BehaviorSubject<boolean> = new BehaviorSubject(false)
  currentPage:number = 1
  arrayLength:number

  pageArray:number[]

  displaySubject$:BehaviorSubject<string> = new BehaviorSubject("")
  display$ = this.displaySubject$.asObservable()

  pageLimit = 10
  sliceStart = 0
  sliceEnd = this.pageLimit

  constructor(private service:TableStateHelper ) {
  }

  onChangeSliceAndNavigate(i:number,forward:boolean){
    if(forward){
      this.sliceStart = this.sliceEnd
      this.sliceEnd = this.sliceEnd+this.pageLimit
      this.onNavigate(this.sliceStart+1,false)
    } else {
      this.sliceEnd = this.sliceStart
      this.sliceStart = this.sliceEnd-this.pageLimit
      this.onNavigate(this.sliceEnd,false)

    }
  }


  onNavigateBackNext(back:boolean){
    if(back){
      //this.currentPage += -1
      this.onChangeSliceAndNavigate(-1,false)
      //this.navigate.emit(this.currentPage)
    } else {
      //this.currentPage += 1
      this.onChangeSliceAndNavigate(+1,true)
      //this.navigate.emit(this.currentPage)

    }
  }

  onBackDisabled(){
    if(this.sliceEnd == this.pageLimit){
      return true
    } else {
    return false
    }
  }

  onNextDisabled(){
    if(this.sliceEnd > (this.pageArray.length-1) ){
      return true
    } else {

    return false
    }
  }

  onNavigate(page: number,pageLengthChange:boolean) {
    this.currentPage = page
    if(pageLengthChange){
      this.sliceStart = 0
      this.sliceEnd = this.pageLimit
      this.onTotalPage()
    } else {
      this.navigate.emit(page-1);
      this.pageArray$.next(this.pageArray)
    }

  }

  onTotalPage() {
    this.pagination$.subscribe((res) => {
      this.pagination = res
      let page =  this.pagination.recordsFiltered / this.pagination.length;
      this.showPagination$.next(true)

      this.arrayLength = Math.round(page)
      if(page % 1 < 0.5){
        this.arrayLength += 1
      }
      if(page % 1 == 0){
        this.arrayLength += -1
      }
      this.arrayLength = this.arrayLength > 0 ? this.arrayLength : 0
      let array = new Array(this.arrayLength)
      for(let i = 0 ; i < array.length ; i++){
        array[i] = i+1
      }
      this.pageArray = array
      this.pageArray$.next(this.pageArray)
      this.displaySubject$.next(this.onDisplayPaginationString())
    })
  }

  onDisplayPaginationString() {
    let of = this.pagination.length*this.currentPage
    let curr = (this.pagination.length*(this.currentPage-1)) + 1
    of = of > this.pagination.recordsFiltered ? this.pagination.recordsFiltered : of
    return `Showing ${curr} to ${of} of ${this.pagination.recordsFiltered}`

  }
  ngAfterContentInit(){

  }

  ngOnInit(): void {
    this.onTotalPage()
    this.state.subscribe((res) => {
        if(res){
          this.onNavigate(1,false)
        } else {
          this.onNavigate(1,true)
        }
    })

  }
}
