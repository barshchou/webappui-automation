import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_comps/QA-4146.fixture";
import Income from "../../../../../actions/income/income.manager";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { Tag } from "../../../../../utils/tags.utils";

describe("Check that map is closed by default", 
    { tags:[ Tag.income, Tag.commercial, Tag.rent_comps ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToCommercialRentComps();
        Income.Commercial.RentComps.verifyMapClosedByDefault();
        deleteReport(testData.reportCreationData.reportNumber);
    });
});