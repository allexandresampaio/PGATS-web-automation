describe('Drag and Drop', () => {
    it ('Multiple Windows', () => {
        cy.visit('https://the-internet.herokuapp.com/windows')

        cy.contains('Click Here')
            .invoke('removeAttr', 'target')//removendo o atributo que faria a página abrir em nova guia
            .click()
        cy.get('h3').should('have.text', 'New Window')

    })

    it ('Drag and Drop', () =>{
        cy.visit('https://the-internet.herokuapp.com/drag_and_drop')
        const dataTransfer = new DataTransfer()//var para guardar a informação do obj que esta sendo manipulado
        cy.contains('A').trigger('dragstart', { dataTransfer })//começa a ação de drag
        cy.contains('B').trigger('drop', { dataTransfer })//finaliza a acao de drag-> drop

    })
})