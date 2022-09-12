import { Sales } from "../../../../actions";
import { salesInterceptions } from "../../../../actions/base/baseTest.actions";
import { Alias } from "../../../../utils/alias.utils";
import testData from "../../../../fixtures/comp_plex/sales/find_comps/QA-6356.fixture";

describe.skip(`[QA-6356] [Sales > Find Comps > Job Search > Filters] 
Check that ID cards show correct data based on chosen filters`, {
    tags: [ "@comp_plex_standalone" ] }, () => {
    beforeEach(() => {
        salesInterceptions();
        cy.visit("/index.html");
    });

    it("[QA-6356] Check whether setup in Filters matches the data in Job Card", () => {
        cy.wait(`@${Alias.gql.SearchSalesTransactions}`);
        cy.stepInfo(`1. Go to Sales > Find Comps > Job Search`);
        Sales._FindComps.openJobSearchTab();

        cy.stepInfo(`2. Filters are located to the left of the map`);
        Sales._FindComps.Actions.JobSearch.checkFiltersAreExist();
        Sales._FindComps.JobSearch.Page.jobSearchFiltersForm.should("be.visible")
            .should("have.css", "margin-left", "-8px"); 
        
        cy.stepInfo(`3. ID card matches the chosen filters`);                 
        Sales._FindComps.JobSearch.jobSearchSetupFilter(testData.jobSearchFilter);
        Sales._FindComps.JobSearch.focusOnJobIcon()
            .verifyJobCardDataAndFilters(testData.jobSearchFilter);
    });
});