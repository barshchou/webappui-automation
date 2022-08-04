import { Sales } from '../../../../actions';
import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-5162.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { salesInterceptions } from "../../../../actions/base/baseTest.actions";
import { conditionalDescribe } from "../../../checkIsProd.utils";
/*
 * import mapKeysUtils from "../../../../utils/mapKeys.utils";
 * import Homepage from "../../../../actions/base/homepage.actions";
 */

conditionalDescribe(`[QA-5162] [QA-51] [Sales > Find Comps] "Date Sold" sorting is selected by default 
                     for sales comps + sorting is applied correctly`,
{ tags: [ "@sales", "@find_comps", "@comp_plex" ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
        cy.saveLocalStorage();
    });
    beforeEach(() => {
        cy.restoreLocalStorage();
        salesInterceptions();
    });

    it(`[QA-5162] [Sales > Find Comps] "Date Sold" sorting is updated when user adds/removes comps, 
    changes sorting`, () => {
        cy.stepInfo(`1.Navigate to Sales > Find Comps page `);
        _NavigationSection.navigateToFindComps();

        cy.stepInfo(`2. Verify "Date Sold" sorting is selected by default for sales comps`);
        Sales._FindComps.Page.sortSalesCompsSelectValue.should('contain', testData.sortSalesCompsDateSold);

        cy.stepInfo(`3. Add comps to Selected category??? + Verify that "Date Sold" option in 
                     Sort dropdown is correctly applied after each comp addition`);
        Sales._FindComps.resetAllFilters()
            .selectFilterSalePeriodValue(testData.salePeriodValue);
        testData.arrayOfCompsForAdditionFromMap1.forEach(comp => {
            Sales._FindComps.selectCompFromMapByAddress(comp.address);
            Sales._FindComps.checkSalesCompSortedByDateSold();
        });    
        Sales._FindComps.resetAllFilters();
        testData.arrayOfCompsForAdditionFromMap2.forEach(comp => {
            Sales._FindComps.selectCompFromMapByAddress(comp.address);
            Sales._FindComps.checkSalesCompSortedByDateSold();
        });
        Sales._FindComps.checkSalesCompSortedByDateSold();

        cy.stepInfo(`3. Remove a few comps + Verify that "Date Sold" option in 
                     Sort dropdown is correctly applied after each comp removing`);



    });
});