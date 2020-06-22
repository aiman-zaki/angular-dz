import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SuppliersService } from './state/suppliers.service';


@NgModule({
  declarations: [SuppliersComponent],
  imports: [
    CommonModule,
    SuppliersRoutingModule
  ],
  providers:[SuppliersService]
})
export class SuppliersModule { }
