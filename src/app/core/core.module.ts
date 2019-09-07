import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from 'app/shopping/components/products/products.component';
import { ShoppingModule } from 'app/shopping/shopping.module';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
    ])
  ],
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent
  ],
  exports:[
    BsNavbarComponent,
    LoginComponent
  ]
})
export class CoreModule { }
