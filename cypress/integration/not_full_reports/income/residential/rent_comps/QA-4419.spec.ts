import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income } from "../../../../../actions";
import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4419.fixture";

describe(`Filter values after page refreshing (some filters set)
         - unsaved changes modal - yes`,
        { tags: [ "@income", "@residential", "@rent_comps" ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo(`1. Navigate to Income -> Residential -> Rent Comps
                     and fill in some filters`);
        _NavigationSection.navigateToRentComps();
        testData.filters.forEach((filter) => {
            Income._Residential
                .RentComps.BaseActions
                .checkFilterValue(filter.name, filter.value as string);
        });
        testData.numericFilters.forEach((filter) => {
            Income._Residential
                .RentComps.BaseActions
                .enterValueToInput(filter.name, filter.value as string);
        });
        Income._Residential.RentComps.BaseActions
                .enterDateInput(
                    testData.dateFilter.value as string,
                    testData.dateFilter.name
                );

        cy.stepInfo(`2. Navigate to some other page and
                     click "Save" button in appeared modal`);
        _NavigationSection.navigateToPropertySummary();
        
        cy.stepInfo(`3. Return back to Rent Comps and refresh the page`);
        _NavigationSection.navigateToRentComps();
        cy.reload();

        cy.stepInfo(`4. Verify that all filter values which were set are saved on the page`);
        testData.filters.forEach((filter) => {
            Income._Residential
                .RentComps.BaseActions
                .verifyFilterValue(filter.name, filter.value as string, true);
        });
        testData.numericFilters.forEach((filter) => {
            Income._Residential
                .RentComps.BaseActions
                .verifyEnteredValueToInput(filter.name, filter.value);
        });
        Income._Residential
                .RentComps.BaseActions
                .verifyEnteredDate(
                    testData.dateFilter.name,
                    testData.dateFilter.value as string
                );

        deleteReport(testData.reportCreationData.reportNumber);
    });
});