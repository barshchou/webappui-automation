import { Sales } from "../../../../actions";
import { navigateToCompplex } from "../../../../actions/base/baseTest.actions";
import testData from "../../../../fixtures/comp_plex/sales/find_comps/QA-6357.fixture";

describe(`[QA-6357] Checkbox 'Show only On-App Jobs' functionality`, {
    tags: [ "@comp_plex_standalone" ] }, () => {
    beforeEach(() => {
        navigateToCompplex();
    });

    it("[QA-6357] [Sales > Find Comps > Job Search > Filters] Check checkbox 'Show only On-App Jobs'", () => {
        cy.stepInfo(`1. Go to Sales > Find Comps > Job Search`);
        Sales._FindComps.openJobSearchTab();

        cy.stepInfo(`2. Checkbox “Show only On-App Jobs” is located to the left of the map under the filters`);
        Sales._FindComps.Actions.JobSearch.checkFiltersAreExist();
        Sales._FindComps.JobSearch.Page.jobSearchFiltersForm.should("be.visible");
        
        cy.stepInfo(`3. Click checkbox “Show only On-App Jobs” + 
                     Check, on the map only on-App ID cards should show up`);                 
        Sales._FindComps.JobSearch.jobSearchSetupFilter(testData.jobSearchFilter)
            .focusOnJobIcon()
            .verifyJobCardDataAndFilters(testData.jobSearchFilter);
    });
});