import { Tag } from './../../../../utils/tags.utils';
import { Sales } from './../../../../actions/index';
import { _NavigationSection } from './../../../../actions/base/index';
import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4167.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe("[QA-4168] Verify the Appraiser Commentary field", { tags: [ Tag.sales, Tag.find_comps, Tag.comp_plex ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
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
        Sales._FindComps.Page.saleDateCalendarNewComp.click().type(`${testData.saleInfo.saleDate}{enter}`);
        Sales._FindComps.Page.buyerGranteeNewComp.type(testData.saleInfo.buyer);
        Sales._FindComps.Page.sellerGrantor.type(testData.saleInfo.seller);
        Sales._FindComps.selectDropdownOptionNewComp(Sales._FindComps.Page.sourceDropdown, testData.selectItems.source);
        Sales._FindComps.Page.newCompContinueButton.click();

        cy.stepInfo(` 1. Verify the Appraiser Commentary is free text input type;
            -Try to enter any numerical / non-integer / text value;
            -Try to copy-paste;
            -Verify a long value;
            -The field is optional;
            -The text: ”This commentary is for internal use only and will not export” is displayed below the field.`);
        Sales._FindComps.Page.newCompSaveAndCloseButton.should("be.enabled");
        Sales._FindComps.enterAppraiserCommentary(testData.verifyTextValue);
        Sales._FindComps.Page.appraiserCommentaryTextArea.clear().invoke("val", testData.verifyTextValue);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});