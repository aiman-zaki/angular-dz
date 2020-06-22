import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchesRoutingModule } from './branches-routing.module';
import { BranchesComponent } from './branches/branches.component';
import { BranchesService } from './state/branches.service'

@NgModule({
  declarations: [BranchesComponent],
  imports: [
    CommonModule,
    BranchesRoutingModule,
  ],
  providers:[

  ]
})
export class BranchesModule { }
