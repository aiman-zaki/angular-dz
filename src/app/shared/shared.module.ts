import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationComponent } from './table/pagination/pagination.component';
import { TableSortingDirective } from './table/table-sorting.directive';
import { TableComponent } from './table/table.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { ToastComponent } from './toast/toast.component';
import { ToastService } from './toast/toast.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HeaderComponent,
    ToastComponent,
    TableComponent,
    PaginationComponent,
    TableSortingDirective],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    FontAwesomeModule,

  ],
  providers: [ToastService],
  bootstrap: [],
  exports: [
    HeaderComponent,
    ToastComponent,
    TableComponent,
    PaginationComponent,
    TableSortingDirective
  ]
})
export class SharedModule { }
