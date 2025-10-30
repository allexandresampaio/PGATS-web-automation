export function navegarParaLogin(){
    cy.get('a[href="/login"]').click() //buscando o item pelo filtro que bate apenas no likn que buscamos em seguida = atributo
}

export function fazerLogout(){
    cy.get('a[href="/logout"]').click()
}

export function navegarParaContactUs(){
    cy.get('a[href="/contact_us"]').click()
}
    