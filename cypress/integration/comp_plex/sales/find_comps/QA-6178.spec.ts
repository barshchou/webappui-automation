import { Sales } from "../../../../actions";
import { navigateToCompplex } from "../../../../actions/base/baseTest.actions";
import testData from "../../../../fixtures/comp_plex/sales/find_comps/QA-6178.fixture";

describe(`[QA-6178] Filters functionality`, {
    tags: [ "@comp_plex_standalone" ] }, () => {
    before(() => {
        navigateToCompplex();
    });

    it(`[QA-6178] [Sales > Find Comps > Filters] Check "Comp Status" filter`, () => {

        cy.stepInfo(`1. Click on the "Comp Status" filter and verify that 
        the options "Do Not Use", "Draft", "Confirmed", "Verified", "Any" are seen in the dropdown 
        (“Bowery Subject“ options is out of scope for now)`);
        Sales._FindComps.Page.compStatusFilter.should("exist")
            .click();
        testData.allStatusesFromDropdown.forEach(status => {
            Sales._FindComps.Page.filterOptionValue(status).should("exist");
        });

        cy.stepInfo(`2. Verify if "Any" is selected for Comp Status, selects the rest and they are disabled`);
        Sales._FindComps.Page.filterOptionValue(testData.statusFromDropdownAny).should('be.selected')
            .should("not.be.disabled");
        testData.allStatusesFromDropdownExceptAny.forEach(status => {
            Sales._FindComps.Page.filterOptionValue(status).should("not.be.enabled");
        });
        Sales._FindComps.closeCompStatusDropdown();

        cy.stepInfo(`3. Check that map shows the results based on the options chosen`);
        Sales._FindComps.verifyCompsFromListByStatus(testData.allStatusesFromCompsList);
        
        cy.stepInfo(`4. Check that options can be cleared/another chosen → and map will still show correct results`);
        Sales._FindComps.selectUnselectFilterCompStatusValue(testData.statusFromDropdownAny, false)
            .selectUnselectFilterCompStatusValue(testData.statusFromDropdownDoNotUse)
            .verifyCompsFromListByStatus(testData.statusDoNotUseFromCompsList)
            .selectUnselectFilterCompStatusValue(testData.statusFromDropdownDoNotUse, false)
            .selectUnselectFilterCompStatusValue(testData.statusFromStatusDropdownDraft)
            .verifyCompsFromListByStatus(testData.statusDraftFromCompsList)
            .selectUnselectFilterCompStatusValue(testData.statusFromStatusDropdownDraft, false)
            .selectUnselectFilterCompStatusValue(testData.statusFromDropdownConfirmed)
            .verifyCompsFromListByStatus(testData.statusConfirmedFromCompsList)
            .selectUnselectFilterCompStatusValue(testData.statusFromDropdownConfirmed, false)
            .selectUnselectFilterCompStatusValue(testData.statusFromDropdownVerified)
            .verifyCompsFromListByStatus(testData.statusVerifiedFromCompsList);
    });
});