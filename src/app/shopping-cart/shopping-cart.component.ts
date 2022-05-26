import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { StateShoppingCart } from '../ngrx-store/state';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})


//This component responsability is to show the list of app-products, only will change when availableProducts change.
export class ShoppingCartComponent {
  availableProducts$: Observable<{ [id: string]: Product }> | null=null;
  constructor(private store: Store<{ status: StateShoppingCart }>) {
    this.availableProducts$ = this.store.select(state=>state.status.indexedObjectProduct);
  }


}
