import { ToastService } from 'src/app/shared/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder,FormArray } from '@angular/forms';
import { StockFormModel, StockProduct, Expenses } from './stock-form.model';
import { ShiftWorksService } from './../../master-data/shift-works/state/shift-works.service';
import { ShiftWorksQuery } from './../../master-data/shift-works/state/shift-works.query';
import { UsersQuery } from './../../master-data/users/state/users.query';
import { UsersService } from './../../master-data/users/state/users.service';
import { StockTypesQuery } from '../../master-data/stock-types/state/stock-types.query';
import { StockTypesService } from '../../master-data/stock-types/state/stock-types.service';
import { StocksService } from './../state/stocks.service';
import { ProductsService } from './../../products/state/products.service';
import { ProductsQuery } from './../../products/state/products.query';
import { Observable, forkJoin, combineLatest, BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { faCalendar,faArrowLeft,faSave,faTrash,faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { Product } from 'src/app/products/state/product.model';
import { Branch } from 'src/app/branches/state/branch.model';
import { BranchesQuery } from 'src/app/branches/state/branches.query';
import { BranchesService } from 'src/app/branches/state/branches.service';
import { StockType } from 'src/app/master-data/stock-types/state/stock-type.model';
import { User } from 'src/app/master-data/users/state/user.model';
import { ShiftWork } from 'src/app/master-data/shift-works/state/shift-work.model';
import { take } from 'rxjs/operators'
import { DecimalPipe, DatePipe } from '@angular/common';

import { cloneDeep } from 'lodash'
@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.scss']
})
export class StockFormComponent implements OnInit {
  faCalender = faCalendar
  faArrowLeft = faArrowLeft
  faSave = faSave
  faTrash = faTrash
  faPlus= faPlusCircle
  products$:Observable<Product[]>
  branch$:Observable<Branch[]>
  stockTypes$:Observable<StockType[]>
  users$:Observable<User[]>
  shift$:Observable<ShiftWork[]>

  stockForm:FormGroup

  entity:StockFormModel = {
    date_created: new Date(),
    date_updated: new Date(),
  }

  prevEntity:StockFormModel = {
    date_created: new Date(),
    date_updated: new Date(),
  }

  showProducts:boolean
  datePipeEn: DatePipe = new DatePipe('en-US');
  isUpdate:boolean = false
  isPrevRecordExistSubject$:BehaviorSubject<boolean> = new BehaviorSubject(false)
  isPrevRecordExist$:Observable<boolean> = this.isPrevRecordExistSubject$.asObservable()
  id:string

  expensesList:Expenses[] = []

  totalProfit:number = 0
  constructor(
    private service:StocksService,
    private productsQuery:ProductsQuery,
    private branchesQuery:BranchesQuery,
    private stockTypesQuery:StockTypesQuery,
    private usersQuery:UsersQuery,
    private shiftWorksQuery:ShiftWorksQuery,
    private productService:ProductsService,
    private branchService:BranchesService,
    private stockTypeService:StockTypesService,
    private usersService:UsersService,
    private shiftWorksService:ShiftWorksService,
    private formBuiler:FormBuilder,
    private route:ActivatedRoute,
    private router:Router,
    private toastService:ToastService,

  ) {
    this.showProducts = false
  }

  onAddExpenses(){
    this.expensesList.push({
      expenses:0,
      reason:"",
    })
  }

  onTotalNetProfit(profit:number){
    this.totalProfit += profit
    return profit
  }

  onDelete(){
    this.service.remove(this.id).subscribe(res => {
      this.router.navigateByUrl("/stocks")
    })
  }

  onDateChange($event){
    console.log($event)
    this.entity.branch_id = null
  }

  onBranchChange($event){
    console.log($event)
    if(this.entity.branch_id !== undefined){
      this.onGetPrevRecord()
    }
  }

  onGetPrevStock(productId:number,entity:StockFormModel){
    let prev = entity.stock_products.find(prev => {
      if(prev.product_id == productId){
        return true
      }
      return false
    })

  }

  onReturnProduct(productId){
    return this.productsQuery.selectEntity(productId)
  }


  onSave(entity){
      this.service.add(entity).subscribe(res => {
        this.toastService.showSuccessMessage("Stock Inserted")
        this.router.navigateByUrl("/stocks")
      })

  }

  onGetPrevRecord(){
    let prevDate = cloneDeep(this.entity.stock_date)
    prevDate.setDate(prevDate.getDate()-1)
    //Need to fix backend wih error
    this.service.getStockProducstFilter(prevDate.toISOString(),this.entity.branch_id).
      subscribe(res => {
        if (res.stock_products == null ){
          this.isPrevRecordExistSubject$.next(false)
          this.toastService.showErrorMessage("No previous day Records found")
        } else {
          this.isPrevRecordExistSubject$.next(true)
          this.prevEntity = res
          this.prevEntity.stock_date = new Date(res.stock_date)
          this.toastService.showSuccessMessage("Previous day Records found")
        }
      })
  }

  ngOnInit(): void {

    this.products$ = this.productsQuery.selectAll()
    this.branch$ = this.branchesQuery.selectAll()
    this.users$ = this.usersQuery.selectAll()
    this.shift$ = this.shiftWorksQuery.selectAll()

    forkJoin([
      this.productService.get(),
      this.usersService.get(),
      this.shiftWorksService.get(),
      this.branchService.get(),
    ]).subscribe(([products,stock]) => {
      let stockProducts:StockProduct[] = []

      this.entity.stock_products = stockProducts
      this.showProducts = true
      this.entity.stock_date = new Date()

      for(let i=0 ; i<products.length;i++){
        this.entity.stock_products.push({
          product_id:products[i].id,
          stock_balance:0,
          stock_in:0,

        })
      }

      this.id = this.route.snapshot.params["id"]
      if (this.id !== undefined){
        this.service.getStockProducts(this.id).subscribe(entity => {
          this.entity = entity
          this.entity.stock_date = new Date(entity.stock_date)
          this.isUpdate = true
          //this.onReturnProduct(this.entity.stock_products[0].product_id)
          this.onGetPrevRecord()
        })
      }

    })


  }

}
