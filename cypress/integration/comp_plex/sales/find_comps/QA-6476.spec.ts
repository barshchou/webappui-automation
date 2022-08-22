import { Sales } from "../../../../actions";
import { salesInterceptions } from "../../../../actions/base/baseTest.actions";
import { Alias } from "../../../../utils/alias.utils";
import testData from "../../../../fixtures/comp_plex/sales/find_comps/QA-6476.fixture";

describe(`[QA-6476]`, {
    tags: [ "@comp_plex_standalone" ] }, () => {
    beforeEach(() => {
        salesInterceptions();
        cy.visit("/index.html");
    });

    it(`[QA-6476] [Sales > Find Comps > Job Search > Filters] Check when filters are being interacted with, 
    Report Search field becomes disabled`, () => {
        cy.wait(`@${Alias.gql.SearchSalesTransactions}`);
        cy.stepInfo(`1. Go to Sales > Find Comps > Job Search`);
        Sales._FindComps.openJobSearchTab();

        cy.stepInfo(`2. Fill in the filters with values -> check Report Search field becomes disabled`);
        Sales._FindComps.Actions.JobSearch.checkFiltersAreExist();
        Sales._FindComps.JobSearch.Page.jobSearchFiltersForm.should("be.visible");
        Sales._FindComps.Actions.JobSearch.checkAllFiltersAreEnabled()
            .Page.reportIdInput.should('be.enabled');
        Sales._FindComps.JobSearch.jobSearchSetupFilter(testData.jobSearchFilter)
            .Page.reportIdInput.should('be.disabled');
           
        cy.stepInfo(`3. Clear all the filters -> 
        check Report Search field becomes enabled`);     
        Sales._FindComps.JobSearch.clearAllFiltersViaReset()
            .Page.reportIdInput.should('be.enabled');
    });
});