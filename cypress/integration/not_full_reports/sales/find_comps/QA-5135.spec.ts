import { Sales } from '../../../../actions';
import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-5135.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe(`[QA-5135] -> [Sales > Find Comps] Check the comps order when "custom" dropdown is chosen`, 
    { tags: [ "@sales", "@find_comps", "@comp_plex" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`1. [QA-5135] -> User navigates to SalesComps Search page `);
            _NavigationSection.navigateToFindComps();
        
            cy.stepInfo(`2. [QA-5135] -> User selects n-first comps from map`);
            testData.compsToAdd.forEach(() => {
                Sales._FindComps.Actions.selectCompFromMap();
            });

            cy.stepInfo(`3. [QA-5135] -> When a comp gets added, it gets automatically added to the bottom`);
            Sales._FindComps.checkSalesCompAddedToList();
        
            cy.stepInfo(`4. [QA-5135] -> Order doesn't change upon selection of “custom“ choice, 
                    until the appraiser manually moves comps around`);
            Sales._FindComps.Actions.selectedCompsSetSort("Custom").checkSalesCompAddedToList()
                .moveComparableByDnD(Sales._FindComps.Page.selectorDraggableElement, 0, "down", 2)
                .checkSalesCompAddedToList({ reverse: true });

            cy.stepInfo(`5. [QA-5135] -> If user selected custom order at first, 
            re-ordered comps and after that selected “Date Sold” sorting -> comps get 
            reordered by sale date on the fly.`);
            Sales._FindComps.Actions.selectedCompsSetSort("Date Sold").checkSalesCompAddedToList();

            deleteReport(testData.reportCreationData.reportNumber);
        });
    });