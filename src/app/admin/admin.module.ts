import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product-form/product-form.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'shared/shared.module';
import { DataTableModule } from 'angular5-data-table';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from 'shared/services/auth-guard.service';

@NgModule({
  imports: [
   
    SharedModule,

    RouterModule.forChild([
      // {path:'admin/products/new',component:ProductFormComponent,canActivate:[AuthGuardService,AdminAuthGuardService]},
      // {path:'admin/products/:id',component:ProductFormComponent,canActivate:[AuthGuardService,AdminAuthGuardService]},
      // {path:'admin/products',component:AdminProductsComponent,canActivate:[AuthGuardService,AdminAuthGuardService]},
      // {path:'admin/orders',component:AdminOrdersComponent,canActivate:[AuthGuardService,AdminAuthGuardService]}
      {path:'admin/products/new',component:ProductFormComponent,canActivate:[AuthGuardService]},
      {path:'admin/products/:id',component:ProductFormComponent,canActivate:[AuthGuardService]},
      {path:'admin/products',component:AdminProductsComponent,canActivate:[AuthGuardService]},
      {path:'admin/orders',component:AdminOrdersComponent,canActivate:[AuthGuardService]}
    ])
  ],
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
  ],
  providers:[
    AdminAuthGuardService
  ]
})
export class AdminModule { }
