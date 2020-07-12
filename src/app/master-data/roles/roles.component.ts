import { RolesService } from './state/roles.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit,ViewChild } from '@angular/core';
import { TableColumn, TableButton, TableColumnDateFormat, TableColumnSearch } from 'src/app/shared/table/table.model';
import { faEye,faTrash,faEdit,faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  @ViewChild('modal') modal : any;

  faPlusCircle = faPlusCircle
  buttonIndex = 0
  form:FormGroup
  columns: TableColumn[] = [];
  buttons: TableButton[] = []
  formats: TableColumnDateFormat[] = []
  tableClass = '.fixed-table'
  search: TableColumnSearch[] = []
  searchSubject$:BehaviorSubject<TableColumnSearch[]> = new BehaviorSubject([])
  lengthSubject$:BehaviorSubject<number> = new BehaviorSubject(5)
  page:number = 5

  url: string = '/api/roles/dtlist/3';
  constructor(private modalService:NgbModal,private service:RolesService,private formBuilder:FormBuilder) { }

  onSubmit(formValue){
    if(this.buttonIndex == 4){
      this.service.add(formValue)
    }
    if(this.buttonIndex == 2){
      this.service.update(formValue.id,formValue).subscribe(res => {
        this.modalService.dismissAll()
        this.onDataTableInit()
      })
    }
  }

  onPerPage(event:any){
    this.lengthSubject$.next(this.page)

  }

  onButtonHandler(event:any){
    this.buttonIndex = event.index
    if(event.index == 4){
      this.modalService.open(this.modal)
    }
    if(event.index == 0){
      this.service.get(event.id).subscribe(res => {
        this.form = this.formBuilder.group(res)
      })
      this.modalService.open(this.modal)

    }
    if(event.index == 2){
      this.service.get(event.id).subscribe(res => {
        this.form = this.formBuilder.group(res)

      })
      this.modalService.open(this.modal)

    }
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
        data: 'key',
        name: 'Key',
        searchable: true,
        orderable: true,
        search: {
          value: '',
          regex: true,
        },
        index: 'key',
        customStyle:'width:500px;font-size:14px',
      },
      {
        data: 'text',
        name: 'Text',
        searchable: true,
        orderable: true,
        search: {
          value: '',
          regex: true,
        },
        index: 'text',
        customStyle:"font-size:14px"
      },

    ];
  }

  ngOnInit(): void {
    this.onDataTableInit()
    this.form = this.formBuilder.group({
      id:"",
      key:"",
      text:""
    })
  }

}
