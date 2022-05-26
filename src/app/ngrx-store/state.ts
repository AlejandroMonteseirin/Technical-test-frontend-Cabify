import { Product } from "../models/product"



export class StateShoppingCart {


    indexedObjectProduct: { [id: string]: Product }
    indexedObjectQuantity:{ [id: string]: number }
    indexedObjectRules:{ [id: string]: any }
    modalValue:Product |null


    constructor(indexedObjectProduct:  { [id: string]: Product }, indexedObjectQuantity:{ [id: string]: number },indexedObjectRules:{ [id: string]: any },modalValue:Product|null) {
        this.indexedObjectProduct = indexedObjectProduct
        this.indexedObjectQuantity = indexedObjectQuantity
        this.indexedObjectRules = indexedObjectRules
        this.modalValue=modalValue

    }
};

export const initialState: StateShoppingCart = {
    indexedObjectProduct: {},
    indexedObjectQuantity: {},
    indexedObjectRules:{},
    modalValue:null
};