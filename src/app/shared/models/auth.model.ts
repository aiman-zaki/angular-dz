import { GenericModel } from './generic.model';

export type AuthModel =  {
  id?:number,
  email?:string,
  password?:string,
  access_token?:string,
  refresh_token?:string,
  role_id?:string,
  role?:GenericModel
}


export function createProduct(params:Partial<AuthModel>){
  return {} as AuthModel;
}
