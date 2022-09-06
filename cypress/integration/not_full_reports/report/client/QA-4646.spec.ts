import testData from "../../../../fixtures/not_full_reports/report/client/QA-4646.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import { Report, PreviewEdit, Base } from "../../../../actions";
import { replaceEntersWithSpaces } from "../../../../../utils/string.utils";

// TODO: Test fails. Recheck after bug fix. Letter of transmittal doesn't update.
describe("Verify the Appraiser Commentary field", 
    { tags: [ "@report", "@client" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            NavigationSection.navigateToClientPage();
            Report._Client
                .enterFormCommentTextBox(testData.textBoxName, testData.textToType, true, { position: "center" });
            Base._NavigationSection.navigateToLetterOfTransmittal();
            PreviewEdit._LetterOfTransmittal.verifyPreviewButtonSelected();
            cy.contains(replaceEntersWithSpaces(testData.textToType)).should("exist");
        });
    });