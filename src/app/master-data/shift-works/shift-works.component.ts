import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ShiftWorksQuery } from './state/shift-works.query';
import { ShiftWorksService } from './state/shift-works.service';
import { ShiftWork } from './state/shift-work.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-shift-works',
  templateUrl: './shift-works.component.html',
  styleUrls: ['./shift-works.component.scss']
})
export class ShiftWorksComponent implements OnInit {
  shiftWormForm:FormGroup
  shiftWorks$:Observable<ShiftWork[]>


  constructor(
    private service:ShiftWorksService,
    private query:ShiftWorksQuery,
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
  ) {
    this.shiftWormForm = this.formBuilder.group({
      "key":"UPPER_CASE",
      "shift":""
    })

  }

  onSubmit(formValue){
    this.service.create({
      shift:formValue.shift,
      date_created:new Date(),
      date_updated:new Date(),
    }).subscribe()
  }

  onOpenFormModal(modal){
    this.modalService.open(modal)
  }

  ngOnInit(): void {
    this.service.get().subscribe()
    this.shiftWorks$ = this.query.selectAll()

  }

}
