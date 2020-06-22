import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { ToastComponent } from './toast/toast.component';
import { ToastService } from './toast/toast.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    HeaderComponent,
    ToastComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RouterModule
  ],
  providers: [ToastService],
  bootstrap: [],
  exports: [
    HeaderComponent,
    ToastComponent
  ]
})
export class SharedModule { }
