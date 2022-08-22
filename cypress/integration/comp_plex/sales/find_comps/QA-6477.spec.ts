import { Sales } from "../../../../actions";
import { salesInterceptions } from "../../../../actions/base/baseTest.actions";
import { Alias } from "../../../../utils/alias.utils";
import testData from "../../../../fixtures/comp_plex/sales/find_comps/QA-6477.fixture";

describe(`[QA-6477] [Sales > Find Comps > Job Search > Filters] Check when Report Search field is 
being interacted with, filters become disabled`, {
    tags: [ "@comp_plex_standalone" ] }, () => {
    beforeEach(() => {
        salesInterceptions();
        cy.visit("/index.html");
    });

    it("Test body", () => {
        cy.wait(`@${Alias.gql.SearchSalesTransactions}`);
        cy.stepInfo(`1. Go to Sales > Find Comps > Job Search`);
        Sales._FindComps.JobSearch.openJobSearchTab();

        cy.stepInfo(`2. Fill in Report Search field -> check that filters become disabled`);
        Sales._FindComps.Actions.JobSearch.checkFiltersAreExist();
        Sales._FindComps.JobSearch.Page.jobSearchFiltersForm.should("be.visible");
        Sales._FindComps.Actions.JobSearch.checkAllFiltersAreEnabled()
            .enterReportToSearchComp(testData.reportId)
            .checkAllFiltersAreDisabled();
        
        cy.stepInfo(`3. Clear Report Search field (clicking on “X”) -> 
        check that filters becomes enabled again`);     
        Sales._FindComps.JobSearch.clearReportIdField()   
            .checkAllFiltersAreEnabled();
    });
});