import {getEnvUrl} from "../../../utils/env.utils";

export default class BaseActions {

    clickYesButton() {
        cy.get("*[name='form-confirm-submit-btn']").click();
        return this;
    }

    clickNoButton() {
        cy.get("*[name='form-confirm-reject-btn']").click();
        return this;
    }

    returnToHomePage() {
        cy.visit(`${getEnvUrl()}/reports`);
        return this;
    }

    goBackWithSave() {
        cy.go("back");
        this.clickYesButton();
        return this;
    }

    goBackWithoutSave() {
        cy.go("back");
        this.clickNoButton();
        return this;
    }

    goBack() {
        cy.go("back");
        return this;
    }

    clickSaveButton() {
        cy.get("*[data-qa='form-save-btn']").click();
        return this;
    }

    clickSaveContinueButton() {
        cy.get("*[data-qa='form-submit-btn']").scrollIntoView().click();
    }

    verifyProgressBarNotExist() {
        cy.get("*[role='progressbar']").should("not.exist");
        return this;
    }
}
