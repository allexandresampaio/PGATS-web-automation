/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

import userData from "../fixtures/example.json"
import { faker, fakerPT_BR } from '@faker-js/faker';

describe ('Automation Exercise', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com/')

    });

    let email_existente = 'qatesteralle@test.com'

    it ('Cadastrar um usuário', () => {
        
        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[4]/a').click() //buscando o item pelo filtro que bate apenas no likn que buscamos em seguida = atributo

        cy.xpath('//*[@id="form"]/div/div/div[3]/div/form/input[2]').type(fakerPT_BR.person.fullName())//tipo input 
        
        let email = faker.internet.email({firstName: 'alle-tests-xpath'})
        
        cy.xpath('//*[@id="form"]/div/div/div[3]/div/form/input[3]').type(email)
        cy.xpath('//*[@id="form"]/div/div/div[3]/div/form/button').click() //buscando o botão pelo nome dentro dele + tipo de elemento -> button
        cy.xpath('//*[@id="id_gender2"]').check('Mrs')//buscando pelo conteudo e check
        cy.xpath('//*[@id="password"]').type(faker.internet.password(), {log: false}) //log: false -> para não mostrar a senha no relatório de teste
        cy.xpath('//*[@id="days"]').select(19) //tipo=select e data-qa=days 
        cy.xpath('//*[@id="months"]').select(faker.date.month())
        cy.xpath('//*[@id="years"]').select('1993')
        cy.xpath('//*[@id="newsletter"]').check()
        cy.xpath('//*[@id="optin"]').check()
        cy.xpath('//*[@id="first_name"]').type(faker.person.firstName())
        cy.xpath('//*[@id="last_name"]').type(faker.person.lastName())
        cy.xpath('//*[@id="company"]').type(faker.company.name())
        cy.xpath('//*[@id="address1"]').type(faker.location.street())
        cy.xpath('//*[@id="address2"]').type(faker.location.buildingNumber())
        cy.xpath('//*[@id="country"]').select('Singapore')
        cy.xpath('//*[@id="state"]').type(faker.location.state())
        cy.xpath('//*[@id="city"]').type(faker.location.city())
        cy.xpath('//*[@id="zipcode"]').type(faker.location.zipCode())
        cy.xpath('//*[@id="mobile_number"]').type(faker.phone.number())
        cy.xpath('//*[@id="form"]/div/div/div/div/form/button').click()
        cy.url().should('includes', 'account_created') // -> mostra como asserção pois esse comando should é uma asserção
        cy.contains('b', 'Account Created!') // -> não mostra como asserção pois não é a finalidade do comando 
        cy.xpath('//*[@id="form"]/div/div/div/h2').should('have.text', 'Account Created!')

    })

    it ('Login user with correct email and password', () => {
        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[4]/a').click()
        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/input[2]').type(email_existente)
        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/input[3]').type(userData.password)
        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/button').click()
        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[4]/a').should('have.text', ' Logout')
        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[10]/a/b').parent().should('contain', 'QA Tester')
    })

    it ('Login user with INcorrect email and password', () => {
        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[4]/a').click()
        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/input[2]').type("emailMaluco15271536@mailcom")
        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/input[3]').type("password")
        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/button').click()
        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/p').should('have.text', 'Your email or password is incorrect!')
    })

    it ('Logout user', () => {
        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[4]/a').click()
        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/input[2]').type(email_existente)
        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/input[3]').type(userData.password)
        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/button').click()
        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[4]/a').should('have.text', ' Logout')
        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[10]/a').should('have.text', ' Logged in as QA Tester')

        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[4]/a').click()
        cy.url().should('includes', 'login')
        cy.xpath('//*[@id="form"]/div/div/div[1]/div/h2').should('have.text', 'Login to your account')
    })

    it ('Cadastrar um usuário com email já existente', () => {
        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[4]/a').click() //buscando o item pelo filtro que bate apenas no likn que buscamos em seguida = atributo
        cy.xpath('//*[@id="form"]/div/div/div[3]/div/form/input[2]').type(faker.person.fullName())//tipo input 
        cy.xpath('//*[@id="form"]/div/div/div[3]/div/form/input[3]').type(email_existente)
        cy.xpath('//*[@id="form"]/div/div/div[3]/div/form/button').click()
        cy.xpath('//*[@id="form"]/div/div/div[3]/div/form/p').should('have.text', 'Email Address already exist!')
    })

    it ('Enviar um formulário de Contato', () => {
        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[8]/a').click()
        cy.xpath('//*[@id="contact-us-form"]/div[1]/input').type(faker.person.fullName())
        cy.xpath('//*[@id="contact-us-form"]/div[2]/input').type(faker.internet.email())
        cy.xpath('//*[@id="contact-us-form"]/div[3]/input').type(faker.lorem.sentence())
        cy.xpath('//*[@id="message"]').type(faker.lorem.paragraph())
        cy.fixture('example.json').as('arquivo') //posso ignorar esse alias e na linha seguinte chamar pelo caminho completo do arquiso, se quiser 
        cy.xpath('//*[@id="contact-us-form"]/div[5]/input').selectFile('@arquivo')
        cy.xpath('//*[@id="contact-us-form"]/div[6]/input').click()
        cy.xpath('//*[@id="contact-page"]/div[2]/div[1]/div/div[2]').should('be.visible')
        cy.xpath('//*[@id="contact-page"]/div[2]/div[1]/div/div[2]').should('have.text', 'Success! Your details have been submitted successfully.')

    })
})