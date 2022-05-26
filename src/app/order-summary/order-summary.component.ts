import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Checkout } from '../models/checkout';
import { OrderSummaryData } from '../models/order-summary-data';
import { Product } from '../models/product';
import { StateShoppingCart } from '../ngrx-store/state';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})


//This component responsability is to show the order summary values. Changes when quantity of products are updated
export class OrderSummaryComponent {

  //Values needed:
  orderSummaryData:OrderSummaryData;


  private checkoutClassInstance: Checkout;


  //Automatic calculation using observables, will instanciate the checkout class if not instanced and use it to calculate all the data (number of items, discounts and total cost)
  constructor(private store: Store<{ status: StateShoppingCart }>) {

    //Instanciate the checkout clas without arguments. Because the arguments will be passed from the store
    this.checkoutClassInstance = new Checkout();

    //empty OrderSummaryDataObject
    this.orderSummaryData=new OrderSummaryData();

    //Load the product in the checkoutClass instance when products recieved from the store
    this.store.select(state => state.status.indexedObjectProduct).subscribe(res => this.updateProducts(res));

    //load the rules in the checkoutClass instance when Rules recieved from the store
    this.store.select(state => state.status.indexedObjectRules).subscribe(res => this.updateRules(res));

    //calculate the number of items, discounts and total cost using the checkout class instance when indexedObjectQuantity change in the store
    this.store.select(state => state.status.indexedObjectQuantity).subscribe(res => this.calculateCheckoutData(res));

    
  }


  //update or set the checkout class products (At this moment will only be set with data 1 time (when the store value change), but this implementation 
  //allow further scalability in the future) for example if we want the product to change for another action.
  updateProducts(products: { [id: string]: Product }) {
    this.checkoutClassInstance.setProducts(products);
  }

  //update or set the checkout class rules (At this moment will only be set with data 1 time (when the store value change), but this implementation 
  //allow further scalability in the future) for example if we want the rules to change for another action.
  updateRules(rules: { [id: string]: any }) {
    this.checkoutClassInstance.setRules(rules);
  }

  //calculate the number of items, discounts and total cost using the checkout class instance
  calculateCheckoutData(quantities: { [id: string]: number }) {
    this.orderSummaryData = this.checkoutClassInstance.calculateCheckoutData(quantities);

  }








}
