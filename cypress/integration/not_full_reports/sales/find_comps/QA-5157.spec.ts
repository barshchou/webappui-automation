import { Sales } from '../../../../actions';
import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-5157.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { conditionalDescribe } from "../../../checkIsProd.utils";

conditionalDescribe(`[QA-5157] [Sales > Find Comps] "Date Sold" sorting is selected by default 
                     for sales comps`,
{ tags: [ "@sales", "@find_comps", "@comp_plex" ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });
   
    it("[QA-5157] [Sales > Find Comps] 'Date Sold' sorting is selected by default for sales comps", () => {
        cy.stepInfo(`1.Navigate to Sales > Find Comps page `);
        _NavigationSection.navigateToFindComps();

        cy.stepInfo(`2. Verify "Date Sold" sorting is selected by default for sales comps`);
        Sales._FindComps.Page.sortSalesCompsSelectValue.should('contain', testData.sortSalesCompsDateSold);
    });
});