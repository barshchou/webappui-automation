import { Sales } from "../../../../actions";
import { salesInterceptions } from "../../../../actions/base/baseTest.actions";
import { Alias } from "../../../../utils/alias.utils";
import testData from "../../../../fixtures/comp_plex/sales/find_comps/QA-5394.fixture";


describe(`[QA-5394] -> [Sales > Find Comps > Create Comp > 
    Enter Property Information form] Verify the Site Area* field`, { tags:[ "@comp_plex_standalone" ] },  () => {

    beforeEach(() => {
        salesInterceptions();
        cy.visit("/index.html");
    });

    it("[QA-5394] -> Verify the Site Area* field", () => {
        cy.wait(`@${Alias.gql.SearchSalesTransactions}`);
        cy.log("test");
        cy.stepInfo(`1. Something`);
        cy.get('[id="createComp"]').should("be.visible").click();

        Sales._FindComps.Page.newCompContinueButton.click();
        
        cy.log(<any>Object.values(testData.spec5394));
        
        Sales._FindComps.Page.siteAreaNewComp;
        let _alias = Alias.pageElements.compPlex.siteAreaNewComp;
        Object.values(testData.spec5394).forEach(n => {
            Sales._FindComps.Actions.enterNumericInputNewComp(_alias, n).clearNumericInputNewComp(_alias);
        });
        cy.get('[title="SF"]', { includeShadowDom:true }).click();
        cy.get('[title="Acre"]', { includeShadowDom:true }).click();
        Object.values(testData.spec5394).forEach(n => {
            Sales._FindComps.Actions.enterNumericInputNewComp(_alias, n).clearNumericInputNewComp(_alias);
        });
    });
});