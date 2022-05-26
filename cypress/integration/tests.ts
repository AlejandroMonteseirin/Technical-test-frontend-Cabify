describe('Check Page loaded', () => {
  it('Visits the initial project page and check the title are loaded', () => {
    cy.visit('/')
    cy.contains('Shopping cart')
  })
})

describe('Check Product loaded', () => {
  it('Visits the initial project page and check the products are loaded', () => {
    cy.visit('/')
    cy.contains('Cabify Cap')
  })
})

describe('Check Order Summary loaded', () => {
  it('Visits the initial project page and check the order summary component is loaded', () => {
    cy.visit('/')
    cy.contains('Order Summary')
  })
})


describe('Check Order Summary cart have 0 items', () => {
  it('Visits the initial project page and check the order summary have 0 items', () => {
    cy.visit('/')
    cy.contains('0 Items')
  })
})


describe('Add a cabify cap to the cart and check it is added to the order summary component', () => {
  it('Visits the initial project page add a cup and check that is correctly added', () => {
    cy.visit('/')
    cy.get(':nth-child(1) > app-shopping-cart-row > .col-quantity > :nth-child(3)').click()
    cy.contains('1 Item')
    cy.get('.summary-total-price').contains("10€")

  })
})


describe('Add 2 cabify Coffee mug and check if the promotion 2-in-1 is added', () => {
  it('Visits the initial project page add 2 cabify coffe mug and check that is correctly added', () => {
    cy.visit('/')
    cy.get(':nth-child(2) > app-shopping-cart-row > .col-quantity > :nth-child(3)').click().click()
    cy.contains('2 Items')
    cy.contains('2x1 MUG offer')
    cy.get('.summary-total-price').contains("5€")
  })
})

describe('Add the same items that in the example image and check if total is correct', () => {
  it('Visits the initial project page, add 3 TSHIRT 4 MUG and 4 CUP, checkshould have a total of 107€ ', () => {
    cy.visit('/')
    cy.get(':nth-child(1) > app-shopping-cart-row > .col-quantity > :nth-child(3)').click().click().click().click()
    cy.get(':nth-child(2) > app-shopping-cart-row > .col-quantity > :nth-child(3)').click().click().click().click()
    cy.get(':nth-child(3) > app-shopping-cart-row > .col-quantity > :nth-child(3)').click().click().click()
    cy.contains('11 Items')
    cy.contains('2x1 MUG offer')
    cy.contains('x3 Shirt offer')
    cy.get('.summary-total-price').contains("107€")
  })
})
describe('Check the modal open correctly', () => {
  it('Visits the initial project page, click on cabify cap and check if modal opens ', () => {
    cy.visit('/')
    cy.get(':nth-child(1) > app-shopping-cart-row > .col-product > .product-image > .product-description > h1').click()
    cy.contains('This lore ipsum should be remplaced by product.info')
    cy.contains('Add to cart')
  })
})
describe('Check the modal add to cart buttom works', () => {
  it('Visits the initial project page, click on cabify cap , open the modal and then push "add to cart", then check if quantity input changes and ordersummary is updated', () => {
    cy.visit('/')
    cy.get(':nth-child(1) > app-shopping-cart-row > .col-product > .product-image > .product-description > h1').click()
    cy.get('.modalButtonAddToCart').click()
    cy.get(':nth-child(1) > app-shopping-cart-row > .col-quantity > .product-quantity').should('have.value', 1)
    cy.get('.summary-total-price').contains("10")
    cy.contains('1 Item')


  })
})


