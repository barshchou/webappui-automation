import { Report, ReviewExport } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import testData from '../../../../../fixtures/not_full_reports/sf_integration/report/client/QA-4035_38.fixture';

describe(`Verify that the Client field is pre-filled on the WebApp with the date corresponding to the 
        Client Contact for that job in SalesForce.`, {
    tags: [ "@report", "@client", "@check_export", "@salesforce" ]
}, () => {
    it("[QA-4035_38]", () => {
        cy.stepInfo(`1. Create a new report on the WebApp (Note: the JOB # of that report corresponds
                    with the JOB # of an open job on SalesForce)`);
        createReport(testData.reportCreationData);

        cy.stepInfo("2. Navigate to the Report > Client page.");
        _NavigationSection.navigateToClientPage();

        cy.stepInfo("3. Verify name in the Client field");
        Report._Client.Page.getClientNameField().should("have.value", testData.clientName);

        cy.stepInfo("4. Export the report");
        _NavigationSection.Actions.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(`JOB-${testData.reportCreationData.reportNumber}_462`);
    });

    it("Check export", () => {
        cy.task("getFilePath",
            { _reportName: `${testData.reportCreationData.reportNumber}_462`, _docxHtml: "html" }
        ).then(file => {
            cy.log(<string>file);
            cy.visit(<string>file);

            cy.stepInfo("5. Verify export name");
            cy.contains("Requested By").next().should("include.text", testData.clientName);
            cy.contains("In accordance with your request").prev()
                .prev().prev().scrollIntoView().should("include.text", testData.clientName);
        });
    });

});