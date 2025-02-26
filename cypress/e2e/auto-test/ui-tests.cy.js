/// <reference types = "cypress" />

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
        cy.homePgVisible();
        cy.deleteUser(userData);
        cy.regUser(userData);
        cy.deleteUser(userData);
    });

    context('Re-create Account for Login', () => {

        before(() => {
            cy.visit('http://automationexercise.com');
            cy.regUser(userData);
            cy.contains('Logout').click();
        });

        it('Test Case 2: Login with Re-Created Account', () => {
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
    context('Test Case 3', () => {
        it('Verify that home page is visible successfully', () => {
            cy.homePgVisible();

        });
        it('Login User with incorrect email and password', () => {
            cy.contains('Signup / Login').click();
            cy.get('input[data-qa="login-email"]').type('ghghgh@gmail.com');
            cy.get('input[data-qa="login-password"]').type(userData.password);
            cy.get('button[data-qa="login-button"]').click();
            cy.contains('Your email or password is incorrect!').should('be.visible')
        });

    })

    context('Test Case 4', () => {
        before(() => {
            cy.visit('http://automationexercise.com');
            cy.regUser(userData);
            cy.contains('Logout').click();
        });
        it('Verify that home page is visible successfully', () => {
            cy.homePgVisible();

        });

        it('Logout User', () => {
            cy.contains('Signup / Login').click()
            cy.contains('Login to your account').should('be.visible');
            cy.get('input[data-qa="login-email"]').type(userData.email);
            cy.get('input[data-qa="login-password"]').type(userData.password);
            cy.get('button[data-qa="login-button"]').click();

            cy.contains(`Logged in as ${userData.name}`).should('be.visible');
            cy.contains('Logout').click();
            cy.url().should('include', '/login');

        });





    })
    context('Test Case 5', () => {


        it('Verify that home page is visible successfully', () => {
            cy.homePgVisible();

        });

        it('Register User with existing email', () => {
            cy.contains('Signup / Login').click();
            cy.contains('New User Signup!').should('be.visible');
            cy.get('input[data-qa="signup-name"]').type(userData.name);
            cy.get('input[data-qa="signup-email"]').type(userData.email);
            cy.get('button[data-qa="signup-button"]').click();
            cy.contains('Email Address already exist!').should('be.visible');
        });

    });

    context('Test Case 6', () => {
        it('Verify that home page is visible successfully', () => {
            cy.homePgVisible();

        });
        it('Contact Us Form', () => {
            cy.contains('Contact us').click();
            cy.contains('Get In Touch').should('be.visible');
            cy.get('input[data-qa="name"]').type(userData.name);
            cy.get('input[data-qa="email"]').type(userData.email);
            cy.get('input[data-qa="subject"]').type('Beaver got scammed');
            cy.get('#message').type('Beaver got scammed by your website');
            cy.get('input[name="upload_file"]').attachFile('todos.csv');
            cy.contains('Submit').click();
            cy.contains('Success! Your details have been submitted successfully.').should('be.visible');
            cy.contains('Home').click();
            cy.url().should('eq', 'https://automationexercise.com/');
        })
    });
    context('Test Case 7', () => {
        it('Verify that home page is visible successfully', () => {
            cy.homePgVisible();

        });

        it('Verify Test Cases Page', () => {
            cy.contains('Test Cases').click();
            cy.url().should('eq', 'https://automationexercise.com/test_cases');

        })

    })

    context('Test Case 8', () => {

        it('Verify that home page is visible successfully', () => {
            cy.homePgVisible();

        });

        it('Verify All Products and product detail page', () => {
            cy.contains('Products').click();
            cy.url().should('eq', 'https://automationexercise.com/products');
            cy.get('.features_items').should('be.visible');
            cy.get('a[href="/product_details/1"]').click();
            cy.url().should('eq', 'https://automationexercise.com/product_details/1');
            cy.get('.product-information').should('be.visible').within(() => {

                cy.get('h2').should('be.visible');

                cy.contains('Category').should('be.visible');

                cy.contains('Rs. 500').should('be.visible');

                cy.contains('Availability').should('be.visible');

                cy.contains('Condition').should('be.visible');

                cy.contains('Brand').should('be.visible');
            });
        })
    })
    context('Test Case 9', () => {

        it('Verify that home page is visible successfully', () => {
            cy.homePgVisible();

        });

        it('Search Product', () => {

            cy.contains('Products').click();
            cy.url().should('eq', 'https://automationexercise.com/products');
            cy.get('#search_product').type('Little Girls Mr. Panda Shirt');
            cy.get('#submit_search').click();
            cy.contains('Searched Products').should('be.visible');
            cy.contains('Little Girls Mr. Panda Shirt').should('be.visible');

        })

    })
    context('Test Case 10', () => {

        it('Verify that home page is visible successfully', () => {
            cy.homePgVisible();

        });
        it('Verify Subscription in home page', () => {

            cy.contains('Subscription').should('be.visible');
            cy.get('#susbscribe_email').type(userData.email);
            cy.get('#subscribe').click();
            cy.contains('You have been successfully subscribed!').should('be.visible');

        })

    })
    context('Test Case 11', () => {

        it('Verify that home page is visible successfully', () => {
            cy.homePgVisible();

        });
        it('Verify Subscription in Cart page', () => {

            cy.contains('Cart').click();
            cy.contains('Subscription').should('be.visible');
            cy.get('#susbscribe_email').type(userData.email);
            cy.get('#subscribe').click();
            cy.contains('You have been successfully subscribed!').should('be.visible');


        })


    })
    context('Test Case 12', () => {

        it('Verify that home page is visible successfully', () => {
            cy.homePgVisible();

        });
        it('Add Products in Cart', () => {
            cy.contains('Products').click();
            cy.get('.features_items .col-sm-4')
                .first()
                .trigger('mouseover')
                .find('a')
                .contains('Add to cart')
                .click();

            cy.contains('Continue Shopping').click();

            cy.get('.features_items .col-sm-4')
                .eq(1)
                .trigger('mouseover')
                .find('a')
                .contains('Add to cart')
                .click();

            cy.contains('View Cart').click();
            cy.get('table.table tbody tr').should('have.length', 2);
            cy.get('table.table tbody tr').each(($row) => {
                cy.wrap($row).find('td').eq(1).should('not.be.empty');
                cy.wrap($row).find('td').eq(2).should('not.be.empty');
                cy.wrap($row).find('td').eq(3).should('not.be.empty');
            });

        })
    })
    context('Test Case 13', () => {

        it('Verify that home page is visible successfully', () => {
            cy.homePgVisible();

        });

        it.only(' Verify Product quantity in Cart', () => {

            cy.get('a[href="/product_details/1"]').click();
            cy.get('.product-information').should('be.visible');
            cy.get('#quantity').clear().type('4');
            cy.contains('Add to cart').click();
            cy.contains('View Cart').click();
            cy.get('.cart_quantity').should('contain.text', '4');

        })

    })

});
