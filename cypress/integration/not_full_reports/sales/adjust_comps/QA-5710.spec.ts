import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-5710.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Sales } from "../../../../actions";

describe(`Check that negative sales adjustments can be typed in`, 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {
        it(`[QA-5710]`, () => {
            cy.stepInfo(`Precondition: Create a report`);
            createReport(testData.reportCreationData);

            cy.stepInfo(`Precondition: Add any comp`);
            _NavigationSection.navigateToFindComps();
            Sales._FindComps.AddressSearch.openAddressSearchTab()
                .addCompByParameter(testData.filter, 1);

            cy.stepInfo(`1. Go to Sales > Adjust Comps`);
            _NavigationSection.navigateToAdjustComps();

            cy.stepInfo(`2. Click on the cell. 
            3. The whole cell gets selected and any key input clears it and the user can enter in a new value
            4. Enter negative value`);
            Sales._AdjustComps.enterMarketAdjustmentsGroup(Object.keys(testData.comparableAdjustment), 
                Object.values(testData.comparableAdjustment));

            cy.stepInfo(`5. The value stays in the cell, when user moves to the next cell`);
            Object.keys(testData.comparableAdjustment).forEach((adjustment, index) => {
                Sales._AdjustComps.verifyMarketAdjustmentByName(adjustment, 
                    Object.values(testData.comparableAdjustment)[index]);
            });
        });
    });