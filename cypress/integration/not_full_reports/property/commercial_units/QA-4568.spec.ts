import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4568.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import {_NavigationSection} from "../../../../actions/base";
import {Property} from "../../../../actions";

describe("Verify the Save & Continue button functionality on the Commercial Units page", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. The Save & Continue button is displayed on the Commercial Units page.");
        _NavigationSection.navigateToCommercialUnits()
            .Page.SaveAndContinueBtn.should("be.visible");
        
        cy.stepInfo("2. Click on the Back button and verify the user is redirected to the previous page (Property > Site Description).");
        testData.arrayValuesAndGroup.forEach(item => {
            Property._CommercialUnits.clickRadioButtonByValueAndUnitIndex(item.group, item.value);
            Property._CommercialUnits.clickSaveButton()
                .verifyProgressBarNotExist();
            Property._CommercialUnits.verifyRadioIsChecked(item.group, item.value);
        });
        Property._CommercialUnits.clickSaveContinueButton();

        cy.stepInfo("3. Verify that the changes are saved and the user is redirected to the next page (Property > Utilities).");
        Property._Utilities.Page.utilitiesPageTitle.should("have.text", testData.titleValue);
        _NavigationSection.navigateToCommercialUnits();
        
        deleteReport(testData.reportCreationData.reportNumber);
    });
});
