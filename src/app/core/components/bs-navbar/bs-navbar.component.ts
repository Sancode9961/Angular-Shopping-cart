import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  appUser: AppUser;
  //shoppingCartItemCount:number;

  cart$:Observable<ShoppingCart>;

  isLiked:boolean;

  constructor(public auth:AuthService,
            private shoppingCartService:ShoppingCartService) {
    //afAuth.authState.subscribe(user=> this.user =user);
    //this.user$=afAuth.authState;

    auth.appUser$.subscribe(appUser=>this.appUser=appUser);//to avoid infinite loop when we use nested observatble with async pipe
   
  }
  async ngOnInit(){
       //let cart$=await this.shoppingCartService.getCart();
      //cart$.subscribe(cart=>{
      // this.shoppingCartItemCount=0;
      // for(let productId in cart.items) {
      //   this.shoppingCartItemCount+=cart.items[productId].quantity
      // } })
      this.cart$=await this.shoppingCartService.getCart();
     //this.cart$.subscribe(x=>console.log(x.totalItemsCount));
      
    }

  logout(){
   this.auth.logout();
  }

}
