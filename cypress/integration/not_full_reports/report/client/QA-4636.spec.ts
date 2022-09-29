import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4636.fixture';

describe(`Verify the Modified label functionality for Intended User and Identification of the Client sections`,
    { tags:[ "@report", "@client", "@bug", "@WEB_6902", "@narrative_comp" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`1. Activate text field on the Report > Client page for Intended User 
            section.`);
            _NavigationSection.navigateToClientPage()
                .verifyProgressBarNotExist();

            cy.stepInfo(`2. Edit Intended User comment and verify modified label visible`);
            Report._Client.enterFormCommentTextBox(testData.intendedUser, testData.textToType, false)
                .clickNarrativeSuggestions(testData.verifySuggestion)
                .Page.modifiedLabel(true, 0).should("be.visible");
               
            cy.stepInfo(`3. Revert commentary and verify label not exist`);
            Report._Client.revertToOriginalCommentarySectionByName(testData.intendedUser)
                .Page.modifiedLabel(false).should("not.exist");

            cy.stepInfo(`4. Edit Identification Of The Client comment and verify modified label visible`);
            Report._Client.verifyProgressBarNotExist()
                .enterFormCommentTextBox(testData.identificationOfTheClient, testData.textToType, false)
                .clickNarrativeSuggestions(testData.verifySuggestion, 1);
               
            cy.stepInfo(`5. Verify that the Modified label appears after saving changes made to commentary`);
            Report._Client.Page.modifiedLabel(true, 0).should("be.visible");
            Report._Client.revertToOriginalCommentarySectionByName(testData.identificationOfTheClient)
                .Page.modifiedLabel(false).should("not.exist");
        });
    });