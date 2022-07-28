import { Sales } from '../../../../actions';
import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-5157_61.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { salesInterceptions } from "../../../../actions/base/baseTest.actions";
import { conditionalDescribe } from "../../../checkIsProd.utils";
/*
 * import mapKeysUtils from "../../../../utils/mapKeys.utils";
 * import Homepage from "../../../../actions/base/homepage.actions";
 */

conditionalDescribe(`[QA-5157] [QA-5161] [Sales > Find Comps] "Date Sold" sorting is selected by default 
                     for sales comps + sorting is applied correctly`,
{ tags: [ "@sales", "@find_comps", "@comp_plex" ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
        cy.saveLocalStorage();
    });
    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("[QA-5157] [Sales > Find Comps] 'Date Sold' sorting is selected by default for sales comps", () => {
        cy.stepInfo(`1.Navigate to Sales > Find Comps page `);
        _NavigationSection.navigateToFindComps();

        cy.stepInfo(`2. Verify "Date Sold" sorting is selected by default for sales comps`);
        Sales._FindComps.Page.sortSalesCompsSelectValue.should('contain', testData.sortSalesCompsValue);
    });

    it("[QA-5161] [Sales > Find Comps] 'Date Sold' sorting is applied correctly to selected comps", () => {
        cy.stepInfo(`1.Verify that when "Date Sold" option in Sort dropdown is selected 
                    comps are sorted in the next order:
                    - In-Contract at the top
                    - Listing
                    - date sold from most to least recent 
                    (comps added via map search )`);
        salesInterceptions();
        Sales._FindComps.resetAllFilters()
            .selectfilterSalePeriodValue(testData.salePeriodValue);
        Sales._FindComps.selectCompFromMapByAddress(testData.comparableFixture1.address)
            .verifyAddedCompAddress(testData.comparableFixture1.address)
            .selectCompFromMapByAddress(testData.comparableFixture2.address)
            .verifyAddedCompAddress(testData.comparableFixture2.address)
            .selectCompFromMapByAddress(testData.comparableFixture3.address)
            .verifyAddedCompAddress(testData.comparableFixture3.address)
            .selectCompFromMapByAddress(testData.comparableFixture4.address)
            .verifyAddedCompAddress(testData.comparableFixture4.address)
            .resetAllFilters()
            .selectCompFromMap()
            .selectCompFromMap(1)
            .checkSalesCompSortedByDateSold();

        cy.stepInfo(`2.Verify that when "Date Sold" option in Sort dropdown is selected 
                    comps are sorted in the next order:
                    - In-Contract at the top
                    - Listing
                    - date sold from most to least recent 
                    (comps created by user)`);
        cy.reload();
        testData.addCompWithStatus(testData.comparableFixtureManual.address1,
            testData.comparableFixtureManual.saleStatusListing);
        testData.addCompWithStatus(testData.comparableFixtureManual.address2,
            testData.comparableFixtureManual.saleStatusListing);
        testData.addCompWithStatus(testData.comparableFixtureManual.address3,
            testData.comparableFixtureManual.saleStatusUnderContract);
        testData.addCompWithStatus(testData.comparableFixtureManual.address4,
            testData.comparableFixtureManual.saleStatusUnderContract);
        testData.addCompWithStatus(testData.comparableFixtureManual.address5,
            testData.comparableFixtureManual.saleStatusTransaction);
        testData.addCompWithStatus(testData.comparableFixtureManual.address6,
            testData.comparableFixtureManual.saleStatusTransaction);
        Sales._FindComps.checkSalesCompSortedByDateSold();

        cy.stepInfo(`3.Verify that when "Date Sold" option in Sort dropdown 
                    is selected comps are sorted in the next order:
                    - In-Contract at the top
                    - Listing
                    - date sold from most to least recent 
                    (import from another report)`);
        /*
         * Sales._FindComps.clickSaveContinueButton();
         * Sales._CreateCompMap.verifyPageOpened();
         * cy._mapGet(mapKeysUtils.reportId).then(reportId => {
         *     cy.log(`Current report ID is ${reportId}`);
         *     Sales._CreateCompMap.returnToHomePage();
         *     Homepage.verifyThatPageIsOpened()
         *         .verifyProgressBarNotExist();
         *     Homepage.createReport(testData.reportCreationData);
         *     _NavigationSection.navigateToFindComps(true);
         */
        //Sales._FindComps.addNewCompViaReportId(<any>reportId)

        // TODO this is hardcode! uncomment line above and delete these below after comp-plex import fixes!
        cy.reload();
        Sales._FindComps.addNewCompViaReportId('61892ce7044194001c6349c9')
            .addNewCompViaReportId('622f89ef8aa15500214328e9')
            .checkSalesCompSortedByDateSold();

        cy.stepInfo(`1.Verify that when "Date Sold" option in Sort dropdown 
                    is selected comps are sorted in the next order:
                    - In-Contract at the top
                    - Listing
                    - date sold from most to least recent 
                    (comps added via uploaded from CSV )`);
        Sales._FindComps.uploadComps(testData.filePath)
            .verifyUploadCompsSucceded()
            .checkSalesCompSortedByDateSold();
    });
});