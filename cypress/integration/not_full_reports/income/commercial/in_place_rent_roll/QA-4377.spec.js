import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4377.fixture";
import Homepage from "../../../../../actions/base/homepage.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import Final from "../../../../../actions/final/final.manager";

describe("Verify the Inspected checkbox functionality", () => {
    before("Login, create report", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
    });

    it("Test body", () => {
       NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseStatus)
            .checkIsInspectedCheckboxByRowNumber();
        NavigationSection.clickCommercialStabRentRollButton()
            .clickYesButton()
            .verifyProgressBarNotExist();
        Income.Commercial.StabilizedRentRoll.verifyIsInspectedChecked();
        NavigationSection.navigateToUnitInspection();
        Final.UnitInspection.verifyNumberOfInspectedUnitsCommentary()
            .returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});