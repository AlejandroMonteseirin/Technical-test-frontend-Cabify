import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})


//This service is a mock service that simulate a api call that return an Promise.

/*
Since we have data to enter in the application that should not be hardcoded (products and promotions)
we have created a small service that simulates a call to an api that returns the data.
The service simply return an Promise that resolve after 1000 miliseconds (to simulate a real api Call).
That allow us to easily connect the application to an api in a future, only replacing this service for a real one,
as well it let us check how loading times would be when connected to a real api (permitting us to implement spinners/loading bar more efficiently)
*/
export class MockApiService {


  //Creation of the Mock response

  constructor() {

  }



  //Return the promise that solves after 0.8s
  public async getProductsApi() {
    await this.wait(800);
    return this.getMockProductResponse();
  }

  //Return the promise that solves after 0.8s
  public async getRulesApi() {
    await this.wait(800);
    return this.getMockRulesResponse();
  }


  private wait(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  //generate the simulated response of the api as a object of products
  private getMockProductResponse() {
    let mockResponse: { [id: string]: Product } = {};
    mockResponse["TSHIRT"] = new Product("TSHIRT", "Cabify T-Shirt", 20.00, 0);
    mockResponse["MUG"] = new Product("MUG", "Cabify Coffee Mug", 5.00, 0);
    mockResponse["CAP"] = new Product("CAP", "Cabify Cap", 10.00, 0);
    return mockResponse;
  }

  //generate the simulated response of the api as a object of products
  private getMockRulesResponse() {
    let mockResponse: { [id: string]: any } = {};
    mockResponse["TSHIRT"] = { type: "BULK", min: 3, discount: 0.05, text: "x3 Shirt offer" };
    mockResponse["MUG"] = { type: "X-FOR-Y", x: 2, y: 1, text: "2x1 MUG offer" };

    return mockResponse;
  }

}
