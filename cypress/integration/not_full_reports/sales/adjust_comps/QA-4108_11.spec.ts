import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4108_11.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Sales } from "../../../../actions";

describe("Verify Grid is calculated with correct formula", 
    { tags:[ "@sales", "@adjust_comps" ] }, () => {
        before("Login, create report", () => {
            createReport(testData.reportCreationData);
            cy.saveLocalStorage();
        });

        beforeEach("RestoreLocalStorage", () => {
            cy.restoreLocalStorage();
        });

        it("[QA-4108]", () => {
            cy.stepInfo(`1. Navigate to Sales > Find comps and select address`);
            _NavigationSection.navigateToFindComps();
            for (let i = 1; i < 3; i++) {
                Sales._FindComps.AddressSearch.openAddressSearchTab()
                    .addCompByParameter(i, testData.compProperty, testData.compStatusDate);
            }

            cy.stepInfo(`2. Navigate to Sales > Adjust Comps > Sales Adjustment Grid`);
            _NavigationSection.navigateToAdjustComps();

            cy.stepInfo(`3. Fill inputs in Market Adjustment`);
            Sales._AdjustComps.checkCalculationUnitsRadio(testData.calculationUnits)
                .enterMarketAdjustmentsGroup(Object.keys(testData.comparablesAdjustments), 
                    Object.values(testData.comparablesAdjustments));

            cy.stepInfo(`4. Verify Net Market Adjustments = 
            Property Rights + Financing Terms + Conditions of Sale + Market Conditions (Time)`);
            Sales._AdjustComps.verifyNetMarketAdjustmentsByCompIndex();
        });

        it("[QA-4111]", () => {
            cy.stepInfo(`1. Fill inputs in Location Adjustment`);
            Sales._AdjustComps.checkCalculationUnitsRadio(testData.calculationUnits)
                .enterLocationAdjustmentGroup(Object.keys(testData.locationAdjustments), 
                    Object.values(testData.locationAdjustments));

            cy.stepInfo(`2. Verify Net Market Adjustments = 
            Property Rights + Financing Terms + Conditions of Sale + Market Conditions (Time)`);
            Sales._AdjustComps.verifyTotalLocationAdjustmentsByCompIndex();
        });
    });