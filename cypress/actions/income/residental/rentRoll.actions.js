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
            rentRollPage.developersForecastCheckbox.scrollIntoView().should("be.enabled").check()
        } else {
            rentRollPage.developersForecastCheckbox.scrollIntoView().should("be.enabled").uncheck()
        }
    }

    verifyColumnExist(columnName, check = true) {
        if (check) {
            rentRollPage.getColumnHeader(columnName).should("exist")
        } else {
            rentRollPage.getColumnHeader(columnName).should("not.exist")
        }
    }

    verifyListColumnExist(columnNames, check = true) {
        for (let i = 0; i < columnNames.length; i++) {
            this.verifyColumnExist(columnNames[i], check)
        }
    }

    checkPerUnitSquareFootage(value = "true") {
        rentRollPage.getPerUnitSFRadio(value).scrollIntoView().should("be.enabled").click()
    }

    checkUncheckPerUnitSquareFootage(columnNames) {
        this.checkPerUnitSquareFootage()
        this.verifyListColumnExist(columnNames)
        this.checkPerUnitSquareFootage("false")
        this.verifyListColumnExist(columnNames, false)
    }

    checkAndUncheckDevelopersForecast(columnName) {
        this.checkDevelopersForecast()
        this.verifyColumnExist(columnName)
        this.checkDevelopersForecast(false)
        this.verifyColumnExist(columnName, false)
    }
}

export default new InPlaceRentRollActions()