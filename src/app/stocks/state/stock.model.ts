import { ShiftWork } from 'src/app/master-data/shift-works/state/shift-work.model';
import { User } from './../../master-data/users/state/user.model';
import { Branch } from 'src/app/branches/state/branch.model';
export interface Stock {
  id: number ;
  stock_date: Date
  branch: Branch
  user:User
  shift_work:ShiftWork
  date_created:Date
  date_updated:Date

}

export function createStock(params: Partial<Stock>) {
  return {

  } as Stock;
}
