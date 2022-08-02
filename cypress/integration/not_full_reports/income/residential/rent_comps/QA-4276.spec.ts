import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4276.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";

describe(`Verify Sort By drop-down field for results sorting on Map filter section on Rent Comps page 
                when Unit search type is selected`, () => {

    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToRentComps()
            .verifyProgressBarNotExist();
        testData.sortByOptions.forEach(option => {
            Income.Residential.RentComps.BaseActions.selectSortByOptionByValue(option);
        });
    });
});