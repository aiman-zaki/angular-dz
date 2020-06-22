import { ShiftWorksComponent } from './shift-works/shift-works.component';
import { UsersComponent } from './users/users.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:"master-data/users",component:UsersComponent},
  {path:"master-data/shift-works",component:ShiftWorksComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule { }
