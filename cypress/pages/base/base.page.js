class BasePage {
    get yesButton() {return cy.get("*[name='form-confirm-submit-btn']")}
    get noButton() {return cy.get("*[name='form-confirm-reject-btn']")}
    get returnToHomePageButton() {return cy.get("*[href='/reports']")}
}

export default BasePage