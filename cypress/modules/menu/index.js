class Menu {
    navegarParaLogin(){
        cy.get('a[href="/login"]').click() //buscando o item pelo filtro que bate apenas no likn que buscamos em seguida = atributo
    }

    fazerLogout(){
        cy.get('a[href="/logout"]').click()
    }

    navegarParaContactUs(){
        cy.get('a[href="/contact_us"]').click()
    }
}

export default new Menu()