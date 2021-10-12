import rentRollPage from "../../../pages/income/commercial/rentRoll.page";
import BaseActions from "../../base/base.actions";

class CommercialRentRollActions extends BaseActions {
    verifyBasisOfRentTooltip() {
        rentRollPage.basisOfRentField.should("exist");
        rentRollPage.basisOfRentTooltip.should("exist").trigger("mouseover");
        rentRollPage.basisOfRentTooltip.should("not.exist");
    }

    clickMonthlyBasisButton(backColor = "rgb(65, 96, 211)") {
        rentRollPage.monthlyBasisButton.should("not.have.css", "background-color", backColor)
            .click().should("have.css", "background-color", backColor);
    }

    clickAnnuallyBasisButton(backColor = "rgb(65, 96, 211)") {
        rentRollPage.annuallyBasisButton.should("not.have.css", "background-color", backColor)
            .click().should("have.css", "background-color", backColor);
    }

    clickPerSquareFootButton(isFirstTime, backColor = "rgb(65, 96, 211)") {
        if (isFirstTime) {
            rentRollPage.perSquareBasisButton.should("have.css", "background-color", backColor).click();
        } else {
            rentRollPage.perSquareBasisButton.should("not.have.css", "background-color", backColor)
                .click().should("have.css", "background-color", backColor);
        }
    }

    verifyAllBasisButtons(backColor) {
        this.clickPerSquareFootButton(true, backColor);
        this.clickMonthlyBasisButton(backColor);
        this.clickAnnuallyBasisButton(backColor);
        this.clickPerSquareFootButton(false, backColor);
    }

    chooseLeaseStatusByRowNumber(status, rowNumber = 0) {
        rentRollPage.leaseStatusCells.eq(rowNumber).scrollIntoView().dblclick();
        cy.contains(status).click();
        rentRollPage.leaseStatusCells.eq(rowNumber).should("have.text", status);
    }

    checkIsInspectedCheckboxByRowNumber(rowNumber = 0) {
        const backColor = "rgb(65, 96, 211)";
        rentRollPage.elementToVerifyIsInspected.should("not.have.css", "background-color", backColor);
        rentRollPage.isInspectedCheckboxes.eq(rowNumber).dblclick();
        rentRollPage.elementToVerifyIsInspected.should("have.css", "background-color", backColor);
    }

    uncheckIsInspectedCheckboxByRowNumber(rowNumber = 0) {
        const backColor = "rgb(65, 96, 211)";
        rentRollPage.elementToVerifyIsInspected.should("have.css", "background-color", backColor);
        rentRollPage.isInspectedCheckboxes.eq(rowNumber).click();
        rentRollPage.elementToVerifyIsInspected.should("not.have.css", "background-color", backColor);
    }

    verifyUnitNumberCells(unitNumber = 1) {
        rentRollPage.unitNumberCells.each(cell => {
            cy.wrap(cell).should("exist").should("be.visible");
        });
        rentRollPage.unitNumberCells.should("have.length", unitNumber + 1);
    }
}

export default new CommercialRentRollActions();