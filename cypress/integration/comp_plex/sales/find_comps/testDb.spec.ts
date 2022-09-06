//THIS TEST IS FOR EXAMPLE ONLY

import Sales from "../../../../actions/sales/sales.manager";
import { conditionalDescribe } from "../../../checkIsProd.utils";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { salesInterceptions } from "../../../../actions/base/baseTest.actions";
import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-5157_61.fixture";
import { _NavigationSection } from '../../../../actions/base';
import Enums from "../../../../enums/enums";

const compProperty = Enums.COMP_PROPERTIES_PATHS_DB.compPropertyPathsInDB.saleStatus;
const compStatusContract = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.inContract;
const compStatusDate = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.date;

conditionalDescribe('describe', {
    tags: [ "@test" ] },  () => {
    before(() => {
        createReport(testData.reportCreationData);
    });

    it('Test body', () => {  
        cy.log('test start');
        _NavigationSection.navigateToFindComps()
            .verifyProgressBarNotExist();
        Sales.FindComps.AddressSearch.openAddressSearchTab()
            .addCompByParameter(2, compProperty, compStatusContract)
            .addCompByParameter(1, compProperty, compStatusDate);
            
    });
});