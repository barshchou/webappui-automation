import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4383.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";

describe("Verify the Tenant column in the grid", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseOccupied)
            .enterTenantNameByRowNumber(testData.tenantName).Shared
            .verifyTenantNameByRow(testData.leaseOccupied, testData.tenantName);
        Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseVacant).Shared
            .verifyTenantNameByRow(testData.leaseVacant);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});