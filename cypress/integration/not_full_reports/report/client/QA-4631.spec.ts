import { Tag } from './../../../../utils/tags.utils';
import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4631.fixture';

describe("Verify the Cancel button functionality for Intended User and Identification of the Client sections", { tags:[ Tag.report, Tag.client, "test_client" ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Verify that the Edit buttons are displayed on the Report > Client page for Intended User and Identification of the Client sections.");
        _NavigationSection.navigateToClientPage();
        Report._Client.verifyProgressBarNotExist()
        .Page.formEditBtn(0).should("be.visible");
        Report._Client.Page.formEditBtn(1).should("be.visible");

        cy.stepInfo("2. Click on the Edit button for both sections.");
        Report._Client.Page.formEditBtn(0).click();
        Report._Client.Page.formEditBtn(0).click();

        cy.stepInfo("3. Verify that the commentary form opens and buttons Cancel, Revert to Original and Save are displayed for both sections.");
        Report._Client.Page.formCancelButton(0).should("be.visible");
        Report._Client.Page.formCancelButton(1).should("be.visible");
        Report._Client.Page.formRevertToOriginalBtn(0).should("be.visible");
        Report._Client.Page.formRevertToOriginalBtn(1).should("be.visible");

        deleteReport(testData.reportCreationData.reportNumber);
    });
});