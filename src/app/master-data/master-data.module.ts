import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationsRoutingModule } from './master-data-routing.module';
import { StockTypesComponent } from './stock-types/stock-types.component';
import { UsersComponent } from './users/users.component';
import { ShiftWorksComponent } from './shift-works/shift-works.component';
import { RolesComponent } from './roles/roles.component';


@NgModule({
  declarations: [StockTypesComponent, UsersComponent, ShiftWorksComponent, RolesComponent],
  imports: [
    CommonModule,
    ConfigurationsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FontAwesomeModule
  ]
})
export class ConfigurationsModule { }
