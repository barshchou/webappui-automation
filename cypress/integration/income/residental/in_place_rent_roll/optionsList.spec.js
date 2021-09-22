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

    it("ID5: number of residental units and go to property summary", () => {
        rentRollActions.verifyNumberOFResidentalUnits(testData.numberOFUnits)
        rentRollActions.goToPropSummaryWithSave()
        summaryActions.verifyThatPageIsOpened()
        summaryActions.goBackWithSave()
    })

    it("ID6: Static text: Rent Roll Options", () => {
        rentRollActions.verifyThatRentRollOptionsExist()
    })

    it("ID7: Developer's Forecast checkbox", () => {
        rentRollActions.checkUncheckCheckbox(testData.devForecastTestColumn, testData.forecastLabel)
    })

    it("ID9: Do you know per unit square footage? radio button", () => {
        rentRollActions.checkUncheckPerUnitSquareFootage(testData.unitSquareTestColumns)
    })

    it("ID10: Text: Optional Columns", () => {
        rentRollActions.isOptionalColumnExist()
    })

    it("ID11: Bathrooms checkbox", () => {
        rentRollActions.checkUncheckCheckbox(testData.bathTestColumn, testData.bathLabel)
    })

    it("ID12: Outdoor Space checkbox", () => {
        rentRollActions.checkUncheckCheckbox(testData.outdoorLabelAndColumn, testData.outdoorLabelAndColumn)
    })

    it("ID13: Unit Type checkbox", () => {
        rentRollActions.checkUncheckCheckbox(testData.unitLabelColumn, testData.unitLabelColumn)
    })

    after("Delete report", () => {
        rentRollActions.clickReturnToHomePageButton()
        homepageActions.deleteReport()
    })
})