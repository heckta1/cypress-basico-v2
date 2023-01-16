/// <reference types="Cypress" />

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Hécktor').should('have.value', 'Hécktor')
        cy.get('#lastName').type('Nascimento').should('have.value', 'Nascimento')
        cy.get('#email').type('hbrenno-nascimento@hotmail.com').should('have.value', 'hbrenno-nascimento@hotmail.com')
        cy.get('#open-text-area').type('Teste').should('have.value', 'Teste')
        cy.contains('.button', 'Enviar').click()
})
