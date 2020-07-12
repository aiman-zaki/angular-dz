import { ToastService } from 'src/app/shared/toast/toast.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductsQuery } from './../state/products.query';
import { ProductsService } from './../state/products.service';
import { Product } from './../state/product.model';
import { Component, OnInit,ViewChild } from '@angular/core';
import {Observable,BehaviorSubject} from 'rxjs'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { TableColumn, TableButton, TableColumnDateFormat, TableColumnSearch } from 'src/app/shared/table/table.model';
import { faEye, faTrash, faEdit, faSearch,faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})


export class ProductsComponent implements OnInit {

  @ViewChild('modal') modal : any;

  faSearch = faSearch
  faPlusCircle = faPlusCircle
  productForm: FormGroup
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;

  columns: TableColumn[] = [];
  buttons: TableButton[] = []
  formats: TableColumnDateFormat[] = []

  tableClass = '.fixed-table'
  search: TableColumnSearch[] = []
  searchSubject$:BehaviorSubject<TableColumnSearch[]> = new BehaviorSubject([])
  lengthSubject$:BehaviorSubject<number> = new BehaviorSubject(5)
  page:number = 5
  entity:Product

  buttonIndex = 0
  id:string = ""

  url: string = `${environment.serverUrl}/products/dtlist/6`;
  constructor(
    private service:ProductsService,
    private query:ProductsQuery,
    private modalService: NgbModal,
    private formBuilder:FormBuilder,
    private toastService:ToastService) {
  }

  onSearch() {
    this.searchSubject$.next(this.search);
  }

  onPerPage(event:any){
    this.lengthSubject$.next(this.page)
  }
  onButtonHandler(event:any){
    this.id = event.id
    this.buttonIndex = event.index
    if(event.index == 4){
      this.entity = {}
      this.modalService.open(this.modal)
    }
    if(event.index == 0){
      this.service.getById(event.id).subscribe(res => {
        this.productForm = this.formBuilder.group(res)
      })
      this.modalService.open(this.modal)

    }
    if(event.index == 2){
      this.service.getById(event.id).subscribe(res => {
        this.productForm = this.formBuilder.group(res)

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
  onSubmit(formValue){
    if(this.buttonIndex == 4){
      this.service.add({
        product:formValue.product,
        cost_price:formValue.cost_price,
        sale_price:formValue.sale_price,
      }).subscribe(res => {
        this.searchSubject$.next(this.search)
        this.modalService.dismissAll()
        this.toastService.showSuccessMessage(`Products ${formValue.branch} Created`)

      })
    }
    if(this.buttonIndex == 2){
      this.service.update(this.id,formValue).subscribe(res => {
        this.searchSubject$.next(this.search)
        this.modalService.dismissAll()
        this.toastService.showSuccessMessage(`Products ${formValue.branch} Updated`)

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
        format:'dd/MM/yyyy hh:mm:ss'
      },
      {
        column:5,
        format:'dd/MM/yyyy hh:mm:ss'
      },
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
        data: 'product',
        name: 'Product',
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
        data: 'cost_price',
        name: 'Cost Price',
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
        data: 'sale_price',
        name: 'Sale Price',
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
    this.service.get().subscribe()
    this.loading$ = this.query.selectLoading()
    this.products$ = this.query.selectAll()

    this.productForm = this.formBuilder.group({
      "product":"",
      "cost_price":0,
      "sale_price":0,
    })
  }

}
