import Sales from "../../../../actions/sales/sales.manager";
import { conditionalDescribe } from "../../../checkIsProd.utils";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { salesInterceptions } from "../../../../actions/base/baseTest.actions";
import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-5157_61.fixture";
import { _NavigationSection } from '../../../../actions/base';

Cypress.env("report", "ui");

conditionalDescribe('describe', {
    tags: [ "@comp_plex_standalone1" ] },  () => {
    before(() => {
        createReport(testData.reportCreationData);
        salesInterceptions();
    });

    it('it', () => {
        
        cy.log('test start');
        _NavigationSection.navigateToFindComps()
            .verifyProgressBarNotExist();
        Sales.FindComps.AddressSearch.openAddressSearchTab()
            .addCompByParameter(2, "latestVersion.saleInformation.saleStatus", "transaction");
         


    });
});