
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
  expenses?:number,
  collection?:number,
  stock_products?:StockProduct[],
  date_created: Date,
  date_updated: Date,
}
