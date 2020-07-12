import { ToastService } from 'src/app/shared/toast/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { UsersQuery } from './state/users.query';
import { UsersService } from './state/users.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { User } from './state/user.model';
import { TableColumn, TableButton, TableColumnDateFormat, TableColumnSearch } from 'src/app/shared/table/table.model';
import { faEye, faTrash, faEdit,faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('modal') modal : any;

  faPlusCircle = faPlusCircle
  users$:Observable<User[]>
  columns: TableColumn[] = [];
  buttons: TableButton[] = []
  formats: TableColumnDateFormat[] = []

  tableClass = '.fixed-table'
  search: TableColumnSearch[] = []
  searchSubject$:BehaviorSubject<TableColumnSearch[]> = new BehaviorSubject([])
  lengthSubject$:BehaviorSubject<number> = new BehaviorSubject(5)
  buttonIndex:number = 0
  page:number = 5
  url: string = `${environment.serverUrl}/users/dtlist/6`;
  form:FormGroup
  constructor(private service:UsersService,private query:UsersQuery,private formBuilder:FormBuilder,private modalService:NgbModal,private toastService:ToastService) { }

  ngOnInit(): void {
    this.service.get().subscribe()
    this.users$ = this.query.selectAll()
    this.onDataTableInit()
    this.form = this.formBuilder.group({
      first_name:"",
      last_name:"",
      salary:"",
    })

  }
  onSubmit(formValue){
    if(this.buttonIndex == 4){
      this.service.add(formValue).subscribe(res => {
        this.modalService.dismissAll()
        this.searchSubject$.next(this.search)
        this.toastService.showSuccessMessage(`Users ${formValue.branch} Created`)

      })
    }
    if(this.buttonIndex == 2){
      this.service.update(formValue.id,formValue).subscribe(res => {
        this.modalService.dismissAll()
        this.searchSubject$.next(this.search)
        this.toastService.showSuccessMessage(`Users ${formValue.branch} Updated`)

      })
    }
  }

  onPerPage(event:any){
    this.lengthSubject$.next(this.page)

  }

  onButtonHandler(event:any){
    this.buttonIndex = event.index
    if(event.index == 4){
      this.form = this.formBuilder.group({
        first_name:"",
        last_name:"",
        salary:0,
      })
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
        name: 'ID',
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
        data: 'first_name',
        name: 'First Name',
        searchable: true,
        orderable: true,
        search: {
          value: '',
          regex: true,
        },
        index: 'product',
        customStyle:'width:500px;font-size:14px',
      },
      {
        data: 'last_name',
        name: 'Last Name',
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
        data: 'salary',
        name: 'Salary',
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
}
