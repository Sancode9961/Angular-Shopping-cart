import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { SharedModule } from 'shared/shared.module';

import { environment } from '../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';

//import { NgbModule } from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    AppComponent,
 

    // ProductsComponent,
    // ShoppingCartComponent,
    // CheckOutComponent,
    // OrderSuccessComponent,
    // MyOrdersComponent,
    // ProductFilterComponent,
    // ShippingFormComponent,
    // ShoppingCartSummaryComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,

    AngularFireModule.initializeApp(environment.firebase),
    
    //NgbModule.forRoot(),
  
    RouterModule.forRoot([
      //routes for anonymous users
      {path:'',component:ProductsComponent},
      {path:'login',component:LoginComponent},
      
      // {path:'products',component:ProductsComponent},
      // {path:'shopping-cart',component:ShoppingCartComponent},
    

      // //routes for normal users
      // {path:'check-out',component:CheckOutComponent ,canActivate:[AuthGuardService]},
      // {path:'order-success/:id',component:OrderSuccessComponent,canActivate:[AuthGuardService]},
      // {path:'my/orders',component:MyOrdersComponent,canActivate:[AuthGuardService]},

      //routes for admin users
      
    ])
    
  ],
  providers: [
    
    

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
