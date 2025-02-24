/// <reference types="cypress" />

describe('Automation Exercise API Tests', () => {

    const baseUrl = 'https://automationexercise.com/api';

    it('GET - Verify all products list', () => {
        cy.request('GET', `${baseUrl}/productsList`).then((response) => {
            cy.log('Raw Response Body:', response.body);

            let responseBody;
            try {
                responseBody = typeof response.body === 'string' 
                    ? JSON.parse(response.body) 
                    : response.body;
            } catch (error) {
                throw new Error('Failed to parse JSON response: ' + error.message);
            }

            cy.log('Parsed Response Body:', JSON.stringify(responseBody, null, 2));

            expect(response.status).to.eq(200);
            expect(responseBody).to.have.property('responseCode', 200);
            expect(responseBody.products).to.be.an('array').and.not.empty;

            responseBody.products.forEach(product => {
                expect(product).to.have.all.keys('id', 'name', 'price', 'brand', 'category');
                expect(product.category).to.be.an('object');
                expect(product.category).to.have.all.keys('usertype', 'category');
                expect(product.category.usertype).to.have.property('usertype');

                expect(product.id).to.be.a('number');
                expect(product.name).to.be.a('string');
                expect(product.price).to.be.a('string');
            });
        });
    });

    it('POST - Search product', () => {
        cy.request('POST', `${baseUrl}/searchProduct`, { search: 'Top' }).then((response) => {
            cy.log('Raw Response Body:', response.body);

            let responseBody;
            try {
                responseBody = typeof response.body === 'string' 
                    ? JSON.parse(response.body) 
                    : response.body;
            } catch (error) {
                throw new Error('Failed to parse JSON response: ' + error.message);
            }

            cy.log('Parsed Response Body:', JSON.stringify(responseBody, null, 2));

            expect(response.status).to.eq(200);
            expect(responseBody).to.have.property('responseCode', 200);
            expect(responseBody.products).to.be.an('array').and.not.empty;
        });
    });

    it('POST - Verify user login with invalid credentials', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/verifyLogin`,
            failOnStatusCode: false,
            body: { email: 'invalid@example.com', password: 'wrongpassword' }
        }).then((response) => {
            cy.log('Raw Response Body:', response.body);

            let responseBody;
            try {
                responseBody = typeof response.body === 'string' 
                    ? JSON.parse(response.body) 
                    : response.body;
            } catch (error) {
                throw new Error('Failed to parse JSON response: ' + error.message);
            }

            cy.log('Parsed Response Body:', JSON.stringify(responseBody, null, 2));

            expect(response.status).to.eq(404);
            expect(responseBody).to.have.property('message', 'User not found!');
        });
    });

    it('DELETE - Delete non-existent account', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/deleteAccount`,
            failOnStatusCode: false,
            body: { email: 'nonexistent@example.com' }
        }).then((response) => {
            cy.log('Raw Response Body:', response.body);

            let responseBody;
            try {
                responseBody = typeof response.body === 'string' 
                    ? JSON.parse(response.body) 
                    : response.body;
            } catch (error) {
                throw new Error('Failed to parse JSON response: ' + error.message);
            }

            cy.log('Parsed Response Body:', JSON.stringify(responseBody, null, 2));

            expect(response.status).to.eq(404);
            expect(responseBody).to.have.property('message', 'Account not found!');
        });
    });
});
