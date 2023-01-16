
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html')      
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Hécktor').should('have.value', 'Hécktor')
        cy.get('#lastName').type('Nascimento').should('have.value', 'Nascimento')
        cy.get('#email').type('hbrenno-nascimento@hotmail.com').should('have.value', 'hbrenno-nascimento@hotmail.com')
        cy.get('#open-text-area').type('Teste automatizado com Cypress', {delay: 0}).should('have.value', 'Teste automatizado com Cypress')
        cy.contains('button', 'Enviar').click().get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Hécktor')
        cy.get('#lastName').type('Nascimento')
        cy.get('#email').type('hbrenno-nascimentohotmailcom')
        cy.get('#open-text-area').type('Teste automatizado com Cypress', {delay: 0}).should('have.value', 'Teste automatizado com Cypress')
        cy.contains('button', 'Enviar').click().get('.error').should('be.visible')
    })

    it('verifica que o textbox de telefone permanece vazio ao tentar digitar letras', function() {
        cy.get('#phone').type('Teste Cypress').should('be.empty')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Hécktor')
        cy.get('#lastName').type('Nascimento')
        cy.get('#email').type('hbrenno-nascimentohotmailcom')
        cy.get('#open-text-area').type('Teste automatizado com Cypress', {delay: 0}).should('have.value', 'Teste automatizado com Cypress')
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click().get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Hécktor').should('have.value', 'Hécktor').clear().should('be.empty')
        cy.get('#lastName').type('Nascimento').should('have.value', 'Nascimento').clear().should('be.empty')
        cy.get('#email').type('hbrenno-nascimento@hotmail.com').should('have.value', 'hbrenno-nascimento@hotmail.com').clear().should('be.empty')
        cy.get('#phone').type('12345678').should('have.value', '12345678').clear().should('be.empty')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it.only('seleciona um arquivo da pasta fixtures', function() {
        cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
})