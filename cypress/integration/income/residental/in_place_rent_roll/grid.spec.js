const testData = require("../../../../fixtures/grid.fixtures.json")
import homepageActions from "../../../../actions/base/homepage.actions"
import navigationSection from "../../../../actions/base/navigationSection.actions"
import rentRollActions from "../../../../actions/income/residental/rentRoll.actions"

describe("In-Place Rent Roll grid tests", () => {
    before("Login and open In-Place Rent Roll", () => {
        cy.loginByApi()
        homepageActions.createReport()
        navigationSection.navigateToInPlaceRentRoll()
    })

    it("ID17 and ID18: GRID and #col.", () => {
        rentRollActions.verifyColumnExist(testData.sharpColumn)
    })

    it(`ID19: GRID: Inspected col. (checkbox) - copied in the Stabilized Rent Roll grid, 
    Final->Unit Inspection section, 'Inspected Units Summary' table in the report`, () => {
        
    })


    after("Delete report", () => {
        rentRollActions.returnToHomePageAndSave()
        homepageActions.deleteReport()
    })
})