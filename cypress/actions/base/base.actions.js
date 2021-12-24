import {getEnvUrl} from "../../../utils/env.utils";

export default class BaseActions {

    /**
     *
     * @returns {BaseActions}
     */
    clickYesButton() {
        cy.get("*[name='form-confirm-submit-btn']").click();
        return this;
    }

    clickNoButton() {
        cy.get("*[name='form-confirm-reject-btn']").click();
    }

    returnToHomePage() {
        cy.visit(`${getEnvUrl()}/reports`);
    }

    goBackWithSave() {
        cy.go("back");
        this.clickYesButton();
    }

    goBackWithoutSave() {
        cy.go("back");
        this.clickNoButton();
    }

    /**
     *
     * @returns {BaseActions}
     */
    clickSaveButton() {
        cy.get("*[data-qa='form-save-btn']").click();
        return this;
    }

    clickSaveContinueButton() {
        cy.get("*[data-qa='form-submit-btn']").scrollIntoView().click();
    }

    /**
     *
     * @returns {BaseActions}
     */
    verifyProgressBarNotExist() {
        cy.get("*[role='progressbar']").should("not.exist");
        return this;
    }
}
