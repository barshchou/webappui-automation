export default class BaseActions {

    clickYesButton() {
        cy.get("*[name='form-confirm-submit-btn']").should("be.visible").click()
    }

    clickNoButton() {
        cy.get("*[name='form-confirm-reject-btn']").should("be.visible").click()
    }

    clickReturnToHomePageButton() {
        cy.get("*[href='/reports']").should("be.visible").click()
    }

    returnToHomePageAndSave() {
        this.clickReturnToHomePageButton()
        this.clickYesButton()
    }

    goBackWithSave() {
        cy.go('back')
        this.clickYesButton()
    }
}