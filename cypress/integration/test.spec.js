const testData = require("../fixtures/test.fixtures.json")
import homepageActions from "../actions/base/homepage.actions"

describe("Test", () => {
    it("test", () => {
        cy.loginByApi()
        homepageActions.clickNewReportButton()
        homepageActions.enterAddressToSearch(testData.address)
        homepageActions.clickFindPropHeader()
        homepageActions.clickSubmitButton()
        homepageActions.clickToSearchResultRow()
        homepageActions.clickSubmitButton()
        homepageActions.enterReportNumber(testData.reportNumber)
        homepageActions.checkTemplateType(testData.templateType)
        homepageActions.checkIncomeType(testData.incomeType)
        homepageActions.checkConclusionType(testData.conclusionType)
        homepageActions.clickCreateReportButton()
    })
})