import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income } from "../../../../../actions";
import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4416-17.fixture";
import RentCompsPage from "../../../../../pages/income/residential/rent_comps/rentComps.page";

describe(`[Income - Residential - Rent Comps] Verify tables with the unit 
        information and details are displayed on "Rent Comps" page`,
{ tags: [ "@income", "@residential", "@rent_comps" ] }, () => {

    before("Login, create report, prepare data", () => {
        cy.stepInfo(`1. Create new report or open the report which is already created.
                     Make sure that there is at least two commercial units.`);
        createReport(testData.reportCreationData);

        cy.stepInfo(`2. Navigate to Income -> Residential -> Rent Comps
                     and click "Building" button`);
        _NavigationSection.navigateToResidentialRentComps();
        Income._Residential.RentComps.BaseActions
            .changeToBuildingSearch();

        cy.stepInfo(`3. Click 'Add' ('+') button for any searched
                     comparable from the building map`);
        Income._Residential.RentComps.BaseActions
            .clickAddComparableFromSearchByIndex();
        
        cy.stepInfo(`4. Navigate to Selected Building Residential Comparables
                     Summary table and click 'X' button for added comparable`);
        Income._Residential.RentComps.BaseActions
            .clickRemoveCompButtonByIndex();
        RentCompsPage.removedBuildingCompsTable.should("exist");

        cy.saveLocalStorage();
    });

    beforeEach("Restore local storage", () => {
        cy.restoreLocalStorage();
    });

    it("[QA-4416]", () => {
        cy.stepInfo(`5. Verify contents of Removed Building Comparables table`);
        testData.removedBuildingCompsColumns.forEach((column) => {
            Income._Residential.RentComps.BaseActions
                .verifyRemovedBuildingCompsTableHeader(column.name)
                .verifyRemovedBuildingCompsTableColumnText(column.selector, column.text);
        });
        Income._Residential.RentComps.BaseActions
            .verifyRemovedBuildingCompsTableHeader(testData.actionsHeader);
        testData.removedBuildingCompsTableButtons.forEach((buttonName) => {
            Income._Residential.RentComps.BaseActions
                .verifyRemovedBuildingCompsTableButton(buttonName);
        });
        RentCompsPage.getRemoveCompButtonByIndex(0).should("exist");
    });

    it("[QA-4417]", () => {
        cy.stepInfo(`5. Verify the table with the unit information is displayed 
                    on clicking the "Show Details" button in "Action" column of 
                    the "Removed Building Comparables" table on "Rent Comps" page`);
        Income._Residential.RentComps.BaseActions
            .clickShowDetailsButtonByIndex();
        testData.showDetailsColumnHeaders.forEach((headerName) => {
            Income._Residential.RentComps.BaseActions.verifyShowDetailsHeader(headerName);
        });
    });
});