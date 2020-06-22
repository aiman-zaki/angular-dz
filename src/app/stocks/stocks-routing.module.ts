import { StockFormComponent } from './stock-form/stock-form.component';
import { StocksComponent } from './stocks/stocks.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:"stocks",component:StocksComponent},
  {path:"stocks/new-form",component:StockFormComponent},
  {path:"stocks/details/:id",component:StockFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule { }
