export interface Product {
  id?: string ;
  product?: string;
  cost_price?: number
  sale_price?: number
  date_created?:string;
  date_updated?:string
}

export function createProduct(params: Partial<Product>) {
  return {

  } as Product;
}
