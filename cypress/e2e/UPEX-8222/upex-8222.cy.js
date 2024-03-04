// Se testea usando hardcoding
describe("US - 8222 |Academy | PLP | Agregar productos de la tienda al Shopping-Cart de forma práctica", () => {
  beforeEach("Visitar la pagina SUT", () => {
    cy.visit("https://academybugs.com/")
    expect(location.origin).to.eq('https://academybugs.com')
  })

  it("TC#1 - Validar añadir un producto simple del PLP al Shopping-Cart exitosamente", () => {
    cy.visit("https://academybugs.com/find-bugs/")
    cy.url().should("contain", "find-bugs")
    cy.get(".ec_product_li")
      .eq(0)
      .should("contain", "DNK Yellow Shoes")
      .find(".ec_product_addtocart > a#ec_add_to_cart_5")
      .should("contain", "ADD TO CART")
      .click()
    cy.get(".ec_product_li")
      .eq(0)
      .find(".ec_product_successfully_added")
      .should("be.visible")
      .find("div")
      .should("contain", "Successfully Added to your Shopping Cart")
    cy.get(".ec_product_added_to_cart")
      .should("be.visible")
      .should("contain", "Product successfully added to your cart.")
      .find("a")
      .should("contain", "View Cart")
  })

  it("TC#2 - Validar añadir un producto simple del PDP al Shopping-Cart exitosamente", () => {
    cy.visit("https://academybugs.com/store/dark-grey-jeans/")
    cy.url().should("contain", "dark-grey-jeans")
    cy.get("input[name='ec_quantity']")
      .focus()
      .clear()
      .type(14)
    cy.get("input[value='ADD TO CART']")
      .click()

    cy.location('pathname').should('include', 'my-cart')
  })

  it("TC#3 - Validar añadir un producto con categorización del PDP al Shopping-Cart exitosamente", () => {
    cy.visit("https://academybugs.com/store/professional-suit/")

    cy.url().should("contain", "professional-suit")

    cy.get("input[name='ec_quantity']")
      .focus()
      .clear()
      .type(4)

    cy.get("ul.ec_details_swatches li")
      .eq(1)
      .click()
      .find("img")
      .should("have.attr", "title", "Orang")

    cy.get("ul.ec_details_swatches li")
      .eq(1)
      .should('have.class', 'ec_selected')

    cy.get("input[value='ADD TO CART']")
      .click()

    cy.location('pathname').should('include', 'my-cart')
  })
})