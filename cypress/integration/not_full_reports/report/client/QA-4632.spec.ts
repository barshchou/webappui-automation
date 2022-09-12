import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import Enums from "../../../../enums/enums";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4632.fixture';

describe.skip("Verify the Cancel button functionality for Intended User and Identification of the Client sections",
    { tags:[ "@report", "@client" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`1. Click on the Edit button on the Report > Client page for Intended User 
            and Identification of the Client sections.`);
            _NavigationSection.navigateToClientPage();
            Report._Client.verifyProgressBarNotExist()
                .Page.formEditBtn().click();
            Report._Client.Page.formEditBtn().click();

            cy.stepInfo(`2. Verify that the Cancel button is displayed instead of the Edit button for both sections.`);
            Report._Client.Page.formCancelButton().should("be.visible");
            Report._Client.Page.formCancelButton(1).should("be.visible");

            cy.stepInfo(`3. Click on the Cancel button and verify that the form closes form without saving 
            changes with no warning message for both sections.`);
            Report._Client.Page.formCancelButton().click();
            Report._Client.Page.formCancelButton().click();
            Report._Client.verifyFormCommentTextBoxText(Enums.PAGES_TEXTBOX_NAMES.intendedUser,
                testData.verifyIntendedUserTextArea)
                .verifyFormCommentTextBoxText(Enums.PAGES_TEXTBOX_NAMES.identificationOfTheClient,
                    testData.verifyIdentificationOfTheClientTextArea);
        });
    });