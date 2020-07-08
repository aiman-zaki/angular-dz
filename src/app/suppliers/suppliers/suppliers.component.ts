import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TableColumn, TableButton, TableColumnDateFormat, TableColumnSearch } from 'src/app/shared/table/table.model';
import { faEye,faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  columns: TableColumn[] = [];
  buttons: TableButton[] = []
  formats: TableColumnDateFormat[] = []

  tableClass = '.fixed-table'
  search: TableColumnSearch[] = []
  searchSubject$:BehaviorSubject<TableColumnSearch[]> = new BehaviorSubject([])
  lengthSubject$:BehaviorSubject<number> = new BehaviorSubject(5)
  page:number = 5

  url: string = '/api/suppliers/dtlist/5';
  constructor() { }

  onButtonHandler(event){

  }


  onPerPage(event:any){
    this.lengthSubject$.next(this.page)

  }

  onDataTableInit(){
    this.search = [
      {
        colIndex:1,
        searchParam:""
      },
      {
        colIndex:2,
        searchParam:""
      }
    ]
    this.formats = [
      {
        column:4,
        format:'dd/MM/yyyy'
      }
    ]

    this.buttons = [
      {
        buttonClass:"btn btn-primary btn-sm m-1",
        icon:faEye,
      },
      {
        buttonClass:"btn btn-danger btn-sm m-1",
        icon:faTrash,
      },
      {
        buttonClass:"btn btn-info btn-sm m-1",
        icon:faEdit,
      }
    ]
    this.columns = [
      {
        data: 'id',
        name: '',
        searchable: true,
        orderable: false,
        search: {
          value: '',
          regex: true,
        },
        index: 'id',
        customStyle:'text-align:center;width:300px;font-size:14px',
        customHeaderText: 'Actions'
      },
      {
        data: 'company',
        name: '',
        searchable: true,
        orderable: true,
        search: {
          value: '',
          regex: true,
        },
        index: 'shift',
        customStyle:'width:500px;font-size:14px',
      },
      {
        data: 'person_in_charge',
        name: '',
        searchable: true,
        orderable: true,
        search: {
          value: '',
          regex: true,
        },
        index: 'value',
        customStyle:"font-size:14px"
      },
      {
        data: 'email',
        name: '',
        searchable: true,
        orderable: true,
        search: {
          value: '',
          regex: true,
        },
        index: 'value',
        customStyle:"font-size:14px"
      },
      {
        data: 'phone_no',
        name: '',
        searchable: true,
        orderable: true,
        search: {
          value: '',
          regex: true,
        },
        index: 'value',
        customStyle:"font-size:14px"
      },
    ];
  }

  ngOnInit(): void {
    this.onDataTableInit()
  }

}
