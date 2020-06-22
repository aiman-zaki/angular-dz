export interface ShiftWork {
  id?: number | string;
  shift?:string
  date_created?:Date,
  date_updated?:Date
}

export function createShiftWork(params: Partial<ShiftWork>) {
  return {

  } as ShiftWork;
}
