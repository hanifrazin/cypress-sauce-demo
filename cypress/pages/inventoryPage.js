class intentoryPage {
    verifyIntentoryPage(){
        cy.url().should('include','inventory.html');
        cy.get('.app_logo').should('contain','Swag Labs');
    }

    addProductToCart(productNames){
        productNames.forEach(name => {
            cy.get(`#add-to-cart-${name}`).click();
            cy.get(`#add-to-cart-${name}`).should('not.exist');
            cy.get(`#remove-${name}`).should('be.visible');
        })
    }

    verifyCartItemCount(expectedCount){
        cy.get('[data-test="shopping-cart-link"]').should('have.text',`${expectedCount}`);
    }
}

export default new intentoryPage();