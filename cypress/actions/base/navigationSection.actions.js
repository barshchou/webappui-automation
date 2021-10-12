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

    navigateToUnitInspection(isWithChanges = true) {
        this.clickFinalButton();
        this.clickUnitInspectionButton();
        if (isWithChanges) {
            this.clickYesButton();
        }
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

    navigateToCommercialInPlaceRentRoll() {
        this.clickIncomeApproachButton();
        this.clickCommercialArrow();
        this.clickCommercialRentRollButton();
        this.clickYesButton();
    }
}

export default new NavigationSectionActions();