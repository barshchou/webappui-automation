import { Sales } from '../../../../actions';
import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-5163.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { salesInterceptions } from "../../../../actions/base/baseTest.actions";
import { conditionalDescribe } from "../../../checkIsProd.utils";


conditionalDescribe(`[QA-5163] [QA-51] [Sales > Find Comps] "Date Sold" sorting is selected by default 
                     for sales comps + sorting is applied correctly`,
{ tags: [ "@sales", "@find_comps", "@comp_plex" ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
        cy.saveLocalStorage();
    });
    beforeEach(() => {
        cy.restoreLocalStorage();
        salesInterceptions();
    });

    it("[QA-5163] [Sales > Find Comps] 'Date Sold' sorting is updated if user changes Date Sold for a comp", () => {
        cy.stepInfo(`1.Navigate to Sales > Find Comps page `);
        _NavigationSection.navigateToFindComps();

        cy.stepInfo(`2. Add sales comps manually`);
        function addCompWithStatus(address: string, saleStatus: string) {
            Sales._FindComps
                .openAddNewComparableFormSearchResult(address)
                .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown,
                    testData.comparableFixtureManual.condition)
                .selectDropdownOptionNewComp(Sales._FindComps.Page.comparableTypeDropdown,
                    testData.comparableFixtureManual.comparableType);
            Sales._FindComps
                .PropertyInfo.setResidentialUnits(`${testData.comparableFixtureManual.units.numberOfUnits}`)
                .setSiteArea(`${testData.comparableFixtureManual.siteArea}`)
                .setFloor(`${testData.comparableFixtureManual.floors}`);
            Sales._FindComps.clickAddNewCompContinueButton();
            Sales._FindComps
                .SaleInfo.setBuyerGrantee(testData.comparableFixtureManual.saleInfo.buyer)
                .setSellerGrantor(testData.comparableFixtureManual.saleInfo.seller)
                .selectSaleDate('random');
            Sales._FindComps
                .selectDropdownOptionNewComp(Sales._FindComps.Page.SaleStatusDropdown, saleStatus);
            Sales._FindComps.clickAddNewCompContinueButton();
            Sales._FindComps.clickAddNewCompSaveAndCloseButton();
            return this;
        }

        testData.arrayOfCompsForManualAddition.forEach(comp => {
            addCompWithStatus(comp.address, comp.status);
            Sales._FindComps.verifyAddedCompAddress(comp.address);
        });
        Sales._FindComps.checkSalesCompSortedByDateSold();

        cy.stepInfo(`3. Check comps order when user changes 'Sale status' `);
        Sales._FindComps.openDetailsModal(testData.comparableFixtureManual.address1)
            .SalesCompDetails.openSaleInformationForm();
        Sales._FindComps.selectDropdownOptionNewComp(Sales._FindComps.Page.SaleStatusDropdown, 
            testData.comparableFixtureManual.saleStatusUnderContract)
            .SaleInfo.checkRadioButtonSaleCondition(testData.radioButtonSaleConditionNonArms)
            .saveChangesOnDone();
        Sales._FindComps.SalesCompDetails.saveCompChanges();
        Sales._FindComps.checkSalesCompSortedByDateSold();

        Sales._FindComps.openDetailsModal(testData.comparableFixtureManual.address3)
            .SalesCompDetails.openSaleInformationForm();
        Sales._FindComps.selectDropdownOptionNewComp(Sales._FindComps.Page.SaleStatusDropdown, 
            testData.comparableFixtureManual.saleStatusTransaction)
            .SaleInfo.checkRadioButtonSaleCondition(testData.radioButtonSaleConditionNonArms)
            .saveChangesOnDone();
        Sales._FindComps.SalesCompDetails.saveCompChanges();
        Sales._FindComps.checkSalesCompSortedByDateSold();

        Sales._FindComps.openDetailsModal(testData.comparableFixtureManual.address5)
            .SalesCompDetails.openSaleInformationForm();
        Sales._FindComps.selectDropdownOptionNewComp(Sales._FindComps.Page.SaleStatusDropdown, 
            testData.comparableFixtureManual.saleStatusUnderContract)
            .SaleInfo.checkRadioButtonSaleCondition(testData.radioButtonSaleConditionNonArms)
            .saveChangesOnDone();
        Sales._FindComps.SalesCompDetails.saveCompChanges();
        Sales._FindComps.checkSalesCompSortedByDateSold();
        

    });

    it("[QA-51] [Sales > Find Comps] ", () => {
        cy.stepInfo(`1.Verify that when "Date Sold" option in Sort dropdown is selected 
                    comps are sorted in the next order:
                    - In-Contract at the top
                    - Listing
                    - date sold from most to least recent 
                    (comps added via map search )`);
        
    });
});