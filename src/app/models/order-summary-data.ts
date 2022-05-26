

//The model that represent the data needed in orderSummary
export class OrderSummaryData {

    numberOfItems: number
    baseCost: number
    discountedMoney: number
    discounts: Array<{
        text: any;
        discount: number;
    }>

    //derived property totalcost
    get totalCost() {
        return this.baseCost - this.discountedMoney;
    }

    //constructor with defaults values (empty)
    constructor(numberOfItems: number = 0, baseCost: number = 0, discountedMoney: number = 0, discounts: Array<{ text: any; discount: number; }> = []) {
        this.numberOfItems = numberOfItems
        this.baseCost = baseCost
        this.discountedMoney = discountedMoney
        this.discounts = discounts
    }



}
