import Homepage from "../../../../actions/base/homepage.actions";
import fixture from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4248.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import mapKeysUtils from "../../../../utils/mapKeys.utils";
import { _map } from "../../../../support/commands";
import { recurse } from "cypress-recurse";

/**
 * TODO: move this function into SalesComps action when fixing Sales specs
 * list of elems -> iterate over it -> if elem includes address = return from 
 */
const _scrollAndSearchComp = (compAddress:string) => {
    return cy.get('[aria-label="grid"] > div > div', { includeShadowDom: true }).each((elem, index, list) => {
        cy.log(`Found ${list.length} SalesComps in search list`);
        if(elem.text().includes(compAddress)){
            cy.log(`Found SalesComps in next list ${list} with index ${index}`);
            _map.set("key", elem);
            return;
        }
        else if(list.length == index+1){
            if(_map.get("key") == undefined){
                cy.log("Scrolling to last comp in to continue search");
                cy.wrap(elem).scrollIntoView();
                return;
            }
            return;
        }
    });
};

describe("Verify the Comps can be added by entering the existing Report ID in the modal", 
{ tags:[ "@fix", "@comp_plex", "@sales", "@find_comps" ] }, () => {
    before("Login, create report", () => {
        createReport(fixture.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToFindComps();
        recurse(
            () => _scrollAndSearchComp(fixture.comparable.address), 
            () => _map.get("key") != undefined, { delay: 2000, timeout: 60000 }
        );

        Sales.FindComps.selectCompFromMapByAddress(fixture.comparable.address)
            .clickSaveContinueButton();
        Sales.CreateCompMap.verifyPageOpened();
        cy._mapGet(mapKeysUtils.report_id).then(reportId => {
            cy.log(`Current report ID is ${reportId}`);
            Sales.CreateCompMap.returnToHomePage();
            Homepage.verifyThatPageIsOpened()
                .verifyProgressBarNotExist();
            Homepage.createReport(fixture.reportCreationData);
            NavigationSection.navigateToFindComps(true);
            Sales.FindComps.clickImportComparableButton()
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .enterReportToSearchComp(<any>reportId);
        });
        Sales.FindComps.Actions.clickSearchButton()
            .checkSingleSalesCompsByEventId()
            .selectAllCompsForImport()
            .checkSelectedSingleSalesComps()
            .clickImportCompsFromReportButton();
        Sales.FindComps.verifyAddedCompAddress(fixture.comparable.address);
        deleteReport(fixture.reportCreationData.reportNumber);
        cy.reload();
        Homepage.deleteReport(fixture.reportCreationData.reportNumber);
    });
});