import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income } from "../../../../../actions";
import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4418.fixture";

describe(`Saved filter values after page refreshing
         (all filters are removed with RESET FILTERS button)`,
        { tags: [ "@income", "@residential", "@rent_comps" ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo(`1. Navigate to Income -> Residential -> Rent Comps
                     and fill in all filters`);
        _NavigationSection.navigateToRentComps();
        testData.filters.forEach((filter) => {
            Income._Residential
                .RentComps.BaseActions
                .checkFilterValue(filter.name, filter.value);
        });
        testData.numericFilters.forEach((filter) => {
            Income._Residential
                .RentComps.BaseActions
                .enterValueToInput(filter.name, filter.value);
        });
        testData.dateFilters.forEach((filter) => {
            Income._Residential
                .RentComps.BaseActions
                .enterDateInput(filter.value, filter.name);
        });

        cy.stepInfo(`2. Click 'Save' button, refresh the page
                     and verify filters values`);
        Income._Residential.RentComps.BaseActions.clickSaveButton();
        cy.reload();
        testData.filters.forEach((filter) => {
            Income._Residential
                .RentComps.BaseActions
                .verifyFilterValue(filter.name, filter.value, true);
        });
        testData.numericFilters.forEach((filter) => {
            Income._Residential
                .RentComps.BaseActions
                .verifyEnteredValueToInput(filter.name, filter.value);
        });
        testData.dateFilters.forEach((filter) => {
            Income._Residential
                .RentComps.BaseActions
                .verifyEnteredDate(filter.name, filter.value);
        });

        cy.stepInfo(`3. Click 'Reset filters' button, click 'Save' button,
                     refresh the page and verify filters values`);
        Income._Residential.RentComps.BaseActions
            .clickResetFiltersButton()
            .clickSaveButton();
        cy.reload();
        testData.filters.forEach((filter) => {
            Income._Residential
                .RentComps.BaseActions
                .verifyFilterValue(filter.name, filter.value, false);
        });
        testData.numericFilters.forEach((filter) => {
            Income._Residential
                .RentComps.BaseActions
                .verifyEnteredValueToInput(filter.name, "");
        });
        testData.dateFilters.forEach((filter) => {
            Income._Residential
                .RentComps.BaseActions
                .verifyEnteredDate(filter.name, "");
        });

        deleteReport(testData.reportCreationData.reportNumber);
    });
});