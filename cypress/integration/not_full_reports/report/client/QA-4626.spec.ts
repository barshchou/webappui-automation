import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/property/amenities/QA-4626-64.fixture';

describe("Verify the display of the Client page.", { tags:[ "@report", "@client" ] }, () => {
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Proceed to the Report > Client page.");
        _NavigationSection.navigateToClientPage();

        cy.stepInfo(`2. Verify the following elements are displayed on the page:
            Title of the page - Client
            Warning message: “Add new clients on the Organization Settings page.“
            Client field - “Search Clients“ placeholder
            Client File Number field
            NYCB Application No. (Optional)
            Client Guidelines Discussion section`);
        Report._Client.verifyProgressBarNotExist()
            .Page.clientTitle.should("be.visible");

        Report._Client.Page.warningMessage.should("be.visible");
        Report._Client.Page.clientNameField.should("be.visible");
        Report._Client.Page.clientFileNumberField.should("be.visible");
        Report._Client.Page.nycbApplicationNumber.should("be.visible");
        Report._Client.Page.intendedUserTextBox.should("be.visible");
        Report._Client.Page.identificationOfClientTextBox.should("be.visible");
        Report._Client.Page.clientGuidelinesCommentary.should("be.visible");
    });
});