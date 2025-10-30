import { faker, fakerPT_BR } from '@faker-js/faker';

export function enviarFormContato(){
    cy.get('[data-qa="name"]').type(faker.person.fullName())
    cy.get('[data-qa="email"]').type(faker.internet.email())
    cy.get('[data-qa="subject"]').type(faker.lorem.sentence())
    cy.get('[data-qa="message"]').type(faker.lorem.paragraph())
    cy.fixture('example.json').as('arquivo') //posso ignorar esse alias e na linha seguinte chamar pelo caminho completo do arquiso, se quiser 
    cy.get('input[type=file]').selectFile('@arquivo')
    cy.get('[data-qa="submit-button"]').click()
}