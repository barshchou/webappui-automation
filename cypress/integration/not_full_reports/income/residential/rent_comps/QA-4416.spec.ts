import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income } from "../../../../../actions";
import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4416.fixture";
import RentCompsPage from "../../../../../pages/income/residential/rent_comps/rentComps.page";

describe(`Verify "Removed Building Comparables" table on the "Rent Comps" page`,
        { tags: [ "@income", "@residential", "@rent_comps" ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo(`1. Navigate to Income -> Residential -> Rent Comps
                     and click "Bulding" button`);
        _NavigationSection.navigateToRentComps();
        Income._Residential.RentComps.BaseActions
            .changeToBuildingSearch();

        cy.stepInfo(`2. Click 'Add' ('+') button for any searched
                     comparable from the building map`);
        Income._Residential.RentComps.BaseActions
            .clickAddComparableFromSearchByIndex();
        
        cy.stepInfo(`3. Navigate to Selected Building Residential Comparables
                     Summary table and click 'X' button for added comparable`);
        Income._Residential.RentComps.BaseActions
            .clickRemoveCompButtonByIndex();
        RentCompsPage.removedBuildingCompsTable.should("exist");

        cy.stepInfo("4. Verify contents of Removed Building Comparables table");
        // testData.removedBuildingCompsColumn.forEach((column) => {
        // });

        deleteReport(testData.reportCreationData.reportNumber);
    });
});