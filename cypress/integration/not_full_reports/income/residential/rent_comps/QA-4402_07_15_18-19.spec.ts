import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income } from "../../../../../actions";
import testData from 
    "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4402_07_15_18-19.fixture";

describe(`[Income -> Residential -> Rent Comps -> Map] Saved filter values after page refreshing`,
    { tags: [ "@income", "@residential", "@rent_comps" ] }, () => {

        before("Login, create report, prepare data", () => {
            createReport(testData.reportCreationData);

            cy.stepInfo(`1. Navigate to Income -> Residential -> Rent Comps`);
            _NavigationSection.navigateToRentComps();

            cy.saveLocalStorage();
        });

        beforeEach("Restore local storage", () => {
            cy.restoreLocalStorage();
        });

        it("[QA-4402]", () => {
            cy.stepInfo(`2. Fill in all filters`);
            testData.filters.forEach((filter) => {
                Income._Residential
                    .RentComps.BaseActions
                    .changeStateOfFilter(filter.name, filter.value);
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

            cy.stepInfo(`3. Click 'Save' button, refresh the page
                     and verify filters values`);
            Income._Residential.RentComps.BaseActions.clickSaveButton()
                .verifyProgressBarNotExist();
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
        });

        it("[QA-4407]", () => {
            cy.stepInfo(`2. Fill in some filters`);
            testData.filters.forEach((filter) => {
                Income._Residential
                    .RentComps.BaseActions
                    .changeStateOfFilter(filter.name, filter.value);
            });
            testData.numericFilters.forEach((filter) => {
                Income._Residential
                    .RentComps.BaseActions
                    .enterValueToInput(filter.name, filter.value);
            });
            Income._Residential.RentComps.BaseActions
                .enterDateInput(
                    testData.dateFilters[0].value,
                    testData.dateFilters[0].name
                );

            cy.stepInfo(`3. Click 'Save' button, refresh the page
                    and verify filters values`);
            Income._Residential.RentComps.BaseActions.clickSaveButton()
                .verifyProgressBarNotExist();
            cy.reload();

            cy.stepInfo(`4. Verify that all filter values which were set are saved on the page`);
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
            Income._Residential
                .RentComps.BaseActions
                .verifyEnteredDate(
                    testData.dateFilters[0].name,
                    testData.dateFilters[0].value
                );
        });

        it("[QA-4415]", () => {
            cy.stepInfo(`2. Fill in all filters`);
            testData.filters.forEach((filter) => {
                Income._Residential
                    .RentComps.BaseActions
                    .changeStateOfFilter(filter.name, filter.value);
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

            cy.stepInfo(`3. Click 'Save' button, refresh the page
                     and verify filters values`);
            Income._Residential.RentComps.BaseActions.clickSaveButton()
                .verifyProgressBarNotExist();
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
        
            cy.stepInfo(`4. Remove all filters which were chosen
                     and click "Save" button`);
            testData.filters.forEach((filter) => {
                Income._Residential
                    .RentComps.BaseActions
                    .changeStateOfFilter(filter.name, filter.value, false);
            });
            testData.numericFilters.forEach((filter) => {
                Income._Residential
                    .RentComps.BaseActions
                    .clearInput(filter.name);
            });
            testData.dateFilters.forEach((filter) => {
                Income._Residential
                    .RentComps.BaseActions
                    .clearDateInput(filter.name);
            });
            Income._Residential.RentComps.BaseActions
                .clickSaveButton()
                .verifyProgressBarNotExist();

            cy.stepInfo("5. Refresh the page and verify filters values");
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
        });

        it("[QA-4418]", () => {
            cy.stepInfo(`2. Fill in all filters`);
            testData.filters.forEach((filter) => {
                Income._Residential
                    .RentComps.BaseActions
                    .changeStateOfFilter(filter.name, filter.value);
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

            cy.stepInfo(`3. Click 'Save' button, refresh the page
                     and verify filters values`);
            Income._Residential.RentComps.BaseActions.clickSaveButton()
                .verifyProgressBarNotExist();
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

            cy.stepInfo(`4. Click 'Reset filters' button, click 'Save' button,
                     refresh the page and verify filters values`);
            Income._Residential.RentComps.BaseActions
                .clickResetFiltersButton()
                .clickSaveButton()
                .verifyProgressBarNotExist();
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
        });

        it("[QA-4419]", () => {
            cy.stepInfo(`2. Fill in some filters`);
            testData.filters.forEach((filter) => {
                Income._Residential
                    .RentComps.BaseActions
                    .changeStateOfFilter(filter.name, filter.value);
            });
            testData.numericFilters.forEach((filter) => {
                Income._Residential
                    .RentComps.BaseActions
                    .enterValueToInput(filter.name, filter.value);
            });
            Income._Residential.RentComps.BaseActions
                .enterDateInput(
                    testData.dateFilters[0].value,
                    testData.dateFilters[0].name
                );

            cy.stepInfo(`3. Navigate to some other page and
                     click "Save" button in appeared modal`);
            _NavigationSection.navigateToPropertySummary();
        
            cy.stepInfo(`4. Return back to Rent Comps and refresh the page`);
            _NavigationSection.navigateToRentComps();
            cy.reload();

            cy.stepInfo(`5. Verify that all filter values which were set are saved on the page`);
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
            Income._Residential
                .RentComps.BaseActions
                .verifyEnteredDate(
                    testData.dateFilters[0].name,
                    testData.dateFilters[0].value
                );
        });

        afterEach("Clear all filters", () => {
            Income._Residential.RentComps.BaseActions
                .clickResetFiltersButton()
                .clickSaveButton()
                .verifyProgressBarNotExist();
        });
    });