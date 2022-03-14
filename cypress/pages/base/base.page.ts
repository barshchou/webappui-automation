export default class BasePage {
    open(url = "/") {
        cy.visit(url);
    }
    
    get SaveAndContinueBtn(){
        return cy.get("[data-qa='form-submit-btn']");
    }

    get SaveBtn(){
        return cy.get("[data-qa='form-save-btn']");
    }
}