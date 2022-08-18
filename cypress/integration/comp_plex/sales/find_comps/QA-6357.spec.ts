import { Sales } from "../../../../actions";
import { salesInterceptions } from "../../../../actions/base/baseTest.actions";
import { Alias } from "../../../../utils/alias.utils";
import testData from "../../../../fixtures/comp_plex/sales/find_comps/QA-6357.fixture";

describe(`[Sales > Find Comps > Job Search > Filters] `, {
    tags: [ "@comp_plex_standalone" ] }, () => {
    beforeEach(() => {
        salesInterceptions();
        cy.visit("/index.html");
    });

    it("[Sales > Find Comps > Job Search > Filters] Check checkbox 'Show only On-App Jobs'", () => {
        cy.wait(`@${Alias.gql.SearchSalesTransactions}`);
        cy.stepInfo(`1. Go to Sales > Find Comps > Job Search`);
        Sales._FindComps.openJobSearchTab();

        cy.stepInfo(`2. Checkbox “Show only On-App Jobs” is located to the left of the map under the filters`);
        Sales._FindComps.Actions.JobSearch.checkFiltersAreExist();
        Sales._FindComps.JobSearch.Page.jobSearchFiltersForm.should("be.visible");
        
        cy.stepInfo(`3. Click checkbox “Show only On-App Jobs” + 
        Check, on the map only on-App ID cards should show up`);                 
        Sales._FindComps.JobSearch.jobSearchSetupFilter(testData.jobSearchFilter, false, false);
        Sales._FindComps.JobSearch.focusOnJobIcon()
            .verifyJobCardDataAndFilters(testData.jobSearchFilter);
    });
});