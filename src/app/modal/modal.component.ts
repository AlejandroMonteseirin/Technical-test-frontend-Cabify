import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { addToCartModalAction, updateModalAction } from '../ngrx-store/actions';
import { StateShoppingCart } from '../ngrx-store/state';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({  opacity: 0 }),
            animate('0.5s ease-out', 
                    style({  opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({  opacity: 1 }),
            animate('0.5s ease-in', 
                    style({  opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class ModalComponent  {
  productModal:Product|null=null;
  currentModalValue$: Observable<Product|null> | undefined ;

  //This component responsability is be the modal that allow "add to cart" a product,it change when the modal value of the store changes.
  constructor(private store: Store<{ status: StateShoppingCart }>) {
    this.currentModalValue$ = this.store.select(state => state.status.modalValue); //observable of the store value of the modal
    this.currentModalValue$.subscribe(res => this.productModal=res); //when the store change, his value change and if it is null it hide

  }

  closeModal() {
    this.store.dispatch(updateModalAction({modalValue:null}))
  }
  addToCart(){
    console.log(this.productModal);
    if(this.productModal!=null){
      this.store.dispatch(addToCartModalAction({productCode:this.productModal.code}))
    }
  }
}
