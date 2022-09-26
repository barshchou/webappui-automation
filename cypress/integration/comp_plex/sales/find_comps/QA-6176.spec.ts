import { Sales } from "../../../../actions";
import { navigateToCompplex } from "../../../../actions/base/baseTest.actions";
import testData from "../../../../fixtures/comp_plex/sales/find_comps/QA-6176.fixture";

describe(`[QA-6176] Filters functionality`, {
    tags: [ "@comp_plex_standalone" ] }, () => {
    before(() => {
        navigateToCompplex();
    });

    it(`[QA-6176] [Sales > Find Comps > Job Search > Filters] 
    Check functionality of "Reset all" filters on Job Search tab`, () => {

        cy.stepInfo(`1. Go to Sales > Find Comps > Job Search`);
        Sales._FindComps.openJobSearchTab();

        cy.stepInfo(`2. Fill in the filters with values`);
        Sales._FindComps.Actions.JobSearch.checkFiltersAreExist();
        Sales._FindComps.JobSearch.Page.jobSearchFiltersForm.should("be.visible");
        Sales._FindComps.Actions.JobSearch.checkAllFiltersAreEnabled()
            .jobSearchSetupFilter(testData.jobSearchFilter);

        cy.stepInfo(`3. Click on “Reset all“ and verify that all filters are cleared`);
        Sales._FindComps.JobSearch.clearAllFiltersViaReset();
    });
});