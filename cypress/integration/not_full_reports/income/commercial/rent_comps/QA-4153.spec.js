import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_comps/QA-4153.fixture";
import Homepage from "../../../../../actions/base/homepage.actions";
import Income from "../../../../../actions/income/income.manager";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";

describe("Dropdown 'Filters'- 'Lease terms' section", () => {

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
            .verifyLeaseTermsSectionExist();
        testData.checkboxesAttributes.forEach(attr => {
           Income.Commercial.RentComps.checkCheckboxByQAAttr(attr)
               .uncheckCheckboxByQAAttr(attr);
        });
    });

    after("Delete report", () => {
        Income.Commercial.RentComps.returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});