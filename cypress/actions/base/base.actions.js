export default class BaseActions {

    clickYesButton() {
        cy.get("*[name='form-confirm-submit-btn']").should("be.visible").click();
    }

    clickNoButton() {
        cy.get("*[name='form-confirm-reject-btn']").should("be.visible").click();
    }

    clickReturnToHomePageButton() {
        cy.get("*[href='/reports']").should("be.visible").click();
    }

    returnToHomePageAndSave() {
        this.clickReturnToHomePageButton();
        this.clickYesButton();
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
        this.interceptSave();
    }

    interceptSave() {
        cy.intercept({
            method: "PATCH",
            url: "/report/**"
        }).as("saveChanges");
        cy.wait("@saveChanges", {timeout: 10000});
    }

    clickSaveContinueButton() {
        cy.get("*[data-qa='form-submit-btn']").should("be.enabled").click();
    }

    reloadWithLogin(isForDelete = false) {
        cy.url().then(url => {
            cy.reload();
            if (isForDelete) {
                cy.loginByApi();
            } else {
                cy.loginByApi(url);
                cy.get("*[href='/reports']").should("be.visible");
            }
        });
    }
}