import { ToastService } from 'src/app/shared/toast/toast.service';
import { UsersService } from './master-data/users/state/users.service';
import { StockTypesService } from './master-data/stock-types/state/stock-types.service';
import { ConfigurationsModule } from './master-data/master-data.module';
import { ProductsService } from './products/state/products.service';
import { StocksService } from './stocks/state/stocks.service';
import { HttpErrorInterceptor } from './interceptor/http-error.interceptor';
import { HttpTokenInterceptor } from './interceptor/http-token.interceptor';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { NgbModule,NgbDateAdapter,NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { SuppliersModule } from './suppliers/suppliers.module'
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './products/products.module';
import { BranchesModule} from './branches/branches.module'
import { CoreModule } from './core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BranchesService } from './branches/state/branches.service';
import { StocksModule } from './stocks/stocks.module'
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CoreModule,
    ProductsModule,
    SuppliersModule,
    BranchesModule,
    StocksModule,
    SharedModule,
    ConfigurationsModule,
    environment.production ? [] : AkitaNgDevtools,

  ],
  providers: [
    StocksService,
    ProductsService,
    BranchesService,
    StockTypesService,
    UsersService,
    ToastService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
