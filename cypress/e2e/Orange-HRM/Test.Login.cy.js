import { login } from "../../support/POM/Login.Page";

describe("Test Login",()=>{
  beforeEach("Visit page login",()=>{
    login.get.endpoint()
    cy.url().should("include","auth/login")
  })
  it("Login should works perfectly",()=>{
    login.setUsername("Admin")
    login.get.inputUsername().invoke('val').should("contain","Admin")

    login.setPassword("admin123")

    login.submitLogin()

    cy.url().should("contain","dashboard/index")

  })
})