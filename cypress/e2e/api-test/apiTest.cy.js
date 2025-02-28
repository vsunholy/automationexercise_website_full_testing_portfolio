/// <reference types="cypress" />
const baseUrl = 'https://automationexercise.com/api';
describe('Api Test Case 1', () => {



    it(' Verify all products list', () => {
        cy.request('GET', `${baseUrl}/productsList`).then((response) => {


            let responseBody;
            try {
                responseBody = typeof response.body === 'string'
                    ? JSON.parse(response.body)
                    : response.body;
            } catch (error) {
                throw new Error('Failed to parse JSON response: ' + error.message);
            }

            ;

            expect(response.status).to.eq(200);
            expect(responseBody).to.have.property('responseCode', 200);
            expect(responseBody.products).to.be.an('array').and.not.empty;

            const productIds = responseBody.products.map(product => product.id);
            const uniqueIds = new Set(productIds);
            expect(uniqueIds.size).to.eql(productIds.length);

            responseBody.products.forEach(product => {
                expect(product).to.have.all.keys('id', 'name', 'price', 'brand', 'category');
                expect(product.category).to.be.an('object');
                expect(product.category).to.have.all.keys('usertype', 'category');
                expect(product.category.usertype).to.have.property('usertype');

                expect(product.id).to.be.a('number');
                expect(product.name).to.be.a('string');
                expect(product.price).to.be.a('string');
                expect(product.brand).to.be.a('string');
                expect(product.category.usertype.usertype).to.be.a('string');
                expect(product.category.category).to.be.a('string');
            });
        });
    });
});

