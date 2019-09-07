import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {


  //cart:ShoppingCart;
  cartSubscription:Subscription;
  cart$: Observable<ShoppingCart>;

  constructor(private shoppingCartservice: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartservice.getCart();
    //this.cartSubscription=cart$.subscribe(cart=>this.cart=cart);
  }
  // ngOnDestroy(){
  //   this.cartSubscription.unsubscribe();
  // }


}
