import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/gridResInPlaceRentRoll.fixtures";
import Homepage from "../../../../../actions/base/homepage.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";

describe("In-Place Rent Roll grid tests", () => {
    before("Login and open In-Place Rent Roll", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
    });

    it("ID17 and ID18: GRID and #col.", () => {
        NavigationSection.navigateToResInPlaceRentRoll();
        Income.Residential.InPlaceRentRoll.verifyColumnExist(testData.commonData.sharpColumn)
            .returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});
