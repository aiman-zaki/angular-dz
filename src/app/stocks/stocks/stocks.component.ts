import { Record } from './../stock-form/stock-form.model';
import { BranchesQuery } from 'src/app/branches/state/branches.query';
import { BranchesService } from 'src/app/branches/state/branches.service';
import { cloneDeep } from 'lodash';
import { faCalendar, faThumbtack, faUser, faClock, faEye, faPlusCircle,faCheck,faTimes,faInfoCircle,faUndo } from '@fortawesome/free-solid-svg-icons';
import { StocksService } from './../state/stocks.service';
import { StocksQuery } from './../state/stocks.query';
import { StocksStore } from './../state/stocks.store';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Branch } from 'src/app/branches/state/branch.model';
@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  faCalendar = faCalendar
  faThumbtack = faThumbtack
  faUser = faUser
  faClock = faClock
  faEye = faEye
  faPlusCircle = faPlusCircle
  faUndo = faUndo
  stocks$: Observable<Record[]>
  todayStocks$: BehaviorSubject<Record[]> = new BehaviorSubject([])
  todayStocksForm$:  BehaviorSubject<Record[]> = new BehaviorSubject([])
  todayStock: Record[] = []
  branch$: Observable<Branch[]>
  prevDate: Date = new Date()
  faCheck = faCheck
  faCross= faTimes
  faInfoCircle= faInfoCircle
  page:number=1
  pageLimit:number=5
  total:number = 0
  filter = {
    date:null
  }
  constructor(private router: Router, private query: StocksQuery, private service: StocksService,private branchService:BranchesService,private branchQuery:BranchesQuery) { }

  onResetFilters(){
    this.filter = {
      date:null
    }
    this.service.get(this.page,this.pageLimit).subscribe(res => {
      this.total = res['total']

    })
  }

  onDateChange(event){
    if(this.filter.date != null){
      this.service.getWithFilters(this.page,this.pageLimit,this.filter).subscribe(res => {
      this.total = res['total']
      })
    }
  }
  onPageChange(event){
    this.service.get(event,this.pageLimit).subscribe()
  }
  onGetTodayStockDetail(){
    this.todayStocks$.subscribe((stocks) => {
      let form = []
      stocks.map((stock) => {
        this.service.getStockProducstFilter(stock.date,stock.branch_id,stock.shift_work_id).subscribe((stockForm) => {
          form.push(stockForm)
        })
        this.todayStocksForm$.next(form)
      })
    })
  }

  onCheckTodayStockAndBranch(branchId:number){
    let data = this.todayStock.find((t) => {
      if(t.branch_id == branchId){
        return true
      } else {
        return false
      }
    })
    return data ? true : false
  }

  onViewStockForm(id: string) {
    this.router.navigateByUrl(`/stocks/details/${id}`)

  }
  onNavigatToStockForm() {
    this.router.navigateByUrl("/stocks/new-form")
  }

  ngOnInit(): void {
    this.service.get(this.page,this.pageLimit).subscribe(res => {
      this.total = res['total']

    })
    this.branchService.get().subscribe()
    this.stocks$ = this.query.selectAll()
    this.branch$ = this.branchQuery.selectAll()
    this.stocks$.subscribe(res => {
      let todayStocks = []
      if (res.length > 0) {
        res.forEach((stock) => {
          let stockDate =  new Date(stock.date)
          let date = this.filter.date ? this.filter.date : new Date()
          if(stockDate.getDate() ==  date.getDate() ){
            todayStocks.push(stock)
          }
          this.todayStock = todayStocks
        })
      } else {
        this.todayStock = todayStocks
      }
    })

  }

}
