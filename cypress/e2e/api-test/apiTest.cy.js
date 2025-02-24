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