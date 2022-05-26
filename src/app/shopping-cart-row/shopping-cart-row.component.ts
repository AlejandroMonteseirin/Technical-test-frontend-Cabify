import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, pipe } from 'rxjs';
import { Product } from '../models/product';
import { updateModalAction, updateQuantityProductsAction } from '../ngrx-store/actions';
import { StateShoppingCart } from '../ngrx-store/state';

@Component({
  selector: 'app-shopping-cart-row',
  templateUrl: './shopping-cart-row.component.html',
  styleUrls: ['./shopping-cart-row.component.css']
})


//This component responsability is change the quantity of the product
export class ShoppingCartRowComponent implements OnInit {
  @Input() product!: Product; //asignement assertion !:  
  quantity: number=0;
  constructor(private store: Store<{ status: StateShoppingCart }>) {
  
  }
  ngOnInit(){
    //This selector change the quantity of the product if the quantity was changed in the store and not in the input 
    // At this moment only when "add to card" button is used in the modal 
    this.store.select(state=>state.status.indexedObjectQuantity)
    .pipe(filter((x) => x[this.product.code]!=undefined && x[this.product.code]!=this.quantity))
    .subscribe((res)=>{
      this.quantity=res[this.product.code];
    });
  }

  //numeric user input
  changeQuantityInput(_newQuantity: Event) {
    if (this.quantity < 0 || this.quantity == null) { // invalid input values reset to 0 quantity Eg: input: -34 or 'e'
      this.quantity = 0;
    }
    this.updateStoreQuantity();

  }
  //plus and minus icons
  changeQuantity(newQuantity: number) {
    this.quantity = +newQuantity
    this.updateStoreQuantity();
  }

  //update the store value
  updateStoreQuantity() {
    this.store.dispatch(updateQuantityProductsAction({ id: this.product.code, quantity: this.quantity }))
  }

  //show the modal
  enableModal() {
    this.store.dispatch(updateModalAction({modalValue:this.product}))
  }


}
