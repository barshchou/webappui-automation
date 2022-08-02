import { CompPlex, Sales } from "../../../../actions";
import { navigateToCompplex } from "../../../../actions/base/baseTest.actions";
import { Alias } from "../../../../utils/alias.utils";
import testData from "../../../../fixtures/comp_plex/sales/find_comps/QA-5394.fixture";


describe(`[QA-5394] -> [Sales > Find Comps > Create Comp > 
    Enter Property Information form] Verify the Site Area* field`, { tags:[ "@comp_plex_standalone" ] },  () => {

    beforeEach(() => {
        navigateToCompplex();
    });

    it("[QA-5394] -> Verify the Site Area* field", () => {
        cy.stepInfo(`1. Creating a new comp by clicking "Create comp" btn`);
        CompPlex.Page.btnCreateComp.click();

        cy.stepInfo(`1.1. Initializing page element for manipulation`);
        Sales._FindComps.Page.siteAreaNewComp;
        let _alias = Alias.pageElements.compPlex.siteAreaNewComp;

        cy.stepInfo(`2. Verifying Site Area* field with SF option`);
        Object.values(testData.values).forEach(n => {
            Sales._FindComps.Actions.enterNumericInputNewComp(_alias, n).clearNumericInputNewComp(_alias);
        });
        
        cy.stepInfo(`3. Switching Site Area* field to Acre option`);
        Sales._FindComps.Actions
            .selectDropdownOptionNewComp(cy.get('[title="SF"]', { includeShadowDom:true }), "Acre");
        
        cy.stepInfo(`4. Verifying Site Area* field with Acre option`);
        Object.values(testData.values).forEach(n => {
            Sales._FindComps.Actions.enterNumericInputNewComp(_alias, n).clearNumericInputNewComp(_alias);
        });
    });
});