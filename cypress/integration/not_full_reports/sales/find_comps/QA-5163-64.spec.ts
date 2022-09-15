import { Sales } from '../../../../actions';
import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-5163-64.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { salesInterceptions } from "../../../../actions/base/baseTest.actions";
import { conditionalDescribe } from "../../../checkIsProd.utils";


conditionalDescribe(`[QA-5163] [QA-5164] [Sales > Find Comps] "Date Sold" sorting is applied correctly + 
                     drag and drop functionality`,
{ tags: [ "@sales", "@find_comps", "@comp_plex" ] }, () => {

    beforeEach(() => {
        salesInterceptions();
    });

    it("[QA-5163] [Sales > Find Comps] 'Date Sold' sorting is updated if user changes Date Sold for a comp", () => {
        cy.stepInfo(`1. Login, create report + Navigate to Sales > Find Comps page `);
        createReport(testData.reportCreationData5163);
        _NavigationSection.navigateToFindComps();

        cy.stepInfo(`2. Add sales comps via .CSV`);
        Sales._FindComps.uploadComps(testData.filePath)
            .Page.sortSalesCompsSelectValue.should('contain', testData.sortSalesCompsDateSold);
        Sales._FindComps.checkSalesCompSortedByDateSold();

        cy.stepInfo(`3. Check comps order when user changes 'Sale status'`);
        Sales._FindComps.openDetailsModal(testData.comparableFixture.address1)
            .SalesCompDetails.openSaleInformationForm();
        Sales._FindComps.selectDropdownOptionNewComp(Sales._FindComps.Page.SaleStatusDropdown, 
            testData.comparableFixture.saleStatusListing)
            .SaleInfo.saveChangesOnDone();
        Sales._FindComps.saveCompChanges();
        Sales._FindComps.checkSalesCompSortedByDateSold();

        Sales._FindComps.openDetailsModal(testData.comparableFixture.address4)
            .SalesCompDetails.openSaleInformationForm();
        Sales._FindComps.selectDropdownOptionNewComp(Sales._FindComps.Page.SaleStatusDropdown, 
            testData.comparableFixture.saleStatusTransaction)
            .SaleInfo.setBuyerGrantee(testData.comparableFixture.saleInfo.buyer)
            .setSellerGrantor(testData.comparableFixture.saleInfo.seller)
            .checkRadioButtonSaleCondition(testData.radioButtonSaleConditionNonArms)
            .saveChangesOnDone();
        Sales._FindComps.saveCompChanges();
        Sales._FindComps.checkSalesCompSortedByDateSold();

        Sales._FindComps.openDetailsModal(testData.comparableFixture.address7)
            .SalesCompDetails.openSaleInformationForm();
        Sales._FindComps.selectDropdownOptionNewComp(Sales._FindComps.Page.SaleStatusDropdown, 
            testData.comparableFixture.saleStatusUnderContract)
            .SaleInfo.checkRadioButtonSaleCondition(testData.radioButtonSaleConditionNonArms)
            .saveChangesOnDone();
        Sales._FindComps.saveCompChanges();
        Sales._FindComps.checkSalesCompSortedByDateSold();
        
        cy.stepInfo(`4. Check comps order when user changes 'Contract Date' (with Transaction set as Sale Status)`);
        Sales._FindComps.openDetailsModal(testData.comparableFixture.address4)
            .SalesCompDetails.openSaleInformationForm();
        Sales._FindComps.SaleInfo.selectSaleDate('random')
            .saveChangesOnDone();
        Sales._FindComps.saveCompChanges();
        Sales._FindComps.checkSalesCompSortedByDateSold();

        Sales._FindComps.openDetailsModal(testData.comparableFixture.address8)
            .SalesCompDetails.openSaleInformationForm();
        Sales._FindComps.SaleInfo.selectSaleDate('random')
            .saveChangesOnDone();
        Sales._FindComps.saveCompChanges();
        Sales._FindComps.checkSalesCompSortedByDateSold();

        Sales._FindComps.openDetailsModal(testData.comparableFixture.address9)
            .SalesCompDetails.openSaleInformationForm();
        Sales._FindComps.SaleInfo.selectSaleDate('random')
            .saveChangesOnDone();
        Sales._FindComps.saveCompChanges();
        Sales._FindComps.checkSalesCompSortedByDateSold();
    });

    it(`[QA-5164] [Sales > Find Comps] The drag and drop functionality is disabled 
         when 'Date Sold' sorting is selected`, () => {
        cy.stepInfo(`1. Login, create report + Navigate to Sales > Find Comps page `);
        createReport(testData.reportCreationData5164);
        _NavigationSection.navigateToFindComps();
            
        cy.stepInfo(`2. Add comps via CSV `);
        Sales._FindComps.uploadComps(testData.filePath2Comps)
            .checkSalesCompSortedByDateSold();
            
        cy.stepInfo(`2. Verify "Date Sold" sorting is selected for sales comps + a comps exist in table`);
        Sales._FindComps.Page.sortSalesCompsSelectValue.should('contain', testData.sortSalesCompsDateSold);
        Sales._FindComps.Page.salesCompsDateSold.should(($compsDateList) => {
            expect($compsDateList.length).to.be.above(1);
        });

        cy.stepInfo(`3. Verify that the drag and drop functionality is disabled when 
                     "Date Sold" sorting is selected for sales comps`);
        cy.get(Sales._FindComps.Page.selectorDraggableElement(0)).should("not.exist"); ///?
    });
});