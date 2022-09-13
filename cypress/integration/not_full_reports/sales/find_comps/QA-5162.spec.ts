import { Sales } from '../../../../actions';
import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-5162.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { salesInterceptions } from "../../../../actions/base/baseTest.actions";
import { conditionalDescribe } from "../../../checkIsProd.utils";


conditionalDescribe(`[QA-5162] [Sales > Find Comps] "Date Sold" sorting is updated when user adds/removes comps`,
    { tags: [ "@sales", "@find_comps", "@comp_plex" ] }, () => {
        before("Login, create report", () => {
            createReport(testData.reportCreationData);
            salesInterceptions();
        });

        it(`Test body`, () => {
            cy.stepInfo(`1.Navigate to Sales > Find Comps page `);
            _NavigationSection.navigateToFindComps();

            cy.stepInfo(`2. Verify "Date Sold" sorting is selected`);
            Sales._FindComps.Page.sortSalesCompsSelectValue.should('contain', testData.sortSalesCompsDateSold);

            cy.stepInfo(`3. Add comps to Selected Comps table + Verify that "Date Sold" option in 
                     Sort dropdown is correctly applied after each comp addition`);
            Sales._FindComps.uploadComps(testData.filePath)
                .verifyUploadCompsSucceeded()
                .checkSalesCompSortedByDateSold();

            cy.stepInfo(`4. Remove a few comps + Verify that "Date Sold" option in 
                     Sort dropdown is correctly applied after each comp removing`);
            testData.arrayOfCompsForRemovingFromMap.forEach(comp => {
                Sales._FindComps.removeCompByAddress(comp.address) 
                    .verifyCompIsInRemovedSection(comp.address)
                    .checkSalesCompSortedByDateSold();
            });

            cy.stepInfo(`5. Add from deleted section + Verify that "Date Sold" option in 
                     Sort dropdown is correctly applied after each comp adding`);
            testData.arrayOfCompsForRemovingFromMap.forEach(comp => {
                Sales._FindComps.addDeletedCompByAddress(comp.address) 
                    .verifyAddedCompAddress(comp.address)
                    .checkSalesCompSortedByDateSold();
            });

            cy.stepInfo(`6. Selects Custom sorting, rearranges comps and selects Date Sold sorting again + Verify that 
                         "Date Sold" option in Sort dropdown is correctly applied after each comp rearranging`);
            Sales._FindComps.selectedCompsSetSort(testData.sortSalesCompsCustom)
                .Page.sortSalesCompsSelectValue.should('contain', testData.sortSalesCompsCustom);
            Sales._FindComps.moveComparableByDnD(Sales._FindComps.Page.selectorDraggableElement(0), 2, "down", 4) //?
                .moveComparableByDnD(Sales._FindComps.Page.selectorDraggableElement(0), 4, "down", 5)  //?
                .selectedCompsSetSort(testData.sortSalesCompsDateSold)
                .checkSalesCompSortedByDateSold();
        });
    });