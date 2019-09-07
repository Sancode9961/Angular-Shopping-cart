import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {
  @Input('product') product:Product;
  @Input('show-actions') showActions=true;
  @Input('shopping-cart') shoppingCart:ShoppingCart;

  constructor(private cartService:ShoppingCartService) { }

  //addToCart(product:Product){//we can use the product inside above
  addToCart(){
    this.cartService.addToCart(this.product);
  }
 /* //now all this implemented inside product-qantity.ts/in shoppingcart class
 removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }

  getQuantity(){
    if(!this.shoppingCart) return 0;

    let item=this.shoppingCart.items[this.product.$key];
    return item ? item.quantity : 0;
  }*/

}
