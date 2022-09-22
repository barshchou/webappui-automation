import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-5350_5706.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import { Sales, Report } from "../../../../actions";
 
describe("Calculation of Market Condition adjustment", 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {

        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("[QA-5350_5706]", () => {
            cy.stepInfo(`1. Report > Key Info and fill the Date of Valuation`);
            Report._KeyInfo.enterDateByType(testData.valuationDateFixture);
    
            cy.stepInfo(`2. Navigate to the Sales > Find Comps and add a few Sales Comp`);
            NavigationSection.navigateToFindComps();
            for (let i = 1; i < 3; i++) {
                Sales._FindComps.AddressSearch.openAddressSearchTab()
                    .addCompByParameter(testData.filter, i);
            }
    
            cy.stepInfo(`3. Open Adjust comps page, and copy paste value into Market Condition Adjustment field`);
            NavigationSection.navigateToAdjustComps();
            Sales._AdjustComps.enterMarketAdjustmentsGroup(Object.keys(testData.comparablesAdjustments), 
                Object.values(testData.comparablesAdjustments));
    
            cy.stepInfo(`4. Verify there is a tooltip icon which explains the derivation of the formula`);
            Sales._AdjustComps.Page.marketConditionAdjustmentTooltip.trigger("mouseover").invoke("show");
            cy.get('[role="tooltip"]').invoke("text").then(text => {
                expect(text).to.be.equal(testData.tooltipText);
            });
    
            cy.stepInfo(`5. Verify there is a button to Apply the calculation 
            as market condition adjustments to the comps`);
            Sales._AdjustComps.Page.applyMarketConditionAdjustmentButton.should("be.visible");
    
            cy.stepInfo(`6. Fill MarketConditionAdjustment and Verify Market Condition Calculation formula`);
            Sales._AdjustComps.enterMarketConditionAdjustment(testData.marketConditionAdjustment);
            testData.addressDates.forEach((val, index) => {
                Sales._AdjustComps.verifyMarketConditionsTime(testData.dateOfValue, val, index);
            });

            cy.stepInfo(`7. Verify the Cumulative Price Per SF row is calculated correctly 
            when the Market Conditions is 0 (and >1)`);
            for (let i = 0; i < 2; i++) {
                Sales._AdjustComps.verifyNetMarketAdjustmentsByCompIndex(i)
                    .verifyAdjustedPriceByColumn(i);
            }
        });
    });