

describe('Automation Exercise - Register, Delete, and Re-Register for Login', () => {
    const userData = {
        name: 'TestUserBebr',
        email: 'beberis@gmail.com',
        password: 'password123',

    };
    beforeEach(() => {
        cy.visit('http://automationexercise.com');
    });

    it('Test Case 1: Register and Delete Account', () => {

        cy.regUser(userData);
        cy.deleteUser(userData);
    });

    context('Re-create Account for Login', () => {

        before(() => {
            cy.visit('http://automationexercise.com');
            cy.regUser(userData);
            cy.contains('Logout').click();
        });

        it.only('Test Case 2: Login with Re-Created Account', () => {
            cy.visit('http://automationexercise.com');
            cy.contains('Signup / Login').click();

            cy.contains('Login to your account').should('be.visible');
            cy.get('input[data-qa="login-email"]').type(userData.email);
            cy.get('input[data-qa="login-password"]').type(userData.password);
            cy.get('button[data-qa="login-button"]').click();

            cy.contains(`Logged in as ${userData.name}`).should('be.visible');
            cy.deleteUser(userData);
        });
    });
});
