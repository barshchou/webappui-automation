export default class BaseActions {

    clickYesButton() {
        cy.get("*[name='form-confirm-submit-btn']").click();
    }

    clickNoButton() {
        cy.get("*[name='form-confirm-reject-btn']").click();
    }

    returnToHomePage() {
        cy.visit("/reports");
    }

    goBackWithSave() {
        cy.go("back");
        this.clickYesButton();
    }

    goBackWithoutSave() {
        cy.go("back");
        this.clickNoButton();
    }

    clickSaveButton() {
        cy.get("*[data-qa='form-save-btn']").should("be.visible").click();
    }

    clickSaveContinueButton() {
        cy.get("*[data-qa='form-submit-btn']").click();
    }

    verifyProgressBarNotExist() {
        cy.get("*[role='progressbar']").should("not.exist");
    }
}
