import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_comps/QA-4152.fixture";
import Homepage from "../../../../../actions/base/homepage.actions";
import Income from "../../../../../actions/income/income.manager";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";


describe("Dropdown 'Filters'- 'Sort by' section", () => {

    before("Login, create report", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToCommercialRentComps();
        Income.Commercial.RentComps.openMap()
            .verifyProgressBarNotExist()
            .verifyFiltersDropdownExist()
            .clickFiltersDropdown()
            .verifySortBySectionExist();
        testData.sortByOptions.forEach(option => {
            Income.Commercial.RentComps.selectSortByOption(option);
        });
        Income.Commercial.RentComps.returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});