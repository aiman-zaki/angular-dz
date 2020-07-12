import { ToastService } from 'src/app/shared/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder,FormArray } from '@angular/forms';
import { RecordForm, StockProduct, Expenses } from './stock-form.model';
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
import Swal from 'sweetalert2'

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

  recordForm:FormGroup

  entity:RecordForm = {
    record:{},
    stock_products:[]
  }

  prevEntity:RecordForm = {

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
    this.entity.financial = {

    }
  }
  onAddExpenses(){
    this.expensesList.push({
      amount:0,
      reason:"",
    })
  }
  onTotalNetProfit(profit:number){
    this.totalProfit += profit
    return this.totalProfit
  }
  onDelete(){
    Swal.fire({
      title: `Are you sure want to Delete`,
      icon: 'info',
      text:`Branch ID : ${this.id}`,
      showCancelButton: true,
      cancelButtonText: `Back to listing`,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.value) {
        this.service.remove(this.id).subscribe(res => {
          this.router.navigateByUrl("/stocks")
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })

  }
  onDateChange($event){
    this.isPrevRecordExistSubject$.next(false)
    this.entity.record.shift_work_id = null
  }

  onBranchChange($event){
    this.isPrevRecordExistSubject$.next(false)
    this.entity.record.shift_work_id = null
  }
  onShiftWorkChange($event){
    if(this.entity.record.branch_id !== undefined){
      this.onGetPrevRecord()
    }

  }
  onGetPrevStock(productId:number,entity:RecordForm){
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
  onSave(entity:RecordForm){
    entity.expenses = this.expensesList
    if(!this.id){
      this.service.add(entity).subscribe(res => {
        this.toastService.showSuccessMessage("Stock Inserted")
        this.router.navigateByUrl("/stocks")
      })
    } else {
      this.service.update(entity).subscribe(res => {

      })
    }
  }
  onGetPrevRecord(){
    let prevDate = cloneDeep(this.entity.record.date)
    prevDate.setDate(prevDate.getDate()-1)
    this.service.getStockProducstFilter(prevDate.toISOString(),this.entity.record.branch_id,this.entity.record.shift_work_id).
      subscribe(res => {
        if (res.stock_products == null ){
          this.isPrevRecordExistSubject$.next(false)
          this.toastService.showErrorMessage("No previous day Records found")
        } else {
          this.isPrevRecordExistSubject$.next(true)
          this.prevEntity = res
          this.prevEntity.record.date = new Date(res.record.date)
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
      this.productService.get<Product[]>(),
      this.usersService.get(),
      this.shiftWorksService.get(),
      this.branchService.get(),
    ]).subscribe(([products,stock]) => {
      let stockProducts:StockProduct[] = []
      this.entity.stock_products = stockProducts
      this.showProducts = true
      this.entity.record.date = new Date()

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
          this.expensesList = this.entity.expenses
          this.entity.record.date = new Date(entity.record.date)
          this.isUpdate = true
          this.onReturnProduct(this.entity.stock_products[0].product_id)
          this.onGetPrevRecord()
        })
      }

    })


  }

}
