class loginPage{
    visit(){
        cy.visit('/')
    }

    fillUsername(username){
        cy.get('#user-name').clear().type(username);
    }

    fillPassword(password){
        cy.get('#password').clear().type(password);
    }

    clickLogin(){
        cy.get('#login-button').click();
    }

    verifyLoginSuccess(){
        cy.url().should('include','inventory.html');
        cy.get('.app_logo').should('contain','Swag Labs');
    }

    verifyLoginFailed(msg){
        cy.url().should('include','/');
        cy.get("[data-test='error']").should('be.visible').and('contain',msg);
    }

    loginUser(userData){
        this.visit();
        this.fillUsername(userData.username);
        this.fillPassword(userData.password);
        this.clickLogin();
    }
}

export default new loginPage();