describe('Api Test Case 2', () => {
    it('validates Product POST request behavior', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/productsList`,
            failOnStatusCode: false
        }).then((response) => {




            let jsonData;
            try {
                jsonData = typeof response.body === 'string'
                    ? JSON.parse(response.body)
                    : response.body;
            } catch (error) {
                throw new Error('Failed to parse JSON response: ' + error.message);
            }



            expect(response.status).to.equal(200);


            expect(jsonData.responseCode).to.be.a('number').and.equal(405);

            expect(jsonData.message).to.be.a('string').and.equal('This request method is not supported.');
        });
    });
});

describe('API Test Case 3', () => {
    it('validates GET AllBrands request behavior', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/brandsList`,
            failOnStatusCode: false
        }).then((response) => {


            let respData;
            try {
                respData = typeof response.body === 'string'
                    ? JSON.parse(response.body)
                    : response.body;
            } catch (error) {
                throw new Error('Failed to parse JSON response: ' + error.message);
            }




            expect(respData).to.have.property('brands').and.to.be.an('array').that.is.not.empty;
            respData.brands.forEach((brand) => {
                expect(brand).to.have.all.keys('id', 'brand');
            });


            respData.brands.forEach((brand) => {
                expect(brand.id).to.be.a('number');
                expect(brand.brand).to.be.a('string');
            });

            expect(response.status).to.equal(200);
            expect(respData).to.have.property('responseCode', 200);


            expect(response.duration).to.be.below(1000);
        });
    });
});
describe('API Test Case 4', () => {
    it('validates  Brands Put request behavior', () => {
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/brandsList`,
            failOnStatusCode: false
        }).then((response) => {


            let respData;
            try {
                respData = typeof response.body === 'string'
                    ? JSON.parse(response.body)
                    : response.body;
            } catch (error) {
                throw new Error('Failed to parse JSON response: ' + error.message);
            }



            expect(response.status).to.equal(200);


            expect(respData.responseCode).to.be.a('number').and.equal(405);

            expect(respData.message).to.be.a('string').and.equal('This request method is not supported.');
        });
    });
});

describe('API TEST CASE 5 searchProduct Endpoint', () => {
    it('validates POST request behavior', () => {

        const searchTerm = 'top';


        cy.request({
            method: 'POST',
            url: `${baseUrl}/searchProduct`,
            body: {
                search_product: searchTerm
            },
            form: true,
            failOnStatusCode: false
        }).then((response) => {




            let respData;
            try {
                respData = typeof response.body === 'string'
                    ? JSON.parse(response.body)
                    : response.body;
            } catch (error) {
                throw new Error('Failed to parse JSON response: ' + error.message);
            }



            expect(respData).to.have.property('products').and.to.be.an('array').that.is.not.empty;
            respData.products.forEach((product) => {
                expect(product).to.have.property('id');
                expect(product).to.have.property('name');
                expect(product).to.have.property('price');
                expect(product).to.have.property('brand');
                expect(product).to.have.property('category');
                expect(product.category).to.have.property('usertype');
                expect(product.category.usertype).to.have.property('usertype');
                expect(product.category).to.have.property('category');
            });


            respData.products.forEach((product) => {
                expect(product.id).to.be.a('number');
                expect(product.name).to.be.a('string');
                expect(product.price).to.be.a('string');
                expect(product.brand).to.be.a('string');
                expect(product.category).to.be.an('object');
                expect(product.category.usertype).to.be.an('object');
                expect(product.category.usertype.usertype).to.be.a('string');
                expect(product.category.category).to.be.a('string');
            });


            expect(response.status).to.equal(200);
            expect(respData).to.have.property('responseCode').and.equal(200);

            expect(response.duration).to.be.below(1000);
        });
    });
});

describe('API 6: POST To Search Product without search_product parameter', () => {


    it('validates POST request behavior', () => {

        cy.request({
            method: 'POST',
            url: `${baseUrl}/searchProduct`,
            form: true,
            failOnStatusCode: false
        }).then((response) => {


            let respData;
            try {
                respData = typeof response.body === 'string'
                    ? JSON.parse(response.body)
                    : response.body;
            } catch (error) {
                throw new Error('Failed to parse JSON response: ' + error.message);
            }

            expect(response.status).to.equal(200);


            expect(respData.responseCode).to.be.a('number').and.equal(400);

            expect(respData.message).to.be.a('string').and.equal('Bad request, search_product parameter is missing in POST request.');
        });
    });

});

describe('API 7: POST To Verify Login with valid details', () => {
    it('validates POST request behavior', () => {

        const loginData = {
            email: 'bebras228@gmail.com',
            password: '12345'

        };
        cy.request({
            method: 'POST',
            url: `${baseUrl}/verifyLogin`,
            body: loginData,
            form: true,
            failOnStatusCode: false
        }).then((response) => {


            let respData;
            try {
                respData = typeof response.body === 'string'
                    ? JSON.parse(response.body)
                    : response.body;
            } catch (error) {
                throw new Error('Failed to parse JSON response: ' + error.message);
            }

            expect(response.status).to.equal(200);


            expect(respData.responseCode).to.be.a('number').and.equal(200);

            expect(respData.message).to.be.a('string').and.equal('User exists!');
        });

    });
});

describe('API 8: POST To Verify Login without email parameter', () => {
    it('validates POST request behavior  without email parameter', () => {

        const loginData = {
            password: '12345'

        };

        cy.request({
            method: 'POST',
            url: `${baseUrl}/verifyLogin`,
            body: loginData,
            form: true,
            failOnStatusCode: false
        }).then((response) => {


            let respData;
            try {
                respData = typeof response.body === 'string'
                    ? JSON.parse(response.body)
                    : response.body;
            } catch (error) {
                throw new Error('Failed to parse JSON response: ' + error.message);
            }

            expect(response.status).to.equal(200);


            expect(respData.responseCode).to.be.a('number').and.equal(400);

            expect(respData.message).to.be.a('string').and.equal('Bad request, email or password parameter is missing in POST request.');
        });

    });

});

describe('API 9: DELETE To Verify Login', () => {
    it('validates DELETE request behavior', () => {

        const loginData = {
            email: 'bebras228@gmail.com',
            password: '12345'
        };
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/verifyLogin`,
            body: loginData,
            form: true,
            failOnStatusCode: false
        }).then((response) => {
            let respData;
            try {
                respData = typeof response.body === 'string'
                    ? JSON.parse(response.body)
                    : response.body;
            } catch (error) {
                throw new Error('Failed to parse JSON response: ' + error.message);
            }

            expect(response.status).to.equal(200);

            expect(respData.responseCode).to.be.a('number').and.equal(405);

            expect(respData.message).to.be.a('string').and.equal('This request method is not supported.');
        });
    });
});

describe('API 10: POST To Verify Login with invalid details', () => {
    it('validates POST request behavior', () => {

        const loginData = {
            email: 'animelover3000@gmail.com',
            password: 'dasdasdasd'
        };
        cy.request({
            method: 'POST',
            url: `${baseUrl}/verifyLogin`,
            body: loginData,
            form: true,
            failOnStatusCode: false
        }).then((response) => {


            let respData;
            try {
                respData = typeof response.body === 'string'
                    ? JSON.parse(response.body)
                    : response.body;
            } catch (error) {
                throw new Error('Failed to parse JSON response: ' + error.message);
            }

            expect(response.status).to.equal(200);


            expect(respData.responseCode).to.be.a('number').and.equal(404);

            expect(respData.message).to.be.a('string').and.equal('User not found!');
        });
    });
});

