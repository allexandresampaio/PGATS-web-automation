class Menu {
    navegarParaLogin(){
        cy.get('a[href="/login"]').click()
        cy.url().should('includes', 'login') //buscando o item pelo filtro que bate apenas no likn que buscamos em seguida = atributo
    }

    fazerLogout(){
        cy.get('a[href="/logout"]').click()
        cy.url().should('includes', 'login')
    }

    navegarParaContactUs(){
        cy.get('a[href="/contact_us"]').click()
        cy.url().should('includes', 'contact_us')
    }

    navegarParaProdutos(){
        cy.get('a[href="/products"]').click()
        cy.url().should('includes', 'products')
    }
}

export default new Menu()