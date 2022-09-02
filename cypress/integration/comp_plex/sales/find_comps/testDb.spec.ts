import Sales from "../../../../actions/sales/sales.manager";
import { navigateToCompplex } from "../../../../actions/base/baseTest.actions";
import { conditionalDescribe } from "../../../checkIsProd.utils";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { salesInterceptions } from "../../../../actions/base/baseTest.actions";
import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-5157_61.fixture";
import { _NavigationSection } from '../../../../actions/base';

conditionalDescribe('describe', () => {
    beforeEach(() => {
       
        createReport(testData.reportCreationData);
        salesInterceptions();
    });

    it('it', () => {
        cy.log('test start');
        _NavigationSection.navigateToFindComps();
        Sales.FindComps.AddressSearch.openAddressSearchTab()
            .addCompByParameter(1);
         


    });
});