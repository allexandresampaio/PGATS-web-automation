/// <reference types="cypress" />

import userData from "../fixtures/example.json"
import menu from "../modules/menu";
import signup from "../modules/signup";
import login from "../modules/login";
import contact from "../modules/contact";
import { faker } from '@faker-js/faker';


describe ('Automation Exercise', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com/')
    });

    //1
    it ('01. Register User', () => {  
        menu.navegarParaLogin()
        signup.preencherFormularioSignup ()       
        signup.preencherSegundaPaginaFormSignup()        
        cy.url().should('includes', 'account_created') // -> mostra como asserção pois esse comando should é uma asserção
        cy.contains('b', 'Account Created!') // -> não mostra como asserção pois não é a finalidade do comando 
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')
    })

    //2
    it ('02. Login user with correct email and password', () => {
        menu.navegarParaLogin()
        login.preencherFormularioLogin(userData.email, userData.password)
        cy.get('a[href="/logout"]').should('have.text', ' Logout')
        cy.get('i.fa-user').parent().should('contain', 'QA Tester')
    })

    //3
    it ('03. Login user with INcorrect email and password', () => {
        menu.navegarParaLogin()
        login.preencherFormularioLogin("emailMaluco15271536@mailcom", "password")
        cy.get('.login-form > form > p').should('have.text', 'Your email or password is incorrect!')
    })

    //4
    it ('04. Logout user', () => {
        menu.navegarParaLogin()
        login.preencherFormularioLogin(userData.email, userData.password)
        cy.get('a[href="/logout"]').should('have.text', ' Logout')
        cy.get(':nth-child(10) > a').should('have.text', ' Logged in as QA Tester')
        menu.fazerLogout()
        cy.url().should('includes', 'login')
        cy.get('.login-form > h2').should('have.text', 'Login to your account')
    })

    //5
    it ('05. Register User with existing email', () => {
        menu.navegarParaLogin()
        signup.preencherFormularioSignupCustom(userData.name, userData.email) 
        cy.get('.signup-form > form > p').should('have.text', 'Email Address already exist!')
    })

    //6
    it ('06. Contact Us Form', () => {
        menu.navegarParaContactUs()
        contact.enviarFormContato()
        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
    })

    //8
    it ('08. Verify All Products and product detail page', () => {
        menu.navegarParaProdutos()
        cy.url().should('includes', 'products')
        cy.get('.title').should('have.text', 'All Products')
        cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click()
        cy.get('.product-information > h2').should('have.text', 'Blue Top')
        cy.get('.product-information > :nth-child(3)').should('have.text', 'Category: Women > Tops')
        cy.get(':nth-child(5) > span').should('have.text', 'Rs. 500')
        cy.get('.product-information > :nth-child(6)').should('have.text', 'Availability: In Stock')
        cy.get('.product-information > :nth-child(7)').should('have.text', 'Condition: New')
        cy.get('.product-information > :nth-child(8)').should('have.text', 'Brand: Polo')

    })

    //9
    it ('09. Search Product', () => {
        menu.navegarParaProdutos()
        cy.url().should('includes', 'products')
        cy.get('.title').should('have.text', 'All Products')
        cy.get('#search_product').type('maxi dress')
        cy.get('#submit_search').click()
        cy.get('.title').should('have.text', 'Searched Products')
        cy.get('.productinfo > p').should('have.text', 'Rose Pink Embroidered Maxi Dress')
    })
    
    //10
    it ('10. Verify Subscription in home page', () => {
        cy.scrollTo("bottom")
        cy.get('.single-widget > h2').should('be.visible')
        cy.get('#susbscribe_email').type(userData.email)
        cy.get('#subscribe').click()
        cy.get('.alert-success').should('be.visible')
        cy.get('.alert-success').should('have.text', 'You have been successfully subscribed!')
    })
    
    //15
    it ('15. Place Order: Register before Checkout', () => {
        menu.navegarParaLogin()
        signup.preencherFormularioSignup ()       
        signup.preencherSegundaPaginaFormSignup()        
        cy.url().should('includes', 'account_created') 
        cy.contains('b', 'Account Created!') 
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')
        cy.get('[data-qa="continue-button"]').click()
        cy.get(':nth-child(10) > a').should('contain', 'Logged in as')
        cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click()
        cy.get('.modal-footer > .btn').click()
        cy.get(':nth-child(4) > .product-image-wrapper > .single-products > .productinfo > .btn').click()
        cy.get('u').click()
        cy.url().should('includes', 'view_cart')
        cy.get('.col-sm-6 > .btn').click()
        cy.url().should('includes', 'checkout')
        cy.get('#address_delivery').should('be.visible')
        cy.get('#address_invoice').should('be.visible')
        cy.get(':nth-child(4) > .heading').should('have.text', 'Review Your Order')
        cy.get('.form-control').type(faker.lorem.sentence())
        cy.get(':nth-child(7) > .btn').click()
        cy.url().should('includes', 'payment')
        cy.get('[data-qa="name-on-card"]').type(faker.finance.creditCardIssuer())
        cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber())
        cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
        cy.get('[data-qa="expiry-month"]').type('04')
        cy.get('[data-qa="expiry-year"]').type('2035')
        cy.get('[data-qa="pay-button"]').click()
        cy.url().should('includes', 'payment_done')
        cy.get('[data-qa="order-placed"] > b').should('have.text', 'Order Placed!')
        cy.get('.col-sm-9 > p').should('have.text', 'Congratulations! Your order has been confirmed!')
        cy.get(':nth-child(5) > a').click()
        cy.url().should('includes', 'delete_account')
        cy.get('b').should('have.text', 'Account Deleted!')
    })
    
    //16
    it ('16. Place Order: Login before Checkout', () => {
        menu.navegarParaLogin()
        let email = signup.preencherFormularioSignup()
        let senha = signup.preencherSegundaPaginaFormSignup()
        cy.get('[data-qa="continue-button"]').click()
        menu.fazerLogout()

        login.preencherFormularioLogin(email, senha)
        cy.get(':nth-child(10) > a').should('contain', 'Logged in as')
        cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click()
        cy.get('.modal-footer > .btn').click()
        cy.get(':nth-child(4) > .product-image-wrapper > .single-products > .productinfo > .btn').click()
        cy.get('u').click()
        cy.url().should('includes', 'view_cart')
        cy.get('.col-sm-6 > .btn').click()
        cy.url().should('includes', 'checkout')
        cy.get('#address_delivery').should('be.visible')
        cy.get('#address_invoice').should('be.visible')
        cy.get(':nth-child(4) > .heading').should('have.text', 'Review Your Order')
        cy.get('.form-control').type(faker.lorem.sentence())
        cy.get(':nth-child(7) > .btn').click()
        cy.url().should('includes', 'payment')
        cy.get('[data-qa="name-on-card"]').type(faker.finance.creditCardIssuer())
        cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber())
        cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
        cy.get('[data-qa="expiry-month"]').type('04')
        cy.get('[data-qa="expiry-year"]').type('2035')
        cy.get('[data-qa="pay-button"]').click()
        cy.url().should('includes', 'payment_done')
        cy.get('[data-qa="order-placed"] > b').should('have.text', 'Order Placed!')
        cy.get('.col-sm-9 > p').should('have.text', 'Congratulations! Your order has been confirmed!')
        cy.get(':nth-child(5) > a').click()
        cy.url().should('includes', 'delete_account')
        cy.get('b').should('have.text', 'Account Deleted!')
    })
})