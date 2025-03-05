# 🚀 Automation Exercise Test Suite

[![Cypress](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)
[![API Tests](https://img.shields.io/badge/API%20Tests-14%20passing-brightgreen.svg)]()
[![UI Tests](https://img.shields.io/badge/UI%20Tests-20%20passing-brightgreen.svg)]()

A comprehensive test automation framework for [Automation Exercise](https://automationexercise.com) website using Cypress. This repository contains both API and UI tests to showcase different testing techniques and best practices.

## 📋 Table of Contents

- [Features](#features)
- [Test Coverage](#test-coverage)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Custom Commands](#custom-commands)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Dual Testing Approach**: Complete API and UI test coverage
- **Custom Commands**: Reusable functions for common operations
- **Test Data Management**: Efficient handling of user data
- **Clean Architecture**: Well-structured test organization
- **Comprehensive Assertions**: Thorough validation of application behavior

## 🧪 Test Coverage

### API Tests
The API test suite (`apiTest.cy.js`) includes 14 test cases that verify:

- Product listing and search functionality
- Brand management operations
- User authentication flows
- Account creation, update, and deletion
- Response validation for both successful and error scenarios
- Support for different HTTP methods (GET, POST, PUT, DELETE)

### UI Tests
The UI test suite (`ui-tests.cy.js`) includes 20 test cases covering:

- User registration and authentication
- Product browsing and searching
- Shopping cart functionality
- Checkout process
- Account management
- Contact form submission
- Category and brand navigation
- Subscription features

## 📁 Project Structure

```
├── cypress/
│   ├── e2e/
│   │   ├── apiTest.cy.js       # API Test Suite
│   │   └── ui-tests.cy.js      # UI Test Suite
│   ├── fixtures/               # Test Data Files
│   ├── support/
│   │   ├── commands.js         # Custom Cypress Commands
│   │   └── e2e.js              # Support File
│   └── videos/                 # Test Execution Recordings
├── cypress.config.js           # Cypress Configuration
├── package.json                # Project Dependencies
└── README.md                   # Project Documentation
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/automationexercise_website_full_testing_portfolio.git
   cd automation-exercise-test-suite
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## 🏃‍♂️ Running Tests

### Run All Tests

```bash
npx cypress run
```

### Run API Tests Only

```bash
npx cypress run --spec "cypress/e2e/apiTest.cy.js"
```

### Run UI Tests Only

```bash
npx cypress run --spec "cypress/e2e/ui-tests.cy.js"
```

### Open Cypress Test Runner

```bash
npx cypress open
```

## 🛠️ Custom Commands

The framework includes several custom commands to simplify test writing:

- `homePgVisible()` - Verifies the home page is loaded successfully
- `regUser(userData)` - Registers a new user with the provided data
- `login(userData)` - Logs in with the provided credentials
- `deleteUser(userData)` - Deletes a user account
- `fastDelete()` - Quick account deletion for cleanup

## 📝 Test Case Examples

### API Test Example

```javascript
describe('API Test Case 1', () => {
    it('Verify all products list', () => {
        cy.request('GET', `${baseUrl}/productsList`).then((response) => {
            // Parse response body
            let responseBody = JSON.parse(response.body);

            // Validate status and response code
            expect(response.status).to.eq(200);
            expect(responseBody).to.have.property('responseCode', 200);
            
            // Validate product data structure
            expect(responseBody.products).to.be.an('array').and.not.empty;
            // Additional validations...
        });
    });
});
```

### UI Test Example

```javascript
it('Register User with existing email', () => {
    cy.contains('Signup / Login').click();
    cy.contains('New User Signup!').should('be.visible');
    cy.get('input[data-qa="signup-name"]').type(userData.name);
    cy.get('input[data-qa="signup-email"]').type(userData.email);
    cy.get('button[data-qa="signup-button"]').click();
    cy.contains('Email Address already exist!').should('be.visible');
});
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

⭐ If you find this repository helpful, please consider giving it a star!
