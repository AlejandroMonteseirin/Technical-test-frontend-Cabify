import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { StateShoppingCart } from "../ngrx-store/state";
import { CheckoutInterface } from "./checkout-interface";
import { Discounts } from "./discount";
import { OrderSummaryData } from "./order-summary-data";
import { Product } from "./product";

export class Checkout implements CheckoutInterface {

    private productData: { [id: string]: Product } = {} //the products and its Id, code:Product asociation by id O(1) read complexity
    private quantityData: { [id: string]: number } = {} //the quantity of products, code:quantity asociation by id O(1) read complexity
    private discountRules: { [id: string]: any } = {} //the rules for the discounts, see Discounts class for more documentation

    //Constructor with optionals arguments.
    //You can instanciate the class with the arguments or use the setters. 
    constructor(productData: { [id: string]: Product } = {}, quantityData: { [id: string]: number } = {}, discountRules: { [id: string]: any } = {}) {
        this.productData = productData;
        this.quantityData = quantityData;
        this.discountRules = discountRules;

    }

    //Scan a product and add it to the quantityData
    public scan(code: string): this {
        if (this.quantityData[code] == undefined) {
            this.quantityData[code] = 1;
        } else {
            this.quantityData[code] = this.quantityData[code] + 1;
        }
        return this
    }

    setProducts(productData: { [id: string]: Product }) {
        this.productData = productData;
    }
    setRules(rules: { [id: string]: any }) {
        this.discountRules = rules;
    }
    setQuantity(quantities: { [id: string]: number }) {
        this.quantityData = quantities;
    }


    //Received Quantities and uses the instance values of productData and quantityData to calculate the total and the Intermediate values
    calculateCheckoutData(quantities: { [id: string]: number }) {
        //object that have the values of the total and the intermediate values (number of items, base cost, totalcost, discounts)
        let orderSummaryData=new OrderSummaryData()

        //iterate the values and calculate the prices O(n)
        for (let key in quantities) {
            orderSummaryData.numberOfItems = orderSummaryData.numberOfItems + quantities[key];
            orderSummaryData.baseCost = orderSummaryData.baseCost + this.productData[key].price * quantities[key];
            let discountResponse = Discounts.applyDiscounts(key, this.productData[key].price, quantities[key], this.discountRules);
            if (discountResponse != null) {
                orderSummaryData.discounts.push(discountResponse);
                orderSummaryData.discountedMoney = orderSummaryData.discountedMoney + discountResponse.discount;
            }
        }

        return orderSummaryData;

    }

    //return the total using the properties of the class.
    public total(): number {
        return this.calculateCheckoutData(this.quantityData).totalCost;
    }


}