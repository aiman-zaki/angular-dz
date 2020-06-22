import { faCalendar,faThumbtack,faUser,faClock,faEye,faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { StocksService } from './../state/stocks.service';
import { StocksQuery } from './../state/stocks.query';
import { StocksStore } from './../state/stocks.store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Stock } from '../state/stock.model';
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
  faPlusCircle= faPlusCircle
  stocks$:Observable<Stock[]>
  constructor(private router:Router,private query:StocksQuery,private service:StocksService) { }

  onViewStockForm(id:string){
    this.router.navigateByUrl(`/stocks/details/${id}`)

  }
  onNavigatToStockForm(){
    this.router.navigateByUrl("/stocks/new-form")
  }

  ngOnInit(): void {
    this.service.get().subscribe()
    this.stocks$ = this.query.selectAll()
  }

}
