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
}

export default new NavigationSectionActions();