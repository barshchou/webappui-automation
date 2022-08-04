import { Sales } from '../../../../actions';
import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4168.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";

describe("[QA-4168] Verify the Internal Notes field", { tags: [ "@sales", "@find_comps", "@comp_plex" ] }, () => {
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo(`Preconditions: -Click on the Create Comp button > Enter New Comparable Address > 
        Select the Address from the Search Results and click on the Create New button to proceed 
        to the Enter Property Information form. 
        -Fill in all required fields and click on the Continue button to proceed to the Enter Sale Information form.
        -Fill in all required fields and click on the Continue button to proceed 
        to the Enter Property Description form.`);

        _NavigationSection.navigateToFindComps();

        Sales._FindComps.Actions
            .openAddNewComparableFormSearchResult(testData.compAddress, 1)
            .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.condition);
        Sales._FindComps.Actions.PropertyInfo.setCommercialUnits(`${testData.units.numberOfUnits}`)
            .setCommercialArea(`${testData.units.grossArea}`)
            .Page.newCompContinueButton.click();
        Sales._FindComps.Actions.SaleInfo.selectSaleDate().setBuyerGrantee(testData.saleInfo.buyer)
            .setSellerGrantor(testData.saleInfo.seller);
        Sales._FindComps
            .Actions.Page.newCompContinueButton.click();

        cy.stepInfo(` 1.Verify the Internal Notes is free text input type;
        -Try to enter any numerical / non-integer / text value;
        -Try to copy-paste;
        -Verify a long value;
        -The field is optional;
        -The text: ”This commentary is for internal use only and will not export” is displayed below the field.`);
        Sales._FindComps.Page.newCompSaveAndCloseButton.should("be.enabled");
        Sales._FindComps.Actions.PropertyDesc.enterInternalNotes(testData.verifyTextValue);
        Sales._FindComps.Actions.emulateCopyPaste(
            Sales._FindComps.Page.internalNotesTextArea, testData.verifyTextValue
        );
    });
});