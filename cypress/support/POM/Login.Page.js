class Login {
  // propiedades
  get = {
    endpoint: () => cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"),
    inputUsername: () => cy.get("input[name='username']"),
    inputPassword: () => cy.get("input[name='password']"),
    btnSubmit: () => cy.get("button.orangehrm-login-button"),
  }

  // funciones
  setUsername(type) {
    this.get.inputUsername().type(`${type}`)
  }
  setPassword(type) {
    this.get.inputPassword().type(`${type}`)
  }
  submitLogin() {
    this.get.btnSubmit().click()
  }

}

export const login = new Login;