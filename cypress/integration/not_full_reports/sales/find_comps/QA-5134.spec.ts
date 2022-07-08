import { Sales } from '../../../../actions';
import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4167.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe("[QA-4167] Verify the Appraiser Commentary field", { tags: [ "@sales", "@find_comps", "@comp_plex" ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo(`
        Verify when “custom” is selected, the user can drag and drop Selected comps up and down in the list. 
        NOTE: The drag and drop functionality is disabled when Sort: Sale Date is selected`
        );

        _NavigationSection.navigateToFindComps().pause();
        
        [ 0, 1, 2 ].forEach(() => {
            Sales._FindComps.Actions.selectCompFromMap();
        });
        Sales._FindComps.Actions.selectedCompsSetSort("Custom").pause();

        cy.get('[data-qa="selected-sales-comps-table"] [data-qa="address"]').spread((...comps) => {
            // ernst: removing first undraggable comps from list
            comps.shift();
            cy.wrap(comps).as("comps");
            cy.log(comps);
        });
        

        // .openAddNewComparableFormSearchResult(testData.compAddress)
        // .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.condition);
        // Sales._FindComps.Actions.
        // PropertyInfo.setCommercialUnits(`${testData.units.numberOfUnits}`).setCommercialArea(`${testData.units.grossArea}`)
        // .Page.newCompContinueButton.click();
        // Sales._FindComps.Actions.
        // SaleInfo.selectSaleDate().setBuyerGrantee(testData.saleInfo.buyer).setSellerGarantor(testData.saleInfo.seller);
        // Sales._FindComps
        // .Actions.Page.newCompContinueButton.click();

        // cy.stepInfo(` 1. Verify the Appraiser Commentary is free text input type;
        //     -Try to enter any numerical / non-integer / text value;
        //     -Try to copy-paste;
        //     -Verify a long value;
        //     -The field is optional;`);
        // Sales._FindComps.Page.newCompSaveAndCloseButton.should("be.enabled");
        // Sales._FindComps.Actions.PropertyDesc.enterAppraiserCommentary(testData.verifyTextValue);
        // Sales._FindComps.Actions.emulateCopyPaste(
        //     Sales._FindComps.Page.appraiserCommentaryTextArea, testData.verifyTextValue
        // );

        deleteReport(testData.reportCreationData.reportNumber);
    });
});