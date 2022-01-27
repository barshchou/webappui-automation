import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4383.fixture";
import Homepage from "../../../../../actions/base/homepage.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";

describe("Verify the Tenant column in the grid", () => {
    before("Login, create report", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseOccupied)
            .enterTenantNameByRowNumber(testData.tenantName)
            .verifyTenantNameByRowNumber(testData.leaseOccupied, testData.tenantName)
            .chooseLeaseStatusByRowNumber(testData.leaseVacant)
            .verifyTenantNameByRowNumber(testData.leaseVacant)
            .returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});