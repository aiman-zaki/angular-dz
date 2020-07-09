import { User } from 'src/app/master-data/users/state/user.model';
import { ShiftWork } from './../../master-data/shift-works/state/shift-work.model';
import { Branch } from 'src/app/branches/state/branch.model';
export interface Expenses{
  expenses?:number,
  reason?:string,
}
export interface StockProduct{
  stock_id?:number,
  product_id?:number ,
  stock_in?:number,
  stock_balance?:number
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
}
