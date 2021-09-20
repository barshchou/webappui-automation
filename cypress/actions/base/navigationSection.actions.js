import navigationSectionPage from "../../pages/base/navigationSection.page";
import BaseActions from "./base.actions";

class NavigationSectionActions extends BaseActions {
    clickIncomeApproachButton() {
        navigationSectionPage.incomeApproachButton.click()
    }

    clickResidentalIncomeArrow() {
        navigationSectionPage.residentalIncomeArrow.click()
    }

    clickInPlaceRentRollButton() {
        navigationSectionPage.inPlaceRentRollButton.click()
    }

    navigateToInPlaceRentRoll() {
        this.clickIncomeApproachButton()
        this.clickResidentalIncomeArrow()
        this.clickInPlaceRentRollButton()
        this.clickYesButton()
    }
}

export default new NavigationSectionActions()