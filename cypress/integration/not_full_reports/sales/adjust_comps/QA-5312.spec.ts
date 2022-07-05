import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-5312.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Sales } from "../../../../actions";

describe("Total Utility Adjustments in Sales Adjustment Grid is calculated with correct formula", 
    { tags:[ "@sales", "@adjust_comps", ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Navigate to Find comps page and add a sales comps");
        _NavigationSection.navigateToFindComps();
        testData.numberOfSalesComps.forEach((index) => {
            Sales._FindComps.selectCompFromMap();
            Sales._FindComps.Page.getSelectedComparable(index).should('be.visible');
        });
        cy.stepInfo(`2. Go to Adjust Comps page`);
        _NavigationSection.navigateToAdjustComps();
        cy.stepInfo(`3. In the Sales adjustment grid click on the dropdown icon next to the Market Adjustment`);
        Sales._AdjustComps.Page.getAdjustmentArrow("market-adjustment").click();
        testData.numberOfSalesComps.forEach((index) => {
            cy.stepInfo(`4. Click on the “View“ of any address`);
            Sales._AdjustComps.Page
            .getAdjustmentRow("market-adjustment", "Property Description").eq(index).click;
            cy.stepInfo(`5. Verify that modal with all the information about the comp is opened`);
            Sales._AdjustComps.Page.ModalSalesCompInfo.should("be.visible");
            Sales._AdjustComps.Page.CloseIconShadowDom.click();
        });
        deleteReport(testData.reportCreationData.reportNumber);
    });
});