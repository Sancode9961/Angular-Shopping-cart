import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";
import { IterableChangeRecord_ } from "@angular/core/src/change_detection/differs/default_iterable_differ";

export class ShoppingCart {
    items:ShoppingCartItem[]=[];

    constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
        this.itemsMap=itemsMap || {};

        for(let productId in itemsMap){
            //this.items.push(itemsMap[productId]);

            let item=itemsMap[productId];
            //this.items.push(new ShoppingCartItem(item.product,item.quantity));
            let x=new ShoppingCartItem({
                // title:item.title,
                // imageUrl:item.imageUrl,
                // price:item.price,
                ...item,//spread operator
                $key:productId
            });
            // Object.assign(x,item);
            // x.$key=productId;
            this.items.push(x);
        }
    }

    // get productIds(){
    //     return Object.keys(this.items);
    // }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.itemsMap) {
            if (this.itemsMap.hasOwnProperty(productId)) {
                count += this.itemsMap[productId].quantity;
            }
        }
        //or use count+=this.items[productId].quantity;  without {} for forloop
        return count;
    }

    get totalPrice(){
        let sum=0;
        for(let productId in this.items)
            sum+=this.items[productId].totalPrice;

        return sum;
    }

    getQuantity(product:Product){    

        let item=this.itemsMap[product.$key];
        return item ? item.quantity : 0;
      }
}