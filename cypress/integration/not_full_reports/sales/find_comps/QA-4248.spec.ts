import Homepage from "../../../../actions/base/homepage.actions";
import fixture from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4248.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";
import { createReport } from "../../../../actions/base/baseTest.actions";
import mapKeysUtils from "../../../../utils/mapKeys.utils";

/*
 * TODO: https://bowery.atlassian.net/browse/QA-6383 Update test spec after test case update
 * Test is skipped as it's outdated. Import modal moved to another place.
 */
describe.skip("Verify the Comps can be added by entering the existing Report ID in the modal", 
    { tags:[ "@comp_plex", "@sales", "@find_comps" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(fixture.reportCreationData);
        });

        it("Test body", () => {
            NavigationSection.navigateToFindComps();
            Sales.FindComps.zoomInAndResetFilters();
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
                Sales.FindComps.clickImportComparableButton()
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .JobSearch.enterReportToSearchComp(<any>reportId);
            });
            Sales.FindComps.JobSearch.clickSearchButton();
            Sales.FindComps.checkSingleSalesCompsByEventId()
                .selectAllCompsForImport()
                .checkSelectedSingleSalesComps()
                .JobSearch.clickImportCompsFromReportButton();
        });
    });