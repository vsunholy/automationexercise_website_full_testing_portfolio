import { faker } from '@faker-js/faker';

describe('http://automationexercise.com Register User tests', _ => {


    const randomEmail = faker.internet.email();

    beforeEach(() => {
        cy.visit('http://automationexercise.com')
    });

    it('Navigate to url http://automationexercise.com', () => {
        cy.get('h1').should('contain', 'AutomationExercise')
            .and('be.visible');

    })
    it('Click on Signup/Login button', () => {
        cy.get('a[href="/login"]').click();
        cy.contains('div.signup-form h2', 'New User Signup!').should('be.visible');
        cy.get('.signup-form input[placeholder="Name"]')
            .should('be.visible')
            .type('Test User');
        cy.get('.signup-form input[placeholder="Email Address"]')
            .should('be.visible')
            .type(randomEmail);
        cy.get('.signup-form button.btn').click();
        cy.get('.login-form h2').should('be.visible');
        cy.get('#id_gender1').should('be.visible').click();
        cy.get('#name').clear().type('Test User');
        cy.get('#email').clear({ force: true }).type(randomEmail, { force: true });
        cy.get('#password').type('Test1234');
        cy.get('#days').select('7');
        cy.get('#months').select('2');
        cy.get('#years').select('1993');
        cy.get('#newsletter').click();
        cy.get('#optin').click();
        cy.get('#first_name').type('Test');
        cy.get('#last_name').type('User');
        cy.get('#company').type('Test Company');
        cy.get('#address1').type('Test Address');
        cy.get('#address2').type('Test Address 2');
        cy.get('#country').select('United States');
        cy.get('#state').type('Bobruisk state');
        cy.get('#city').type('Bobruisk');
        cy.get('#zipcode').type('12345');
        cy.get('#mobile_number').type('123456789');
        cy.get('.btn[data-qa="create-account"]').click();
        cy.get('div h2.title').should('be.visible').and('not.empty');
        cy.get('.btn[data-qa="continue-button"]').click();
        cy.get('.nav.navbar-nav li').should('contain', 'Logged in as Test User').and('be.visible');
        cy.get('a[href="/delete_account"]').click();
        cy.get('div h2.title').should('be.visible').and('not.empty');

    });
});
