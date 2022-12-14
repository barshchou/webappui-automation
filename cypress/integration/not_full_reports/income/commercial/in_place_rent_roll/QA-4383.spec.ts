import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4383.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import { createReport } from "../../../../../actions/base/baseTest.actions";

describe("Verify the Tenant column in the grid", 
    { tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseOccupied)
                .enterTenantNameByRowNumber(testData.tenantName)
                .verifyTenantNameByRow(testData.leaseOccupied, testData.tenantName)
                .chooseLeaseStatusByRowNumber(testData.leaseVacant)
                .verifyTenantNameByRow(testData.leaseVacant);
        });
    });