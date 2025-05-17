describe('Saucedemo Web Test', () => {
    it('Login with valid data', () => {
        cy.visit('https://www.saucedemo.com/')
        //Login
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('include','inventory.html');
        cy.get('.app_logo').should('contain','Swag Labs');
    })

    it('Add to Cart and Checkout', () => {
        
        cy.visit('https://www.saucedemo.com/')
        //Login
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('include','inventory.html');
        cy.get('.app_logo').should('contain','Swag Labs');

        // Add to cart 2 products
        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('#add-to-cart-sauce-labs-backpack').should('not.exist');
        cy.get('#remove-sauce-labs-backpack').should('be.visible');
        cy.get('#add-to-cart-sauce-labs-bike-light').click();
        cy.get('#add-to-cart-sauce-labs-bike-light').should('not.exist');
        cy.get('#remove-sauce-labs-bike-light').should('be.visible');

        // Verify Products in Cart
        cy.get('[data-test="shopping-cart-link"]').should('have.text','2');
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.url().should('include','cart.html');

        //Checkout: Your Information
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
    })
})