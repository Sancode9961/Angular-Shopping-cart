import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Subscription } from 'rxjs/Subscription';
import { Order } from 'shared/models/order';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit,OnDestroy {

  shipping = {};
  userId:string;
  userSubscription:Subscription;
  @Input('cart') cart:ShoppingCart;
  
  constructor(
    private orderService:OrderService,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit(){
    this.userSubscription=this.authService.user$.subscribe(user=>this.userId=user.uid);
  }
  
  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    /*let order = {
      userId:this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,  
      items:this.cart.items.map(i=>{
        return{
          product:{
            title:i.title,
            imageUrl:i.imageUrl,
            price:i.price
          },
          quantity:i.quantity,
          totalprice:i.totalPrice
        }
      })
    };*/
    let order=new Order(this.userId,this.shipping,this.cart);
    let result=await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success',result.key]);//$jey is user when u read a node from firebase but ke is used when u store something in firebase
  
  }

}
