import testData from "../../../../fixtures/not_full_reports/report/client/QA-4646.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Report from "../../../../actions/report/report.manager";
import PreviewEdit from "../../../../actions/preview_edit/previewEdit.manager";
import {replaceEntersWithSpaces} from "../../../../../utils/string.utils";

describe("Verify the Appraiser Commentary field", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToClientPage();
        Report.Client.enterAppraiserCommentary(testData.textToType);
        NavigationSection.navigateToLetterOfTransmittal();
        PreviewEdit.LetterOfTransmittal.verifyPreviewButtonSelected();
        cy.contains(replaceEntersWithSpaces(testData.textToType)).should("exist");
        deleteReport(testData.reportCreationData.reportNumber);
    });
});