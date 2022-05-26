import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Checkout } from '../models/checkout';
import { Product } from '../models/product';



describe('TestCheckoutClass', () => {
 
  let checkout: Checkout;

  beforeEach(() => { 
    let productMockData: { [id: string]: Product } = {};
    productMockData["TSHIRT"] = new Product("TSHIRT", "Cabify T-Shirt", 20.00, 0);
    productMockData["MUG"] = new Product("MUG", "Cabify Coffee Mug", 5.00, 0);
    productMockData["CAP"] = new Product("CAP", "Cabify Cap", 10.00, 0);

    let rulesMockData: { [id: string]: any } = {};
    rulesMockData["TSHIRT"] = { type: "BULK", min: 3, discount: 0.05, text: "x3 Shirt offer" };
    rulesMockData["MUG"] = { type: "X-FOR-Y", x: 2, y: 1, text: "2x1 MUG offer" };

    checkout = new Checkout(productMockData,{},rulesMockData);
  });

  afterEach(() => { 
    checkout = new Checkout();
  });

  it('Total of nothing should be 0€ ', () => {
    expect(checkout.total()).toBe(0);
  });

  it('Scan a TSHIRT should have a total of 20€ ', () => {
    checkout.scan("TSHIRT");
    expect(checkout.total()).toBe(20);
  });
  it('Scan 3 TSHIRT should have a total of 57€ (BULK DISCOUNT)', () => {
    checkout.scan("TSHIRT").scan("TSHIRT").scan("TSHIRT");
    expect(checkout.total()).toBe(57);
  });
  it('Scan 2 MUG should have a total of 5€ (2-for-1 DISCOUNT)', () => {
    checkout.scan("MUG").scan("MUG");
    expect(checkout.total()).toBe(5);
  });
  it('Scan 4 MUG should have a total of 10€ (2-for-1 DISCOUNT)', () => {
    checkout.scan("MUG").scan("MUG").scan("MUG").scan("MUG");
    expect(checkout.total()).toBe(10);
  });
  it('Scan 3 TSHIRT 4 MUG and 4 CUP should have a total of 107€ (As the example image)', () => {
    checkout.scan("TSHIRT").scan("TSHIRT").scan("TSHIRT").scan("MUG").scan("MUG").scan("MUG").scan("MUG").scan("CAP").scan("CAP").scan("CAP").scan("CAP");
    expect(checkout.total()).toBe(107);
  });
});
