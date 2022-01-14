import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_comps/QA-4151.fixture";
import Homepage from "../../../../../actions/base/homepage.actions";
import Income from "../../../../../actions/income/income.manager";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";

describe("Check that Commercial Rent Comps map has Filters dropdown", () => {
    before("Login, create report", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToCommercialRentComps();
        Income.Commercial.RentComps.openMap()
            .verifyProgressBarNotExist()
            .verifyFiltersDropdownExist()
            .returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});