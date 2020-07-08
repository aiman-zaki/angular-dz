export interface Expenses{
  expenses?:number,
  reason?:string,
}
export interface StockProduct{
  product_id?:number ,
  stock_in?:number,
  stock_balance?:number
}

export interface StockFormModel {
  stock_date?:Date,
  branch_id?:number,
  user_id?:number,
  shift_work_id?:number,
  financial?:{
    collection?:number,
    expenses?:Expenses[]
  },
  stock_products?:StockProduct[],
  date_created: Date,
  date_updated: Date,
}
