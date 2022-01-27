import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4387.fixture";
import Homepage from "../../../../../actions/base/homepage.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import Property from "../../../../../actions/property/property.manager";

describe("Verify the SF column in the grid", () => {

    before("Login, create report", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
    });

    it("Test body", () => {
       NavigationSection.navigateToCommercialInPlaceRentRoll();
       Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseStatus)
           .verifySquareFeetByRowNumber();
       NavigationSection.openCommercialUnits();
       Property.CommercialUnits.enterUnitSFByUnitIndex(testData.squareFeet);
       NavigationSection.navigateToCommercialInPlaceRentRoll();
       Income.Commercial.InPlaceRentRoll.verifySquareFeetByRowNumber(testData.squareFeet)
           .returnToHomePage();
       Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});