const testData = require("../../../../fixtures/optionsList.fixtures.json")
import homepageActions from "../../../../actions/base/homepage.actions"
import navigationSectionActions from "../../../../actions/base/navigationSection.actions"
import rentRollActions from "../../../../actions/income/residental/rentRoll.actions"
import summaryActions from "../../../../actions/property/summary.actions"

describe("In-Place Rent Roll options list tests", () => {
    before("Create report and open In-Pace Rent Roll", () => {
        cy.loginByApi()
        homepageActions.createReport()
        navigationSectionActions.navigateToInPlaceRentRoll()
    })

    it("ID5", () => {
        rentRollActions.verifyNumberOFResidentalUnits(testData.numberOFUnits)
        rentRollActions.goToPropSummaryWithSave()
        summaryActions.verifyThatPageIsOpened()
        summaryActions.goBackWithSave()
    })

    it("ID6", () => {
        rentRollActions.verifyThatRentRollOptionsExist()
    })

    it("ID7", () => {
        rentRollActions.checkAndUncheckDevelopersForecast(testData.devForecastTestColumn)
    })

    it("ID9", () => {
        rentRollActions.checkUncheckPerUnitSquareFootage(testData.unitSquareTestColumns)
    })

    after("Delete report", () => {
        summaryActions.clickReturnToHomePageButton()
        homepageActions.deleteReport()
    })
})