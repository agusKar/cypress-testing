// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("checkProductAndAddQuantity", (clickTimes = 1) => {
  cy.fixture("shopping-cart.Page").then((the) => {
  cy.get(".ec_cartitem_row")
    .eq(0)
    .find(the.data.product_title)
    .should("contain", "DNK Yellow Shoes")

    for (let index = 0; index < clickTimes; index++) {
      cy.get(".ec_cartitem_row")
        .eq(0)
        .find(the.inputs.btn_suma)
        .click()      
    }
  })
})

Cypress.Commands.add("addProductToSCP", () => {
  cy.visit("/find-bugs")
  cy.fixture("shopping-cart.Page").then((the) => {
    cy.get(the.products.product)
      .eq(0)
      .should("contain", "DNK Yellow Shoes")
      .find(the.products.add_to_cart)
      .eq(1)
      .click()

    cy.visit("/my-cart")

    cy.get(".ec_cartitem_row")
      .eq(0)
      .find(the.data.product_title)
      .should("contain", "DNK Yellow Shoes")
  })
})