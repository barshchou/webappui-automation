import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4315&17.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import RentCompsPage from "../../../../../pages/income/residential/rent_comps/rentComps.page";

describe(`Verify the UI elements of Find Rent Comparable overlay on Rent Comps page 
and Add New Rent Comp button`, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToRentComps();
        Income.Residential.RentComps.BaseActions.openAddNewComparableForm(testData.searchAddress);
        Income.Residential.RentComps.AddForm.clickCloseButton();
        RentCompsPage.newUnitForm.should("not.exist");
        deleteReport(testData.reportCreationData.reportNumber);
    });
});