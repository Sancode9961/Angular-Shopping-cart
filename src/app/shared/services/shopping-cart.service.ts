import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from 'shared/models/product';
import 'rxjs/add/operator/take';
import { promise } from 'protractor';
import { ShoppingCart } from 'shared/models/shopping-cart';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).pipe()
      .map(x => new ShoppingCart(x.items));
    //.map(x => console.log(x));
  }

  async addToCart(product: Product) {
    /*let cartId= await this.getOrCreateCartId();
      //let items$= this.db.object('/shopping-carts/'+cartId+'/items/'+product.$key);
      let items$= this.getItem(cartId,product.$key);
      items$.pipe().take(1).subscribe(item=>{
        //if(item.$exists()) items$.update({quantity:item.quantity+1})  
        //else items$.set({product:product,quantity:1}); //this will also work but making the statemnts on if else same ,we can remove if else,so professional  
         items$.update({product:product,quantity:(item.quantity||0)+1});  
        })*/
    this.UpdateIem(product, 1);

  }

  async removeFromCart(product: Product) {
    this.UpdateIem(product, -1);
  }

  async clearCart(){
    let cartId=await this.getOrCreateCartId();
    this.db.object('/shopping-carts/'+cartId+'/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }


  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }
  /* private getOrCreateCart(){
     let cartId=localStorage.getItem('cartId');
     if(!cartId) {
       this.create().then(result=>{
         localStorage.setItem('cartId',result.key);
 
         //Add product to cart
         return this.getCart(result.key);
       });
     }else{
       return this.getCart(cartId);
 
     }
   } or convert async promise to sync using async await.also we don't need actual shoppingcart object but just an id*/

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async UpdateIem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let items$ = this.getItem(cartId, product.$key);
    items$.pipe().take(1).subscribe(item => {
      let quantity=(item.quantity || 0) + change;
      if(quantity===0) items$.remove();
      else
      items$.update({
        //product:product,
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
      });
    })
  }

}
