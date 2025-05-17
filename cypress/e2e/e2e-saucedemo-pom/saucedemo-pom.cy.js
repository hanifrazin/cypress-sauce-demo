
import loginPage from "../../pages/loginPage";
import inventoryPage from "../../pages/inventoryPage";

describe('Saucedemo Web Test', () => {
    let loginData, productData;

    beforeEach(() => {
        cy.fixture("loginData").then((data) => {
            loginData = data;

            expect(loginData).to.not.be.undefined;
            expect(loginData).to.exist;
        });
        cy.fixture("productData").then((data) => {
            productData = data;

            expect(productData).to.not.be.undefined;
            expect(productData).to.exist;
        })
    })

    it('Login with valid data',() => {
        loginPage.loginUser(loginData.validUser)
        loginPage.verifyLoginSuccess();
    });

    it('Login with invalid user',() => {
        loginPage.loginUser(loginData.invalidUser);
        loginPage.verifyLoginFailed(loginData.invalidUser.errorMsg);
    });

    it('Login with locked out user',() => {
        loginPage.loginUser(loginData.lockedOutUser);
        loginPage.verifyLoginFailed(loginData.lockedOutUser.errorMsg);
    })

    it('Add to Cart and Checkout', () => {
        cy.login(Cypress.env("valid_username"),Cypress.env("valid_password"));

        // Add to cart 2 products
        inventoryPage.addProductToCart(productData.products);

        // Verify Products in Cart
        inventoryPage.verifyCartItemCount(2);
        cy.get('[data-test="shopping-cart-link"]').click();
        
        //Checkout: Your Information
        cy.url().should('include','cart.html');
        cy.get('[data-test="checkout"]').click();
        cy.get('[data-test="firstName"]').type('Alex');
        cy.get('[data-test="lastName"]').type('Jonatan');
        cy.get('[data-test="postalCode"]').type(11233);
        cy.get('[data-test="continue"]').click();

        //Checkout: Overview
        cy.xpath("(//div[@class='inventory_item_name'])[1]").should('contain','Sauce Labs Backpack');
        cy.xpath("(//div[@class='inventory_item_name'])[2]").should('contain','Sauce Labs Bike Light');
        cy.xpath("//button[@id='finish']").click();

        //Checkout: Complete
        cy.get('[data-test="title"]').should('contain','Checkout: Complete!');
        cy.get('[data-test="complete-header"]').should('contain','Thank you for your order!')
    });
})