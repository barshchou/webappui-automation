import Homepage from "../../../../actions/base/homepage.actions";
import fixture from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4248.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import mapKeysUtils from "../../../../utils/mapKeys.utils";

describe("Verify the Comps can be added by entering the existing Report ID in the modal", 
    { tags:[ "@fix", "@comp_plex", "@sales", "@find_comps" ] }, () => {
        before("Login, create report", () => {
            createReport(fixture.reportCreationData);
        });

        it("Test body", () => {
            NavigationSection.navigateToFindComps();
            fixture.compsNumber.forEach(() => {
                Sales.FindComps.selectCompFromMap();
            });
        
            Sales.FindComps.clickSaveContinueButton();
            Sales.CreateCompMap.verifyPageOpened();
            cy._mapGet(mapKeysUtils.reportId).then(reportId => {
                cy.log(`Current report ID is ${reportId}`);
                Sales.CreateCompMap.returnToHomePage();
                Homepage.verifyThatPageIsOpened()
                    .verifyProgressBarNotExist();
                Homepage.createReport(fixture.reportCreationData);
                NavigationSection.navigateToFindComps(true);

                //TODO change logic of importing throw id report 

                Sales.FindComps.clickImportComparableButton()  
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .enterReportToSearchComp(<any>reportId);
            });
            Sales.FindComps.Actions.clickSearchButton()
                .checkSingleSalesCompsByEventId()
                .selectAllCompsForImport()
                .checkSelectedSingleSalesComps()
                .clickImportCompsFromReportButton();
            deleteReport(fixture.reportCreationData.reportNumber);
            cy.reload();
            Homepage.deleteReport(fixture.reportCreationData.reportNumber);
        });
    });