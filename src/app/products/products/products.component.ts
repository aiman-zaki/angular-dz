import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductsQuery } from './../state/products.query';
import { ProductsService } from './../state/products.service';
import { Product } from './../state/product.model';
import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})


export class ProductsComponent implements OnInit {
  productForm: FormGroup
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  constructor(private service:ProductsService,private query:ProductsQuery,private modalService: NgbModal,private formBuilder:FormBuilder) {


  }

  onSubmit(formValue,modal){
    this.service.add({
      product:formValue.product,
      cost_price:formValue.cost_price,
      sale_price:formValue.sale_price,
    }).subscribe(res => {
      console.log(res)
      modal.close()
    })

  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size:'lg'}).result.then((result) => {
    }, (reason) => {
    });
  }

  ngOnInit(): void {
    this.service.get().subscribe()
    this.loading$ = this.query.selectLoading()
    this.products$ = this.query.selectAll()

    this.productForm = this.formBuilder.group({
      "product":"",
      "cost_price":0,
      "sell_price":0,
    })
  }

}
