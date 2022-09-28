import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4635.fixture';

describe(`Verify the Save button functionality for Intended User sections.`, 
    { tags: [ "@report", "@client" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("[QA-4635_2]", () => {
            cy.stepInfo(`1. Activate text field on the Report > Client page for Intended User section`);
            _NavigationSection.navigateToClientPage()
                .verifyProgressBarNotExist();

            cy.stepInfo(`2. Edit comment, inactivate text area and verify text save`);
            Report._Client.enterFormCommentTextBox(testData.intendedUser, testData.textToType, false)
                .clickNarrativeSuggestions(testData.verifyListValue)
                .inactivateTextAreaInput()
                .verifyFormCommentTextBoxText(testData.intendedUser, testData.verifyAreaValue);
            
            cy.stepInfo(`3. Refresh the page and Verify the changes from previous step disappear`);
            cy.reload();
            Report._Client.verifyFormCommentTextBoxText(testData.intendedUser, 
                testData.verifyAreaValue, testData.matcher);

            cy.stepInfo(`4. Edit comment, inactivate text area and verify text save`);
            Report._Client.enterFormCommentTextBox(testData.intendedUser, testData.textToType, false)
                .clickNarrativeSuggestions(testData.verifyListValue)
                .inactivateTextAreaInput()
                .verifyFormCommentTextBoxText(testData.intendedUser,
                    testData.verifyAreaValue);

            cy.stepInfo(`5. Click save button, refresh page and Verify text save`);
            Report._Client.clickSaveButton();
            // todo: add waitForPatchRequest for report
            cy.reload();
            Report._Client.verifyFormCommentTextBoxText(testData.intendedUser,
                testData.verifyAreaValue);

            cy.stepInfo(`6. Revert previous changes`);
            Report._Client.revertToOriginalCommentarySectionByName(testData.intendedUser)
                .clickSaveButton()
                .verifyProgressBarNotExist();

            cy.stepInfo(`7. Edit comment, inactivate text area and verify text save`);
            Report._Client.enterFormCommentTextBox(testData.intendedUser, testData.textToType, false)
                .clickNarrativeSuggestions(testData.verifyListValue)
                .inactivateTextAreaInput()
                .verifyFormCommentTextBoxText(testData.intendedUser, testData.verifyAreaValue);
            
            cy.stepInfo(`8. Refresh the page and Verify the changes from previous step disappear`);
            cy.reload();
            Report._Client.verifyFormCommentTextBoxText(testData.intendedUser, 
                testData.verifyAreaValue, testData.matcher);

            cy.stepInfo(`9. Edit comment, inactivate text area and verify text save`);
            Report._Client.enterFormCommentTextBox(testData.intendedUser, testData.textToType, false)
                .clickNarrativeSuggestions(testData.verifyListValue)
                .inactivateTextAreaInput()
                .verifyFormCommentTextBoxText(testData.intendedUser, testData.verifyAreaValue);

            cy.stepInfo(`10. Click save and continue button, return to previous page and Verify text save`);
            Report._Client.clickSaveContinueButton();
            _NavigationSection.navigateToClientPage();
            Report._Client.verifyFormCommentTextBoxText(testData.intendedUser,
                testData.verifyAreaValue);

            cy.stepInfo(`11. Revert previous changes`);
            Report._Client.revertToOriginalCommentarySectionByName(testData.intendedUser)
                .clickSaveButton()
                .verifyProgressBarNotExist();

            cy.stepInfo(`12. Edit comment, inactivate text area and verify text save`);
            Report._Client.enterFormCommentTextBox(testData.intendedUser, testData.textToType, false)
                .clickNarrativeSuggestions(testData.verifyListValue)
                .inactivateTextAreaInput()
                .verifyFormCommentTextBoxText(testData.intendedUser, testData.verifyAreaValue);
            
            cy.stepInfo(`13. Refresh the page and Verify the changes from previous step disappear`);
            cy.reload();
            Report._Client.verifyFormCommentTextBoxText(testData.intendedUser, 
                testData.verifyAreaValue, testData.matcher);

            cy.stepInfo(`14. Edit comment, inactivate text area and verify text save`);
            Report._Client.enterFormCommentTextBox(testData.intendedUser, testData.textToType, false)
                .clickNarrativeSuggestions(testData.verifyListValue)
                .inactivateTextAreaInput()
                .verifyFormCommentTextBoxText(testData.intendedUser, testData.verifyAreaValue);

            cy.stepInfo(`15. Navigate to another page and save changes, return to previous page and Verify text save`);
            _NavigationSection.navigateToPropertySummary()
                .navigateToClientPage();
            Report._Client.verifyFormCommentTextBoxText(testData.intendedUser, 
                testData.verifyAreaValue);
        });
    });
