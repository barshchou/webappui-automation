import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4634.fixture';

describe(`Verify the 'Changes will be lost' modal functionality for Intended User
        and Identification of the Client sections`,
{ tags: [ "@report", "@client", "@bug", "@WEB-6902", "@narrative_comp" ] }, () => {
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("[QA-4634]", () => {
        cy.stepInfo(`1. Activate text field on the Report > Client page for Intended User 
                    section.`);
        _NavigationSection.navigateToClientPage()
            .verifyProgressBarNotExist();
          
        cy.stepInfo(`2. Edit comment and click on the Revert to Original button.`);
        Report._Client.enterFormCommentTextBox(testData.intendedUser, testData.textToType, false)
            .clickNarrativeSuggestions(testData.verifyListValue);

        cy.stepInfo(`3. Verify the 'Changes will be lost modal' is displayed.`);
        Report._Client.revertToOriginalCommentarySectionByName(testData.intendedUser);

        cy.stepInfo(`4. Click on the Revert to Original button again.`);
        Report._Client.enterFormCommentTextBox(testData.intendedUser, testData.textToType, false)
            .clickNarrativeSuggestions(testData.verifyListValue)
            .clickRevertToOriginalButtonBySection(testData.intendedUser);

        cy.stepInfo(`5. Click on the X icon and verify that the modal is closed and no changes are applied.`);
        Report._Client.clickCloseIcon()
            .verifyFormCommentTextBoxText(testData.intendedUser, testData.verifyAreaValue);

        cy.stepInfo(`6. Click on the Revert to Original button again.`);
        Report._Client.enterFormCommentTextBox(testData.intendedUser, testData.textToType, false)
            .clickNarrativeSuggestions(testData.verifyListValue)
            .clickRevertToOriginalButtonBySection(testData.intendedUser)
            .clickCloseIcon();

        cy.stepInfo(`7. Click on the Cancel button in the modal and verify that 
                    the modal is closed and no changes are applied.`);
        Report._Client.verifyFormCommentTextBoxText(testData.intendedUser, testData.verifyAreaValue);
            
        cy.stepInfo(`8. Click on the Revert to Original button again.`);
        Report._Client.enterFormCommentTextBox(testData.intendedUser, testData.textToType, false)
            .clickNarrativeSuggestions(testData.verifyListValue)
            .revertToOriginalCommentarySectionByName(testData.intendedUser);

        cy.stepInfo(`9. Click on the 'Yes, revert' button in the modal and verify that the modal is closed and all 
            custom changes made to the Current Commercial Income Discussion are deleted.`);
        Report._Client.verifyFormCommentTextBoxText(testData.intendedUser, 
            testData.verifyAreaValue, testData.matcher);

        cy.stepInfo(`10. Edit comment and click on the Revert to Original button.`);
        Report._Client.enterFormCommentTextBox(testData.identificationOfTheClient, testData.textToType, false)
            .clickNarrativeSuggestions(testData.verifyListValue, 1);

        cy.stepInfo(`11. Verify the 'Changes will be lost modal' is displayed.`);
        Report._Client.revertToOriginalCommentarySectionByName(testData.identificationOfTheClient);

        cy.stepInfo(`12. Click on the Revert to Original button again.`);
        Report._Client.enterFormCommentTextBox(testData.identificationOfTheClient, testData.textToType, false)
            .clickNarrativeSuggestions(testData.verifyListValue, 1)
            .clickRevertToOriginalButtonBySection(testData.identificationOfTheClient);

        cy.stepInfo(`14. Click on the X icon and verify that the modal is closed and no changes are applied.`);
        Report._Client.clickCloseIcon()
            .verifyFormCommentTextBoxText(testData.identificationOfTheClient, testData.verifyAreaValue);

        cy.stepInfo(`15. Click on the Revert to Original button again.`);
        Report._Client.enterFormCommentTextBox(testData.identificationOfTheClient, testData.textToType, false)
            .clickNarrativeSuggestions(testData.verifyListValue, 1)
            .clickRevertToOriginalButtonBySection(testData.identificationOfTheClient);
        Report._Client.clickCloseIcon();

        cy.stepInfo(`16. Click on the Cancel button in the modal and verify that 
                    the modal is closed and no changes are applied.`);
        Report._Client.verifyFormCommentTextBoxText(testData.identificationOfTheClient, testData.verifyAreaValue);
            
        cy.stepInfo(`17. Click on the Revert to Original button again.`);
        Report._Client.enterFormCommentTextBox(testData.identificationOfTheClient, testData.textToType)
            .clickNarrativeSuggestions(testData.verifyListValue, 1)
            .revertToOriginalCommentarySectionByName(testData.identificationOfTheClient);

        cy.stepInfo(`18.Click on the 'Yes, revert' button in the modal and verify that the modal is closed and all 
            custom changes made to the Current Commercial Income Discussion are deleted.`);
        Report._Client.verifyFormCommentTextBoxText(testData.identificationOfTheClient,
            testData.verifyAreaValue, testData.matcher);
    });
});
