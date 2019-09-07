import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ShoppingCartComponent } from 'app/shopping-cart/shopping-cart.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ShoppingCartSummaryComponent } from 'app/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from 'app/shipping-form/shipping-form.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  imports: [
    SharedModule,

    RouterModule.forChild([
      {path:'products',component:ProductsComponent},
      {path:'shopping-cart',component:ShoppingCartComponent},
      {path:'check-out',component:CheckOutComponent ,canActivate:[AuthGuardService]},
      {path:'order-success/:id',component:OrderSuccessComponent,canActivate:[AuthGuardService]},
      {path:'my/orders',component:MyOrdersComponent,canActivate:[AuthGuardService]},
    ])
  ],
  declarations: [
    ShoppingCartComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  exports:[
    ShoppingCartComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ]
})
export class ShoppingModule { 

}
