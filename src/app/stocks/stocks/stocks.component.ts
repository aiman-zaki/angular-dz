import { BranchesQuery } from 'src/app/branches/state/branches.query';
import { StockFormModel } from './../stock-form/stock-form.model';
import { BranchesService } from 'src/app/branches/state/branches.service';
import { cloneDeep } from 'lodash';
import { faCalendar, faThumbtack, faUser, faClock, faEye, faPlusCircle,faCheck,faTimes,faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { StocksService } from './../state/stocks.service';
import { StocksQuery } from './../state/stocks.query';
import { StocksStore } from './../state/stocks.store';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Stock } from '../state/stock.model';
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
  stocks$: Observable<Stock[]>
  todayStocks$: BehaviorSubject<Stock[]> = new BehaviorSubject([])
  todayStocksForm$:  BehaviorSubject<StockFormModel[]> = new BehaviorSubject([])
  todayStock: Stock[] = []
  branch$: Observable<Branch[]>
  prevDate: Date = new Date()
  faCheck = faCheck
  faCross= faTimes
  faInfoCircle= faInfoCircle
  constructor(private router: Router, private query: StocksQuery, private service: StocksService,private branchService:BranchesService,private branchQuery:BranchesQuery) { }

  onGetTodayStockDetail(){
    this.todayStocks$.subscribe((stocks) => {
      let form = []
      stocks.map((stock) => {
        this.service.getStockProducstFilter(stock.stock_date,stock.branch.id).subscribe((stockForm) => {
          form.push(stockForm)
        })
        this.todayStocksForm$.next(form)
      })
    })
  }

  onCheckTodayStockAndBranch(branchId:number){
    let data = this.todayStock.find((t) => {
      if(t.branch.id == branchId){
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
    this.service.get().subscribe()
    this.branchService.get().subscribe()
    this.stocks$ = this.query.selectAll()
    this.branch$ = this.branchQuery.selectAll()
    this.stocks$.subscribe(res => {
      let todayStocks = []
      res.forEach((stock) => {
        let stockDate = new Date(stock.stock_date)
        if(stockDate.getDate() == new Date().getDate()){
          todayStocks.push(stock)
        }
        this.todayStock = todayStocks
      })
    })

  }

}
