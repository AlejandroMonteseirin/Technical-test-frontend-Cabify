

//The model that represent a product
export class Product {

    code: string
    name: string
    price: number

    constructor(code: string, name: string, price: number,quantity:number) {
        this.code = code
        this.name = name
        this.price = price
    }
}
