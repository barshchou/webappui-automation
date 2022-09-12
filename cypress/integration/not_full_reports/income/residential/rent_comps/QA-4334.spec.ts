import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4334.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";

// TODO: Return this test to tests run after https://bowery.atlassian.net/browse/WEB-3321 bug fix
describe.skip(`Verify Search Results overlay with found results is displayed on clicking Back to Search button 
                    on the Add New Rent Comp overlay on Rent Comps page when Unit type of search is selected`, () => {

    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToRentComps()
            .verifyProgressBarNotExist();
        Income.Residential.RentComps.BaseActions.openAddNewComparableForm(testData.searchAddress);
        Income.Residential.RentComps.AddForm.clickCancelButton();
        Income.Residential.RentComps.BaseActions.verifySearchResultIsShown();
    });
});