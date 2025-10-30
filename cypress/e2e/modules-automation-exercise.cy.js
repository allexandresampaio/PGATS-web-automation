/// <reference types="cypress" />

import userData from "../fixtures/example.json"
import menu from "../modules/menu";
import signup from "../modules/signup";
import login from "../modules/login";
import contact from "../modules/contact";

describe ('Automation Exercise', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com/')
    });

    it ('Cadastrar um usuário', () => {  
        menu.navegarParaLogin()
        signup.preencherFormularioSignup ()       
        signup.preencherSegundaPaginaFormSignup()        
        cy.url().should('includes', 'account_created') // -> mostra como asserção pois esse comando should é uma asserção
        cy.contains('b', 'Account Created!') // -> não mostra como asserção pois não é a finalidade do comando 
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')
    })

    it ('Login user with correct email and password', () => {
        menu.navegarParaLogin()
        login.preencherFormularioLogin(userData.email, userData.password)
        cy.get('a[href="/logout"]').should('have.text', ' Logout')
        cy.get('i.fa-user').parent().should('contain', 'QA Tester')
    })

    it ('Login user with INcorrect email and password', () => {
        menu.navegarParaLogin()
        login.preencherFormularioLogin("emailMaluco15271536@mailcom", "password")
        cy.get('.login-form > form > p').should('have.text', 'Your email or password is incorrect!')
    })

    it ('Logout user', () => {
        menu.navegarParaLogin()
        login.preencherFormularioLogin(userData.email, userData.password)
        cy.get('a[href="/logout"]').should('have.text', ' Logout')
        cy.get(':nth-child(10) > a').should('have.text', ' Logged in as QA Tester')
        menu.fazerLogout()
        cy.url().should('includes', 'login')
        cy.get('.login-form > h2').should('have.text', 'Login to your account')
    })

    it ('Cadastrar um usuário com email já existente', () => {
        menu.navegarParaLogin()
        signup.preencherFormularioSignupCustom(userData.name, userData.email) 
        cy.get('.signup-form > form > p').should('have.text', 'Email Address already exist!')
    })

    it ('Enviar um formulário de Contato', () => {
        menu.navegarParaContactUs()
        contact.enviarFormContato()
        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
    })
})