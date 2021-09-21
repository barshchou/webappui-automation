import rentRollPage from "../../../pages/income/residental/rentRoll.page";
import BaseActions from "../../base/base.actions"

class InPlaceRentRollActions extends BaseActions {
    verifyNumberOFResidentalUnits(unitsNumber) {
        rentRollPage.numberOfResidentalUnitsField.should("be.disabled").should("have.value", unitsNumber)
    }

    clickGoToPropSummaryButton() {
        rentRollPage.goToPropSummaryButton.should("be.visible").click()
    }

    goToPropSummaryWithSave() {
        this.clickGoToPropSummaryButton()
        this.clickYesButton()
    }

    verifyThatRentRollOptionsExist() {
        rentRollPage.rentRollOptionsField.should("be.visible")
    }

    checkDevelopersForecast(check = true) {
        if (check) {
            rentRollPage.developersForecastCheckbox.check()
        } else {
            rentRollPage.developersForecastCheckbox.uncheck()
        }
    }

    verifyRentForecastExist(check = true) {
        if (check) {
            rentRollPage.rentForecastColumnHeader.should("exist")
        } else {
            rentRollPage.rentForecastColumnHeader.should("not.exist")
        }
    }

    checkAndUncheckDevelopersForecast() {
        this.checkDevelopersForecast()
        this.verifyRentForecastExist()
        this.checkDevelopersForecast(false)
        this.verifyRentForecastExist(false)
    }
}

export default new InPlaceRentRollActions()