import { User } from 'src/app/master-data/users/state/user.model';
import { ShiftWork } from './../../master-data/shift-works/state/shift-work.model';
import { Branch } from 'src/app/branches/state/branch.model';
export interface Expenses{
  financial_id?:string,
  amount?:number,
  reason?:string,
  date_created?:Date,
  date_updated?:Date,
}
export interface StockProduct{
  stock_id?:number,
  product_id?:string ,
  stock_in?:number,
  stock_balance?:number
}

export interface Financial{
  id?:string
  record_id?:string,
  collection?:number,
  date_created?:Date,
  date_updated?:Date
}

export interface Record {
  id?:string,
  date?:Date,
  branch_id?:number,
  branch?:Branch,
  shift_work_id?:number,
  shift_work?:ShiftWork,
  user_id?:number,
  user?:User

}
export interface RecordForm {
  record?:Record
  stock_products?:StockProduct[]
  financial?:Financial
  expenses?:Expenses[]
}
