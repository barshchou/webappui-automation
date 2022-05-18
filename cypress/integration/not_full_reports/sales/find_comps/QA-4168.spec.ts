import { Tag } from './../../../../utils/tags.utils';
import { Sales } from './../../../../actions/index';
import { _NavigationSection } from './../../../../actions/base/index';
import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4168.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe("[QA-4168] Verify the Internal Notes field", { tags: [ Tag.sales, Tag.find_comps, Tag.comp_plex ] }, () => {
    before("Login, create report, precondition", () => {
        createReport(testData.reportCreationData);
        cy.stepInfo(`Preconditions: 
            -Click on the Create Comp button > Enter New Comparable Address > Select the Address from the Search Results and click on the Create 
            New button to proceed to the Enter Property Information form. 
            -Fill in all required fields and click on the Continue button to proceed to the Enter Sale Information form.
            -Fill in all required fields and click on the Continue button to proceed to the Enter Property Description form.`);
        _NavigationSection.navigateToFindComps();
        Sales._FindComps.openAddNewComparableFormSearchResult(testData.compAddress)
            .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.selectItems.condition);
        Sales._FindComps.Page.createCompNumberCommercialUnits.type(`${testData.units.numberOfUnits}`);
        Sales._FindComps.Page.commercialAreaNewComp.type(`${testData.units.numberOfUnits}`);
        Sales._FindComps.Page.newCompContinueButton.click();
        Sales._FindComps.Actions.SaleInfo.selectSaleDate();
        Sales._FindComps.Page.BuyerGranteeNewComp.type(testData.saleInfo.buyer);
        Sales._FindComps.Page.SellerGrantor.type(testData.saleInfo.seller);
        Sales._FindComps.selectDropdownOptionNewComp(
            Sales._FindComps.Page.SourceInput, testData.selectItems.source);
        Sales._FindComps.Page.newCompContinueButton.click();
    });

    it("Test body", () => {
        cy.stepInfo(` 1.Verify the Internal Notes is free text input type;
            -Try to enter any numerical / non-integer / text value;
            -Try to copy-paste;
            -Verify a long value;
            -The field is optional;
            -The text: ”This commentary is for internal use only and will not export” is displayed below the field.`);
        Sales._FindComps.Page.newCompSaveAndCloseButton.should("be.enabled");
        Sales._FindComps.Actions.PropertyDescription.enterInternalNotes(testData.verifyTextValue);
        Sales._FindComps.Page.internalNotesTextArea.clear().invoke("val", testData.verifyTextValue);
        cy.contains(testData.verifyTextUnderTextArea).should("be.visible");
        deleteReport(testData.reportCreationData.reportNumber);
    });
});