import { Component, OnInit } from '@angular/core';
import { MockApiService } from './services/mock-api.service';
import { Store, select } from '@ngrx/store';
import { Product } from './models/product';
import { setAvailableProductsAction,updateRulesAction } from './ngrx-store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private mockApiService:MockApiService,private store: Store<{ availableProducts:  Map<String,Product> }>){}

  //load the products to the store
  ngOnInit(): void {
    this.mockApiService.getProductsApi().then((data)=>{
      this.store.dispatch(setAvailableProductsAction({availableProducts : data}));
    });
    this.mockApiService.getRulesApi().then((data)=>{
      this.store.dispatch(updateRulesAction({rules : data}));
    });

  }


}
