/// <reference types="cypress" />

describe ('Automation Exercise', () => {
    it ('Cadastrar um usuário', () => {
        const timestamp = new Date().getTime()

        //cy.viewport("iphone-xr") -> para definir o tamanho da tela do navegador nos testes por modelo 
        //cy.viewport(300, 500) -> para definir o tamanho da tela do navegador nos testes por tamanho de tela

        cy.visit('https://automationexercise.com/')

        cy.get('a[href="/login"]').click() //buscando o item pelo filtro que bate apenas no likn que buscamos em seguida = atributo

        cy.get('input[data-qa=signup-name]').type('QA Tester')//tipo input 
        cy.get('input[data-qa=signup-email]').type(`QAtesteralle-${timestamp}@mail.com`)
        //cy.get('[data-qa=signup-button]').click()
        cy.contains('button', 'Signup').click() //buscando o botão pelo nome dentro dele + tipo de elemento -> button

        cy.get('input[type=radio]').check('Mrs')//buscando pelo conteudo e check
        //cy.get('#id_gender2').check()//buscando direto pelo id e check

        cy.get('input#password').type('123456', {log: false}) //log: false -> para não mostrar a senha no relatório de teste

        //para comboboxes ou selects -> select
        cy.get('select[data-qa=days]').select(19) //tipo=select e data-qa=days 
        cy.get('select[data-qa=months]').select('April')
        cy.get('select[data-qa=years]').select('1993')
        
    //radio ou checkboxes -> check
        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        // preenchendo form completo e criando conta
        cy.get('input#first_name').type('Allezinho')
        cy.get('input#last_name').type('Tester')
        cy.get('input#company').type('TestersHive')
        cy.get('input#address1').type('Rua dos Testadores')
        cy.get('input#address2').type('777')
        cy.get('select#country').select('Singapore')
        cy.get('input#state').type('Testambuco')
        cy.get('input#city').type('Testolândia')
        cy.get('input#zipcode').type('1234321')
        cy.get('input#mobile_number').type('99888776655')
        // cy.contains('button', 'Create Account').click()
        cy.get('[data-qa="create-account"]').click()
        
        // Triple A = Arrange, Act, Assert
        // asserção
        cy.url().should('includes', 'account_created') // -> mostra como asserção pois esse comando should é uma asserção
        cy.contains('b', 'Account Created!') // -> não mostra como asserção pois não é a finalidade do comando 
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')

        // aqui entraria uma consulta ao banco ou a API
    })
})