import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { Component, OnInit,ViewChild } from '@angular/core';
import { BranchesService } from '../state/branches.service';
import { BranchesQuery } from '../state/branches.query';
import { Branch } from '../state/branch.model';
import { TableColumn, TableButton, TableColumnDateFormat, TableColumnSearch } from 'src/app/shared/table/table.model';
import { faEye, faTrash, faEdit, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {
  faPlus = faPlusCircle
  @ViewChild('branchFormModal') branchFormModal : any;
  loading$:Observable<boolean>
  branches$:Observable<Branch[]>

  columns: TableColumn[] = [];
  buttons: TableButton[] = []
  formats: TableColumnDateFormat[] = []

  tableClass = '.fixed-table'
  search: TableColumnSearch[] = []
  searchSubject$:BehaviorSubject<TableColumnSearch[]> = new BehaviorSubject([])
  lengthSubject$:BehaviorSubject<number> = new BehaviorSubject(5)
  page:number = 5

  url: string = '/api/branches/dtlist/5';

  branchForm:FormGroup

  entity:Branch
  buttonIndex:number

  constructor(
    private service:BranchesService,
    private query:BranchesQuery,
    private route:ActivatedRoute,
    private router:Router,
    private modal:NgbModal,
    private formBuilder:FormBuilder
    ) { }

  onSubmit(value){
    this.entity.branch = value.branch
    this.entity.address = value.address

    if(this.buttonIndex == 2){
      this.service.update(this.entity).subscribe(res => {
        this.searchSubject$.next(this.search)
        this.modal.dismissAll()
      })
    }
    if(this.buttonIndex == 4){
      this.service.add(this.entity).subscribe(res => {
        this.searchSubject$.next(this.search)
        this.modal.dismissAll()
      })
    }
  }

  onButtonHandler(event){
    this.buttonIndex = event.index

    if(event.index == 0){
      this.modal.open(this.branchFormModal)
      this.service.getById(event.id).subscribe(res => {
        this.entity = res
      })
    }
    if(event.index == 2){
      this.modal.open(this.branchFormModal)
      this.service.getById(event.id).subscribe(res => {
        this.entity = res
      })
    }
    if(event.index == 4){
      this.entity = {
        id:0,
        branch:"",
        address:"",
        date_created:new Date(),
        date_updated: new Date(),
      }
      this.modal.open(this.branchFormModal)
    }
  }

  onNaviateToStock(branch:Branch){
    this.router.navigateByUrl(`/roles/${branch.id}`)
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
        data: 'branch',
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
        data: 'address',
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
        data: 'date_created',
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
        data: 'date_updated',
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
    this.service.get().subscribe()
    this.loading$ = this.query.selectLoading()
    this.branches$ = this.query.selectAll()

    this.branchForm = this.formBuilder.group({
      "branch":"",
      "address":"",
    })

  }

}
