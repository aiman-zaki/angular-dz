import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationsRoutingModule } from './master-data-routing.module';
import { StockTypesComponent } from './stock-types/stock-types.component';
import { UsersComponent } from './users/users.component';
import { ShiftWorksComponent } from './shift-works/shift-works.component';


@NgModule({
  declarations: [StockTypesComponent, UsersComponent, ShiftWorksComponent],
  imports: [
    CommonModule,
    ConfigurationsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ConfigurationsModule { }
