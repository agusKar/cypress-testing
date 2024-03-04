// Se testea usando hardcoding 
describe("TS | US-8375 | Test 🧪📜Academy | PDP | Update | Modificar la cantidad del producto agregado al Shopping-Cart con total-validation",
  {
    // retries: {
    //   runMode: 2,
    //   openMode: 1,
    // },
  }, () => {
    beforeEach("Precondicion de carga del test set", () => {
      cy.addProductToSCP()
    })


    it("TC #1 | TS-8380 | US-8375 | Validar sumar cantidad de producto con botón de suma y comprobar total producto", () => {
      cy.fixture("shopping-cart.Page").then((the) => {
        cy.checkProductAndAddQuantity()

        cy.get(".ec_cartitem_row")
          .eq(0)
          .find(the.inputs.input_numerico)
          .should("have.value", "2")

        cy.get(".ec_cartitem_row")
          .eq(0)
          .find(the.inputs.btn_update)
          .click()

        cy.get(".ec_cartitem_updating")
          .eq(0)
          .should("not.be.visible")

      })
    })

    it("TC #2 | TS-8380 | US-8375 | Validar restar cantidad de producto con botón de resta y comprobar total producto", () => {
      cy.fixture("shopping-cart.Page").then(the => {
        cy.checkProductAndAddQuantity(3)

        cy.get(".ec_cartitem_row")
          .eq(0)
          .find(the.inputs.input_numerico)
          .should("have.value", "4")

        cy.get(".ec_cartitem_row")
          .eq(0)
          .find(the.inputs.btn_update)
          .click()

        cy.get(".ec_cartitem_updating")
          .eq(0)
          .should("not.be.visible")

        cy.get(".ec_cartitem_row")
          .eq(0)
          .find(the.inputs.input_numerico)
          .should("have.value", "4")

        cy.get(".ec_cartitem_row")
          .eq(0)
          .find(the.inputs.btn_resta)
          .click()

        cy.get(".ec_cartitem_row")
          .eq(0)
          .find(the.inputs.input_numerico)
          .should("have.value", "3")

        cy.get(".ec_cartitem_row")
          .eq(0)
          .find(the.inputs.btn_update)
          .click()
        cy.get(".ec_cartitem_updating")
          .eq(0)
          .should("not.be.visible")


        cy.get(".ec_cartitem_row")
          .eq(0)
          .find(the.inputs.input_numerico)
          .should("have.value", "3")

        cy.get(".ec_cartitem_updating")
          .eq(0)
          .should("not.be.visible")
      })
    })

    it("TC #3 | TS-8380 | US-8375 | Validar modificar cantidad de producto con input númerico y comprobar total producto", () => {

      cy.fixture("shopping-cart.Page").then(the => {
        cy.get(".ec_cartitem_row")
          .eq(0)
          .find(the.data.product_title)
          .should("contain", "DNK Yellow Shoes")

        cy.get(".ec_cartitem_row")
          .eq(0)
          .find(the.inputs.input_numerico)
          .type(99)

        cy.get(".ec_cartitem_row")
          .eq(0)
          .find(the.inputs.btn_update)
          .click()

        cy.get(".ec_cartitem_updating")
          .eq(0)
          .should("not.be.visible")

        cy.get(".ec_cartitem_row")
          .eq(0)
          .find(the.inputs.input_numerico)
          .should("contain", "99")

      })
    })

    it("TC #4 | TS-8380 | US-8375 | Validar modificar cantidad de producto comprobar total carrito", () => {

      cy.fixture("shopping-cart.Page").then((the) => {
        cy.checkProductAndAddQuantity()

        cy.get(".ec_cartitem_row")
          .eq(0)
          .find(the.inputs.input_numerico)
          .should("have.value", "2")

        cy.get(".ec_cartitem_row")
          .eq(0)
          .find(the.inputs.btn_update)
          .click()

        cy.get(".ec_cartitem_updating")
          .eq(0)
          .should("not.be.visible")

        cy.get(".ec_cartitem_row")
          .eq(0)
          .find(the.inputs.input_numerico)
          .should("have.value", "2")

        cy.get(the.data.subtotal_cart_price)
          .then($subtotalPrice => {
            const num1 = parseFloat($subtotalPrice.text().replace("$", "")).toFixed(2);
            cy.log(num1)

            
            cy.get(the.data.shipping_price)
              .then($shippingPrice => {
                const num2 = parseFloat($shippingPrice.text().replace("$", "")).toFixed(2);
                cy.log(num2)

                cy.get(the.data.grandtotal_cart_price)
                  .then($grandTotal => {
                    const num3 = parseFloat($grandTotal.text().replace("$", "")).toFixed(2);
                    cy.log(num3)
                    expect(parseFloat(parseFloat(num1) + parseFloat(num2)).toFixed(2)).equal(num3)
                  })
              })
          })
      })
    })

    afterEach("Comprobar si el precio total del producto es correcto, multiplicando la cantidad con el precio unitario", () => {
      cy.fixture("shopping-cart.Page").then(the => {
        cy.get(".ec_cartitem_row")
          .eq(0)
          .find(the.data.single_price).then(($num1) => {
            const num1 = parseFloat($num1.text().replace("$", "")).toFixed(2);

            cy.get(".ec_cartitem_row")
              .eq(0)
              .find(the.inputs.input_numerico)
              .invoke('val')
              .then(inputValue => {
                cy.get(".ec_cartitem_row")
                  .eq(0)
                  .find(the.data.total_product_price).then(($totalPriceProduct) => {
                    const totalPriceProduct = parseFloat($totalPriceProduct.text().replace("$", "")).toFixed(2);

                    expect(parseFloat(num1 * parseInt(inputValue)).toFixed(2)).equal(totalPriceProduct);
                  })

              });
          });
      });

    })
  })