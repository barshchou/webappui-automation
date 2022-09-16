import { Sales } from '../../../../actions';
import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-5161.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { conditionalDescribe } from "../../../checkIsProd.utils";
import mapKeysUtils from "../../../../utils/mapKeys.utils";
import Homepage from "../../../../actions/base/homepage.actions";
 

conditionalDescribe(`[QA-5157] [QA-5161] [Sales > Find Comps] "Date Sold" sorting is selected by default 
                     for sales comps + sorting is applied correctly`,
{ tags: [ "@sales", "@find_comps", "@comp_plex" ] }, () => {
    before("Login, create report", () => {
        Cypress.config('numTestsKeptInMemory', 0);
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToFindComps();
    });

    it("[QA-5161] [Sales > Find Comps] 'Date Sold' sorting is applied correctly to selected comps", () => {
        
        cy.stepInfo(`1.Verify that when "Date Sold" option in Sort dropdown is selected 
                      comps are sorted in the next order:
                      - In-Contract at the top
                      - Listing
                      - date sold from most to least recent 
                      (comps added via address search)`);
        Sales._FindComps.AddressSearch.openAddressSearchTab()
            .addCompByParameter(1, testData.compProperty, testData.compStatusDate)
            .addCompByParameter(4, testData.compProperty, testData.compStatusDate)
            .addCompByParameter(0, testData.compProperty, testData.compStatusContract)
            .addCompByParameter(1, testData.compProperty, testData.compStatusContract)
            .addCompByParameter(0, testData.compProperty, testData.compStatusListing)
            .addCompByParameter(1, testData.compProperty, testData.compStatusListing);       
        Sales._FindComps.checkSalesCompSortedByDateSold();

        cy.stepInfo(`2.Verify that when "Date Sold" option in Sort dropdown is selected 
                    comps are sorted in the next order:
                    - In-Contract at the top
                    - Listing
                    - date sold from most to least recent 
                    (comps created by user)`);
        cy.reload();
        testData.arrayOfCompsForManualAddition.forEach(comp => {
            addCompWithStatus(comp.address, comp.status);
        });
        Sales._FindComps.checkSalesCompSortedByDateSold();

        cy.stepInfo(`3.Verify that when "Date Sold" option in Sort dropdown 
                    is selected comps are sorted in the next order:
                    - In-Contract at the top
                    - Listing
                    - date sold from most to least recent 
                    (import from another report)`);
        Sales._FindComps.clickSaveContinueButton();
        Sales._CreateCompMap.verifyPageOpened();
        cy._mapGet(mapKeysUtils.reportId).then(reportId => {
            cy.log(`Current report ID is ${reportId}`);
            Sales._CreateCompMap.returnToHomePage();
            Homepage.verifyThatPageIsOpened()
                .verifyProgressBarNotExist();
            Homepage.createReport(testData.reportCreationData);
            _NavigationSection.navigateToFindComps(true);
            Sales._FindComps.openJobSearchTab()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .JobSearch.addNewCompViaReportId(<any>reportId);
        });
        Sales._FindComps.checkSalesCompSortedByDateSold();

        cy.stepInfo(`4.Verify that when "Date Sold" option in Sort dropdown 
                    is selected comps are sorted in the next order:
                    - In-Contract at the top
                    - Listing
                    - date sold from most to least recent 
                    (comps added via uploaded from CSV )`);
        cy.reload();
        Sales._FindComps.uploadComps(testData.filePath)
            .checkSalesCompSortedByDateSold();
    });
});

function addCompWithStatus(address: string, saleStatus: string) {
    Sales._FindComps.openAddNewComparableFormSearchResult(address)
        .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown,
            testData.comparableFixtureManual.condition)
        .selectDropdownOptionNewComp(Sales._FindComps.Page.comparableTypeDropdown,
            testData.comparableFixtureManual.comparableType);
    Sales._FindComps.PropertyInfo.setResidentialUnits(`${testData.comparableFixtureManual.units.numberOfUnits}`)
        .setSiteArea(`${testData.comparableFixtureManual.siteArea}`)
        .setFloor(`${testData.comparableFixtureManual.floors}`);
    Sales._FindComps.clickAddNewCompContinueButton()
        .SaleInfo.setBuyerGrantee(testData.comparableFixtureManual.saleInfo.buyer)
        .setSellerGrantor(testData.comparableFixtureManual.saleInfo.seller)
        .selectSaleDate('random');
    Sales._FindComps.selectDropdownOptionNewComp(Sales._FindComps.Page.SaleStatusDropdown, saleStatus)
        .clickAddNewCompContinueButton()
        .clickAddNewCompSaveAndCloseButton();
    return this;
}