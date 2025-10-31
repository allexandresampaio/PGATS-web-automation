import { faker, fakerPT_BR } from '@faker-js/faker';

class Signup {
    preencherFormularioSignup(){
        cy.get('input[data-qa=signup-name]').type(fakerPT_BR.person.fullName())//tipo input 
        let email = faker.internet.email({firstName: 'alle-tests-pgats'})
        cy.get('input[data-qa=signup-email]').type(email)
        cy.contains('button', 'Signup').click()
        return email
    }

    preencherFormularioSignupCustom(name, email){
        cy.get('input[data-qa=signup-name]').type(name)
        cy.get('input[data-qa=signup-email]').type(email)
        cy.contains('button', 'Signup').click()
    }

    preencherSegundaPaginaFormSignup(){
        cy.get('input[type=radio]').check('Mrs')//buscando pelo conteudo e check
        let senha = faker.internet.password()
        cy.get('input#password').type(senha, {log: false}) //log: false -> para não mostrar a senha no relatório de teste
        cy.get('select[data-qa=days]').select(19) //tipo=select e data-qa=days 
        cy.get('select[data-qa=months]').select(faker.date.month())
        cy.get('select[data-qa=years]').select('1993')
        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()
        cy.get('input#first_name').type(faker.person.firstName())
        cy.get('input#last_name').type(faker.person.lastName())
        cy.get('input#company').type(faker.company.name())
        cy.get('input#address1').type(faker.location.street())
        cy.get('input#address2').type(faker.location.buildingNumber())
        cy.get('select#country').select('Singapore')
        cy.get('input#state').type(faker.location.state())
        cy.get('input#city').type(faker.location.city())
        cy.get('input#zipcode').type(faker.location.zipCode())
        cy.get('input#mobile_number').type(faker.phone.number())
        cy.get('[data-qa="create-account"]').click()
        return senha
    }
}

export default new Signup()

