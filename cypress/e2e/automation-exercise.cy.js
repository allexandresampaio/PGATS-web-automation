/// <reference types="cypress" />

/*
Hooks
    before -> 1x antes de todos
    beforEach -> antes de cada um
    after -> 1x depois de todos
    afterEach -> depois de cada um
*/

import userData from "../fixtures/example.json"

describe ('Automation Exercise', () => {

    beforeEach(() => {
        //cy.viewport("iphone-xr") -> para definir o tamanho da tela do navegador nos testes por modelo 
        //cy.viewport(300, 500) -> para definir o tamanho da tela do navegador nos testes por tamanho de tela
        cy.visit('https://automationexercise.com/')

    });

    const timestamp = new Date().getTime()
    let email = `QAtesteralle-${timestamp}@mail.com`
    let email_existente = 'qatesteralle@test.com'

    it ('Cadastrar um usuário', () => {
        
        cy.get('a[href="/login"]').click() //buscando o item pelo filtro que bate apenas no likn que buscamos em seguida = atributo

        cy.get('input[data-qa=signup-name]').type(userData.name)//tipo input 
        
        cy.get('input[data-qa=signup-email]').type(email)
        //cy.get('[data-qa=signup-button]').click()
        cy.contains('button', 'Signup').click() //buscando o botão pelo nome dentro dele + tipo de elemento -> button

        cy.get('input[type=radio]').check('Mrs')//buscando pelo conteudo e check
        //cy.get('#id_gender2').check()//buscando direto pelo id e check

        cy.get('input#password').type(userData.password, {log: false}) //log: false -> para não mostrar a senha no relatório de teste

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

    it ('Login user with correct email and password', () => {
        cy.get('a[href="/login"]').click()
        cy.get('input[data-qa=login-email]').type(email_existente)
        cy.get('input[data-qa=login-password]').type(userData.password)
        cy.contains('button', 'Login').click()
        cy.get('a[href="/logout"]').should('have.text', ' Logout')
        cy.get('i.fa-user').parent().should('contain', 'QA Tester')
    })

    it ('Login user with INcorrect email and password', () => {
        cy.get('a[href="/login"]').click()
        cy.get('input[data-qa=login-email]').type("emailMaluco15271536@mailcom")
        cy.get('input[data-qa=login-password]').type("password")
        cy.contains('button', 'Login').click()
        cy.get('.login-form > form > p').should('have.text', 'Your email or password is incorrect!')
    })

    it ('Logout user', () => {
        cy.get('a[href="/login"]').click()
        cy.get('input[data-qa=login-email]').type(email_existente)
        cy.get('input[data-qa=login-password]').type(userData.password)
        cy.contains('button', 'Login').click()
        cy.get('a[href="/logout"]').should('have.text', ' Logout')
        cy.get(':nth-child(10) > a').should('have.text', ' Logged in as QA Tester')

        cy.get('a[href="/logout"]').click()
        cy.url().should('includes', 'login')
        cy.get('.login-form > h2').should('have.text', 'Login to your account')
    })

    it ('Cadastrar um usuário com email já existente', () => {
        cy.get('a[href="/login"]').click() //buscando o item pelo filtro que bate apenas no likn que buscamos em seguida = atributo
        cy.get('input[data-qa=signup-name]').type('QA Tester')//tipo input 
        cy.get('input[data-qa=signup-email]').type(email_existente)
        cy.contains('button', 'Signup').click()
        cy.get('.signup-form > form > p').should('have.text', 'Email Address already exist!')
    })

    it ('Enviar um formulário de Contato', () => {
        cy.get('a[href="/contact_us"]').click()
        cy.get('[data-qa="name"]').type(userData.name)
        cy.get('[data-qa="email"]').type(userData.email)
        cy.get('[data-qa="subject"]').type(userData.subject)
        cy.get('[data-qa="message"]').type(userData.message)
        cy.fixture('example.json').as('arquivo')
        cy.get('input[type=file]').selectFile('@arquivo')
        cy.get('[data-qa="submit-button"]').click()
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')

    })
})