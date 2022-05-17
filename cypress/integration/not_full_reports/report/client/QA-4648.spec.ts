import { Tag } from './../../../../utils/tags.utils';
import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4648.fixture';

describe("[QA-4648] Verify the Save button functionality on the Report > Client page", 
    { tags:[ Tag.report, Tag.client ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. The Save button is displayed on the Client page.");
        _NavigationSection.navigateToClientPage();

        Report._Client.verifyProgressBarNotExist()
            .Page.formEditBtn(0).click().should('be.visible');
        Report._Client.Page.formEditBtn(0).click().should('be.visible');
        Report._Client.Page.formSaveBtn(0).should('be.visible');
        Report._Client.Page.formSaveBtn(1).should('be.visible');

        cy.stepInfo("2. Fill in the editable fields with values and click on the Save button.");
        Report._Client.enterIntendedUserTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue)
            .enterIdentificationOfTheClientTextBox(testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue, 1)
            .Page.formSaveBtn(0).click();
        Report._Client.Page.formSaveBtn(0).click();
        Report._Client.verifyIntendedUserTextBox(testData.verifyAreaValue)
            .verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue);

        cy.stepInfo("3. Refresh the page / or re-enter the page and verify that the changes from step 2 are still applied.");
        Report._Client.clickSaveButton()
            .verifyProgressBarNotExist();
        cy.reload();
        Report._Client.verifyIntendedUserTextBox(testData.verifyAreaValue)
            .verifyIdentificationOfTheClientTextBox(testData.verifyAreaValue);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});