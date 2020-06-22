export interface StockType {
  id: number ;
  key: string
  type: string
  date_created:Date
  date_updated:Date
}

export function createStockType(params: Partial<StockType>) {
  return {

  } as StockType;
}
