import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income } from "../../../../../actions";
import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4416.fixture";

describe(`Verify "Removed Building Comparables" table on the "Rent Comps" page`,
        { tags: [ "@income", "@residential", "@rent_comps" ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo(`1. Navigate to Income -> Residential -> Rent Comps
                     and click "Bulding" button`);
        _NavigationSection.navigateToRentComps();
        
        cy.stepInfo(`2. Click 'Add' ('+') button for any searched
                     comparable from the building map`);
        Income._Residential.RentComps.BaseActions
            .changeToBuildingSearch()
            .verifySearchResultIsShown();
        
        
        cy.stepInfo(`3. Navigate to Selected Building Residential Comparables
                     Summary table and click 'x' button for added comparable`);

        cy.stepInfo("4. Verify contents of Removed Building Comparables table");

        deleteReport(testData.reportCreationData.reportNumber);
    });
});