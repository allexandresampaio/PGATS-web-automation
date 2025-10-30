class Login{
    preencherFormularioLogin(email, password){
        cy.get('input[data-qa=login-email]').type(email)
        cy.get('input[data-qa=login-password]').type(password)
        cy.contains('button', 'Login').click()
    }
}

export default new Login()

