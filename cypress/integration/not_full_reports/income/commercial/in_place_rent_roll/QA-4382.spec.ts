import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4382.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { Tag } from "../../../../../utils/tags.utils";

describe("Verify the Lease Status column in the grid", 
    { tags:[ Tag.income, Tag.commercial, Tag.in_place_rent_roll ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.pasteToLeaseStatusByRow(testData.leaseStatuses[0])
            .chooseLeaseStatusesByRowNumber(testData.leaseStatuses)
            .pressDeleteLeaseStatusByRow();
        deleteReport(testData.reportCreationData.reportNumber);
    });
});