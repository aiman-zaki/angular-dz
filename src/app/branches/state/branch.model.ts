export interface Branch {
  id: number ;
  branch: string,
  address: string,
  date_created:Date,
  date_updated:Date,
}

export function createBranch(params: Partial<Branch>) {
  return {

  } as Branch;
}
