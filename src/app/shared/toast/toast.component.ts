import { Observable } from 'rxjs';
import { Toast } from './toast.model';
import { ToastService } from './toast.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  toasts$:Observable<Toast[]>

  constructor(public service:ToastService) {
    this.toasts$ = this.service.toasts$
  }

  onRemove(toast:Toast){
    this.service.remove(toast)
  }

  ngOnInit(): void {
  }

}
