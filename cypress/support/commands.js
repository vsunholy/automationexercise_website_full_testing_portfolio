// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

// Cypress.Commands.add('formFill',(userData) => {
//     cy.get('.signup-form input[placeholder="Name"]').type(userData.name);
//     cy.get('.signup-form input[placeholder="Email Address"]').type(userData.email);
//     cy.get('.signup-form button.btn').click();
    
//     cy.get('#id_gender1').click();
//     cy.get('#name').clear().type(userData.name);
//     cy.get('#email').clear({ force: true }).type(userData.email, { force: true });
//     cy.get('#password').type(userData.password);
//     cy.get('#days').select(userData.days);
//     cy.get('#months').select(userData.months);
//     cy.get('#years').select(userData.years);
//     cy.get('#newsletter').click();
//     cy.get('#optin').click();
//     cy.get('#first_name').type(userData.firstName);
//     cy.get('#last_name').type(userData.lastName);
//     cy.get('#company').type(userData.company);
//     cy.get('#address1').type('Test Address');
//     cy.get('#address2').type('Test Address 2');
//     cy.get('#country').select(userData.country);
//     cy.get('#state').type(userData.state);
//     cy.get('#city').type(userData.city);
//     cy.get('#zipcode').type(userData.zipcode);
//     cy.get('#mobile_number').type(userData.mobile);
//     cy.get('.btn[data-qa="create-account"]').click();
//     cy.get('div h2.title').should('be.visible').and('not.empty');
//     cy.get('.btn[data-qa="continue-button"]').click();
//     cy.get('.nav.navbar-nav li').should('contain', `Logged in as ${userData.name}`).and('be.visible');
//     cy.get('a[href="/delete_account"]').click();
//     cy.get('div h2.title').should('be.visible').and('not.empty');
// })

Cypress.Commands.add('regUser', (userData) => {
  // cy.session('creatUser', () => {
    cy.visit('https://automationexercise.com/');
    cy.contains('Signup / Login').click();

    cy.get('input[data-qa="signup-name"]').type(userData.name);
    cy.get('input[data-qa="signup-email"]').type(userData.email);
    cy.get('button[data-qa="signup-button"]').click();
    cy.contains('Enter Account Information').should('be.visible');

    cy.get('#id_gender1').check();
    cy.get('input[data-qa="password"]').type(userData.password);
    cy.get('select[data-qa="days"]').select('1');
    cy.get('select[data-qa="months"]').select('January');
    cy.get('select[data-qa="years"]').select('1990');
    cy.get('#newsletter').click();
    cy.get('#optin').click();
    cy.get('#first_name').type('sadasdas');
    cy.get('#last_name').type('ssadasdasd');
    cy.get('#company').type('dsadasdsa');
    cy.get('#address1').type('Test Address');
    cy.get('#address2').type('Test Address 2');
    cy.get('#country').select('United States');
    cy.get('#state').type('dasdasdasd');
    cy.get('#city').type('dasdasdasd');
    cy.get('#zipcode').type('1231231');
    cy.get('#mobile_number').type('12123123');

    cy.get('button[data-qa="create-account"]').click();

    cy.contains('Account Created!').should('be.visible');
    cy.contains('Continue').click();

    // Optionally, you can verify that the user is logged in, for example:
    cy.contains(`Logged in as ${userData.name}`).should('be.visible');
  // });
});

  Cypress.Commands.add('deleteUser', (userData) => {
    cy.contains(`Logged in as ${userData.name}`).should('be.visible');
    cy.contains('Delete Account').click();
    cy.contains('Account Deleted!').should('be.visible');
    cy.contains('Continue').click();
  }) 

  Cypress.Commands.add('fastDelete', () => {
    cy.contains('Delete Account').click();
    cy.contains('Account Deleted!').should('be.visible');
    cy.contains('Continue').click();
  })


  Cypress.Commands.add('homePgVisible',() => {
    cy.get('#slider-carousel > .carousel-inner').should('be.visible');
  })

  Cypress.Commands.add('login', (userData) => {
    cy.visit('http://automationexercise.com');
    cy.contains('Signup / Login').click();

    cy.contains('Login to your account').should('be.visible');
    cy.get('input[data-qa="login-email"]').type(userData.email);
    cy.get('input[data-qa="login-password"]').type(userData.password);
    cy.get('button[data-qa="login-button"]').click();

    cy.contains(`Logged in as ${userData.name}`).should('be.visible');
  }
  );