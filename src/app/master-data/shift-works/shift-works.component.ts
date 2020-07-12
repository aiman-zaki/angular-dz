import { ToastService } from 'src/app/shared/toast/toast.service';
import { faEye,faTrash,faEdit,faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ShiftWorksQuery } from './state/shift-works.query';
import { ShiftWorksService } from './state/shift-works.service';
import { ShiftWork } from './state/shift-work.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { Component, OnInit,ViewChild } from '@angular/core';
import { TableColumn, TableButton, TableColumnDateFormat, TableColumnSearch } from 'src/app/shared/table/table.model';
import Swal from 'sweetalert2'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shift-works',
  templateUrl: './shift-works.component.html',
  styleUrls: ['./shift-works.component.scss']
})
export class ShiftWorksComponent implements OnInit {
  @ViewChild('modal') modal : any;

  shiftWormForm:FormGroup
  shiftWorks$:Observable<ShiftWork[]>

  columns: TableColumn[] = [];
  buttons: TableButton[] = []
  formats: TableColumnDateFormat[] = []

  tableClass = '.fixed-table'
  search: TableColumnSearch[] = []
  searchSubject$:BehaviorSubject<TableColumnSearch[]> = new BehaviorSubject([])
  lengthSubject$:BehaviorSubject<number> = new BehaviorSubject(5)
  page:number = 5

  form:FormGroup
  buttonIndex = 0

  url: string = `${environment.serverUrl}/master-data/shift-works/dtlist/4`;
  faPlusCircle = faPlusCircle
  constructor(
    private service:ShiftWorksService,
    private query:ShiftWorksQuery,
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private toastService:ToastService
  ) {
    this.form = this.formBuilder.group({
      shift:"",
    })

  }

  onSubmit(formValue){
    if(this.buttonIndex == 4){
      this.service.add(formValue).subscribe(res => {
        this.modalService.dismissAll()
        this.searchSubject$.next(this.search)
        this.toastService.showSuccessMessage(`Shift ${formValue.branch} Created`)

      })
    }
    if(this.buttonIndex == 2){
      this.service.update(formValue.id,formValue).subscribe(res => {
        this.modalService.dismissAll()
        this.searchSubject$.next(this.search)
        this.toastService.showSuccessMessage(`Shift ${formValue.branch} Updated`)
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
        shift:""
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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size:'lg'}).result.then((result) => {
    }, (reason) => {
    });
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
        data: 'shift',
        name: 'Shift',
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



  onOpenFormModal(modal){
    this.modalService.open(modal)
  }

  ngOnInit(): void {
    this.onDataTableInit()
    //this.service.get().subscribe()
    //this.shiftWorks$ = this.query.selectAll()

  }

}
