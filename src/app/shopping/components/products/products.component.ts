import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import 'rxjs/add/operator/switchMap';//to swith from one observable to the other instead of nested observable
import 'rxjs/Observable';
import { ShoppingCartComponent } from '../../../shopping-cart/shopping-cart.component';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  //products$;//we can't use this observable when u wanna do client side filtering.u need to store all the products in array,only then u can filter
  products: Product[] = [];
  filteredProducts: Product[] = [];
  
  category: string;
  //cart:any;
  //subscription:Subscription;
  cart$:Observable<ShoppingCart>;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService:ShoppingCartService) {
      

    //this.products$=productService.getAll();
    //productService.getAll().subscribe(products=>{   >>to avoid nested subscribe use switchMap
    this.populateProducts();

    //route.snapshot.queryParamMap  >>//can't use since the products component that we show is in the dom but the route parameter is changing.so the angular component cannot destroy product component and reinitialize it again.
    //since product component is goining to be in the dom and its going to change it route parameters.so use subscribe.  
    // route.queryParamMap.subscribe(params=>{
    //   this.category=params.get('category');

    //   this.filteredProducts=(this.category)?
    //   this.products.filter(p=>p.category===this.category) : this.filteredProducts=this.products;

  }

  private applyFilter(){
    this.filteredProducts = (this.category) ?
    this.products.filter(p => p.category === this.category) : this.filteredProducts = this.products;
  }
  private populateProducts(){
    this.productService.getAll().switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    })
      .subscribe(params => {
        this.category = params.get('category');

       this.applyFilter();
      });
  }

  async ngOnInit(){//because we cant use await async for constructor
    // let cart =(await this.shoppingCartService.getCart())
    //           .subscribe(cart=>this.cart=cart);
    this.cart$=await this.shoppingCartService.getCart();
             
  }

  // ngOnDestroy(){
  //   if(this.subscription){
  //   this.subscription.unsubscribe();
  //   }
  // }


}
