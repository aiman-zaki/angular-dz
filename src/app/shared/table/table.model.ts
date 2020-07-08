import { IconDefinition } from '@fortawesome/fontawesome-svg-core';


export interface TableColumnSearch{
  colIndex:number,
  searchParam:string
}

export interface TableColumnDateFormat{
  column:number
  format:string
}


export interface TableButton{
  icon?:IconDefinition
  text?:string,
  buttonClass?:string,
}


export interface TableResponse {
  draw?: number;
  recordsTotal?: number;
  recordsFiltered?: number;
  data?: [];
  error?: string;
}

export interface OrderColumn {
  column: number;
  dir: string;
}

export interface TableColumn {
  data: string;
  name: string;
  searchable: boolean;
  orderable: boolean;
  search: {
    value: string;
    regex: boolean;
  };
  index: string;
  /*
    Frontend only
  */
  customStyle?: string;
  customHeaderText?:string | null;
  /*
    Pass true if the column is object
    {
      fullName:"aiman"
      lastName:"zaki"
    }
  */
  isObject?:boolean
  /*
    Pass the object key that need to be displays
    fullName
  */
  objectKey?:'string'
}

export interface TableRequest {
  draw: number;
  start: number;
  length: number;
  search: {
    value: string;
    regex: boolean;
  };
  columns: TableColumn[];
  order: OrderColumn[];
}

/*
  Used to auto generate the keys in object into url query

*/
export class Table implements TableRequest {
  draw: number;
  start: number;
  length: number;
  search: { value: string; regex: boolean };
  columns: TableColumn[];
  order: OrderColumn[];

  constructor() {
    this.draw = 0;
    this.start = 0;
    this.length = 0;
    this.search = { value: '', regex: false };
    this.columns = [
      {
        data: null,
        name: null,
        searchable: false,
        orderable: false,
        search: null,
        index: null,
      },
    ];
    /*
      By default , the 2nd column will be sorted
    */
    this.order = [
      {
        column: 1,
        dir: 'asc',
      },
    ];
  }

  tableToQuery(): string {
    let base = '';
    base = `draw=${this.draw}&`;
    base = base + this.columnsToQuery();
    base = base + this.orderToQuery();
    base =
      base +
      `start=${this.start}&length=${this.length}&search.value=${this.search.value}&search.regex=${this.search.regex}`;
    return encodeURI((base /*= base + '&_=1592835260467'*/));
  }

  orderToQuery(): string {
    let base = '';
    let index = 0;
    this.order.map((order) => {
      for (let key in order) {
        let columnString = `order[${index}].`;
        base = base + columnString + key + `=${order[key]}&`;
      }
      index++;
    });
    return base;
  }

  columnsToQuery(): string {
    let base = '';
    let index = 0;
    this.columns.map((column) => {
      let columnBase = '';
      for (let key in column) {
        let columnString = `columns[${index}].`;
        if (typeof column[key] === 'object') {
          for (let key2 in column[key]) {
              columnBase += columnString + key + `.${key2}=${column[key][key2]}&`;
          }
        } else {
          if(key != "customStyle"){
            columnBase = columnBase + columnString + key + `=${column[key]}&`;
          }
        }
      }
      index++;
      base += columnBase;
    });
    return base;
  }
}
