const testData = require("../../../../fixtures/test.fixtures.json")
import homepageActions from "../../../../actions/base/homepage.actions"
import navigationSectionActions from "../../../../actions/base/navigationSection.actions"
import rentRollActions from "../../../../actions/income/residental/rentRoll.actions"
import summaryActions from "../../../../actions/property/summary.actions"

describe("In-Place Rent Roll options list tests", () => {
    before("Create report and open In-Pace Rent Roll", () => {
        cy.loginByUI()
        homepageActions.createReport()
        navigationSectionActions.navigateToInPlaceRentRoll()
    })

    it("ID5", () => {
        rentRollActions.verifyNumberOFResidentalUnits(testData.numberOFUnits)
        rentRollActions.goToPropSummaryWithSave()
        summaryActions.verifyThatPageIsOpened()
        summaryActions.goBackWithSave()
    })

    after("Delete report", () => {
        summaryActions.clickReturnToHomePageButton()
        homepageActions.deleteReport()
    })
})