

export interface User {
  id: number ;
  first_name: string
  last_name: string
  salary:number
  date_created:Date
  date_updated:Date
  role: {
    key:string
    text:string
  }
}


export function createUser(params: Partial<User>) {
  return {

  } as User;
}