describe('API 11: POST To Create/Register User Account', () => {
    it('validates POST request behavior', () => {

        const userData = {
            name: 'bebras',
            email: 'bebruni30001@gmail.com',
            password: '12345',
            birth_date: '01',
            birth_month: '02',
            birth_year: '1982',
            firstname: 'gaidys',
            lastname: 'azuolas',
            company: 'paukstynas',
            address1: 'dsadas',
            address2: 'dsadasdas',
            country: 'United States',
            zipcode: '12334',
            state: 'sdsadasda',
            city: 'cringe',
            mobile_number: '1231231',
        };
        cy.request({
            method: 'POST',
            url: `${baseUrl}/createAccount`,
            body: userData,
            form: true,
            failOnStatusCode: false
        }).then((response) => {


            let respData;
            try {
                respData = typeof response.body === 'string'
                    ? JSON.parse(response.body)
                    : response.body;
            } catch (error) {
                throw new Error('Failed to parse JSON response: ' + error.message);
            }

            expect(response.status).to.equal(200);


            expect(respData.responseCode).to.be.a('number').and.equal(201);

            expect(respData.message).to.be.a('string').and.equal('User created!');
        });
    });
});


describe('API 13: PUT METHOD To Update User Account', () => {
    it('validates PUT request behavior', () => {
        const userData = {
            name: 'bebras',
            email: 'bebruni30001@gmail.com',
            password: '12345',
            title: 'Mr',
            birth_date: '01',
            birth_month: '02',
            birth_year: '1982',
            firstname: 'gaidys',
            lastname: 'azuolas',
            company: 'paukstynas',
            address1: 'dsadas',
            address2: 'dsadasdas',
            country: 'United States',
            zipcode: '12334',
            state: 'sdsadasda',
            city: 'cringe',
            mobile_number: '1231231',
        };

        cy.request({
            method: 'PUT',
            url: 'https://automationexercise.com/api/updateAccount',
            body: userData,
            form: true, 
            failOnStatusCode: false,
        }).then((response) => {
            cy.log('Response Status:', response.status);
            cy.log('Response Body:', response.body);

            let respData;
            try {
                respData = typeof response.body === 'string'
                    ? JSON.parse(response.body)
                    : response.body;
            } catch (error) {
                cy.log('Parse Error:', error.message);
                throw new Error('Failed to parse JSON response: ' + error.message);
            }

            expect(response.status).to.equal(200);
            expect(respData.responseCode).to.be.a('number').and.equal(200);
            expect(respData.message).to.be.a('string').and.equal('User updated!');
        });
    });
});
describe('API 14: GET user account detail by email', () => {
    it.only('API 14: GET user account detail by email', () => {
        const user = {
            email: 'bebruni30001@gmail.com' // Customized email
        };
    
        cy.request({
            method: 'GET',
            url: 'https://automationexercise.com/api/getUserDetailByEmail',
            qs: user
        })
            .then((response) => {
                expect(response.status).to.eq(200);
                let data = JSON.parse(response.body);
                expect(data.responseCode).to.eq(200);
    
                expect(data).to.have.property('user').and.not.empty;
                expect(data.user).to.be.an('object').and.not.empty;
                expect(data.user).to.have.property('id');
                expect(data.user).to.have.property('name');
                expect(data.user).to.have.property('email');
                expect(data.user).to.have.property('title');
                expect(data.user).to.have.property('birth_day');
                expect(data.user).to.have.property('birth_month');
                expect(data.user).to.have.property('birth_year');
                expect(data.user).to.have.property('first_name');
                expect(data.user).to.have.property('last_name');
                expect(data.user).to.have.property('company');
                expect(data.user).to.have.property('address1');
                expect(data.user).to.have.property('address2');
                expect(data.user).to.have.property('country');
                expect(data.user).to.have.property('state');
                expect(data.user).to.have.property('city');
                expect(data.user).to.have.property('zipcode');
    
            });
    });
});
describe('API 12: DELETE METHOD To Delete User Account', () => {
    it('validates DELETE request behavior', () => {

        const userData = {
            email: 'bebruni30001@gmail.com',
            password: '12345'
        };
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/deleteAccount`,
            body: userData,
            form: true,
            failOnStatusCode: false
        }).then((response) => {


            let respData;
            try {
                respData = typeof response.body === 'string'
                    ? JSON.parse(response.body)
                    : response.body;
            } catch (error) {
                throw new Error('Failed to parse JSON response: ' + error.message);
            }

            expect(response.status).to.equal(200);


            expect(respData.responseCode).to.be.a('number').and.equal(200);

            expect(respData.message).to.be.a('string').and.equal('Account deleted!');
        });

    });
});