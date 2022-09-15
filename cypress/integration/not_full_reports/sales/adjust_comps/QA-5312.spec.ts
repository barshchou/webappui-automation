import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-5312.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Sales } from "../../../../actions";

describe("Total Utility Adjustments in Sales Adjustment Grid is calculated with correct formula", 
    { tags:[ "@sales", "@adjust_comps" ] }, () => {

        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("[QA-5312]", () => {
            cy.stepInfo("1. Navigate to Find comps page and add a sales comps");
            _NavigationSection.navigateToFindComps();
            for (let i = 1; i < 3; i++) {
                Sales._FindComps.AddressSearch.openAddressSearchTab()
                    .addCompByParameter(i, testData.compProperty, testData.compStatusDate);
                Sales._FindComps.Page.getSelectedComparable(i-1).should('be.visible');
            }

            cy.stepInfo(`2. Go to Adjust Comps page`);
            _NavigationSection.navigateToAdjustComps();
        
            cy.stepInfo(`3. In the Sales adjustment grid click on the dropdown icon next to the Market Adjustment`);
            Sales._AdjustComps.expandAdjustmentDetails(testData.adjustmentName);
        
            testData.numberOfSalesComps.forEach((index) => {
                cy.stepInfo(`4. Click on the “View“ of any address`);
                Sales._AdjustComps.Page
                    .getAdjustmentRow(testData.adjustmentName, testData.rowName).eq(index).click();
            
                cy.stepInfo(`5. Verify that modal with all the information about the comp is opened`);
                Sales._AdjustComps.Page.modalSalesCompInfo.should("be.visible");
                Sales._AdjustComps.Page.CloseIconShadowDom.click();
            });
        });
    });