export class Discounts {

    /*
    
    Rules are a indexedObject with the ID of the product affected and the parameters of the discount in an "any" object.
    This allows scalability in the future as not strict parameters are required, for example for an adding a new 
    discount like "10€ of discount every 3 TSHIRTS " you only have to create the rule object with the parameters
    that you need, and add the case to the switch in the applyDiscounts function.
    Moreover, all rules objects should be parametric, so only if a new type of discount exist you will need to change the code.

    For simplicity and performance (complexity of O(1) while searching the rules), only 1 rule object can be indexed to an ID of the product,
    that not means that you can't have multiple rules in a product, if you want BULK and also 2-For-1,
    you just have to create a new rule object like "BULK_X-in-Y" with the parameters needed and the logic in the switch statement of the applyDiscounts function

    {"id of the product affected" : {object with the type of the discount, the text to display if applied and optional parameters}}
    EJ:
    {"TSHIRT": , {type:"BULK", min:3, discount:0.05, text:"x3 Shirt offer"}}
    {"MUG": , {type:"X-FOR-Y", x:2, y:1, text:"2x1 MUG offer"}}


    */


    public static applyDiscounts(productCode: string, productPrice: number, quantity: number, rules: { [id: string]: any }) {

        let rule = rules[productCode];
        if (rule != undefined) {
            let discount = 0;
            switch (rule.type) {
                case "BULK": //porcentaje discount based on a minimoun amount
                    if (quantity >= rule.min) {
                        discount = productPrice * quantity * rule.discount;
                    }
                    break;
                case "X-FOR-Y": // Y free products every X buyed product
                    if (quantity >= rule.x) {
                        let timesDiscounted=Math.floor(quantity/rule.x)
                        discount = productPrice * (rule.x-rule.y) * timesDiscounted;
                    }
                    break;

            }
            if (discount != 0) {
                return { text: rule.text, discount: discount }
            }
        }
        return null;
    }



}
