import navigationSectionPage from "../../pages/base/navigationSection.page";
import BaseActions from "./base.actions";

class NavigationSectionActions extends BaseActions {
    clickIncomeApproachButton() {
        navigationSectionPage.incomeApproachButton.click();
    }

    clickResidentalIncomeArrow() {
        navigationSectionPage.residentalIncomeArrow.click();
    }

    clickInPlaceRentRollButton() {
        navigationSectionPage.inPlaceRentRollButton.click();
    }

    clickRentCompsButton() {
        navigationSectionPage.rentCompsButton.click();
    }

    clickCommercialArrow() {
        navigationSectionPage.commercialIncomeArrow.click();
    }

    clickCommercialRentRollButton() {
        navigationSectionPage.commercialRentRollButton.click();
    }

    clickCommercialStabRentRollButton() {
        navigationSectionPage.commercialStabRentRollButton.click();
    }

    clickFinalButton() {
        navigationSectionPage.finalButton.click();
    }

    clickUnitInspectionButton() {
        navigationSectionPage.unitInspectionButton.click();
    }

    clickPropertyButton() {
        navigationSectionPage.propertyButton.click();
    }

    clickCommercialUnits() {
        navigationSectionPage.commercialUnitsButton.click();
    }

    verifyProgressBarNotExist() {
        navigationSectionPage.progressBar.should("not.exist");
    }

    clickSummaryButton() {
        navigationSectionPage.summaryButton.click();
    }

    clickClientButton() {
        navigationSectionPage.clientButton.click();
    }

    navigateToCommercialUnits() {
        this.clickSaveButton();
        this.verifyProgressBarNotExist();
        this.clickSaveButton();
        this.verifyProgressBarNotExist();
        this.clickPropertyButton();
        this.clickCommercialUnits();
    }

    navigateToUnitInspection() {
        this.clickSaveButton();
        this.clickFinalButton();
        this.clickUnitInspectionButton();
        this.verifyProgressBarNotExist();
    }

    navigateToInPlaceRentRoll() {
        this.clickIncomeApproachButton();
        this.clickResidentalIncomeArrow();
        this.clickInPlaceRentRollButton();
        this.clickYesButton();
    }

    navigateToRentComps() {
        this.clickIncomeApproachButton();
        this.clickResidentalIncomeArrow();
        this.clickRentCompsButton();
        this.clickYesButton();
    }

    navigateToCommercialInPlaceRentRoll(isWithSave = true) {
        this.clickIncomeApproachButton();
        this.clickCommercialArrow();
        this.clickCommercialRentRollButton();
        if (isWithSave) {
            this.clickYesButton();
        }
    }

    navigateToPropertySummary() {
        this.clickPropertyButton();
        this.clickSummaryButton();
        this.clickYesButton();
    }

    openClientPageInReport() {
        this.clickClientButton();
        this.clickYesButton();
    }
}

export default new NavigationSectionActions();