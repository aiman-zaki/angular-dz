import { ToastService } from 'src/app/shared/toast/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuppliersService } from './../state/suppliers.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit,ViewChild } from '@angular/core';
import { TableColumn, TableButton, TableColumnDateFormat, TableColumnSearch } from 'src/app/shared/table/table.model';
import { faEye,faTrash,faEdit,faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  @ViewChild('modal') modal : any;
  faPlusCircle = faPlusCircle
  columns: TableColumn[] = [];
  buttons: TableButton[] = []
  formats: TableColumnDateFormat[] = []

  tableClass = '.fixed-table'
  search: TableColumnSearch[] = []
  searchSubject$:BehaviorSubject<TableColumnSearch[]> = new BehaviorSubject([])
  lengthSubject$:BehaviorSubject<number> = new BehaviorSubject(5)
  page:number = 5
  id:string

  url: string = '/api/suppliers/dtlist/5';
  constructor(private service:SuppliersService,private formBuilder:FormBuilder,private modalService:NgbModal,private toastService:ToastService) {
    this.form = this.formBuilder.group({
      company:"",
      person_in_charge:"",
      email:"",
      address:"",
      phone_no:"",
    })

  }
  buttonIndex:number = 0
  form:FormGroup
  onButtonHandler(event:any){
    this.id = event.id
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
    if (event.index == 1) {
      Swal.fire({
        title: `Are you sure want to Delete`,
        icon: 'info',
        text:`Branch ID : ${event.id}`,
        showCancelButton: true,
        cancelButtonText: `Back to listing`,
        confirmButtonText: 'Delete',
      }).then((result) => {
        if (result.value) {
          this.service.delete(event.id).subscribe(res => {
            this.searchSubject$.next(this.search)
          })
        } else if (result.dismiss === Swal.DismissReason.cancel) {

        }
      })
    }
    if(event.index == 2){
      this.service.get(event.id).subscribe(res => {
        this.form = this.formBuilder.group(res)

      })
      this.modalService.open(this.modal)

    }
  }


  onPerPage(event:any){
    this.lengthSubject$.next(this.page)

  }

  onSubmit(formValue){
    if(this.buttonIndex == 4){
      this.service.add(formValue).subscribe(res => {
        this.searchSubject$.next(this.search)
        this.modalService.dismissAll()
        this.toastService.showSuccessMessage(`Suppliers ${formValue.branch} Created`)

      })
    }
    if(this.buttonIndex == 2){
      this.service.update(this.id,formValue).subscribe(res => {
        this.searchSubject$.next(this.search)
        this.modalService.dismissAll()
        this.toastService.showSuccessMessage(`Suppliers ${formValue.branch} Updated`)

      })
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
        name: 'Company',
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
        name: 'Person In Charge',
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
        name: 'Email',
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
        name: 'Phone No',
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
        data: 'date_created',
        name: 'Date Created',
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
        data: 'date_updated',
        name: 'Date Updated',
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
