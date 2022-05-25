import testData from "../../../../fixtures/not_full_reports/report/key_info/QA-4104.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Report, ReviewExport } from "../../../../actions";

describe("[QA-4104] Verify the Market Value generated commentary", 
    { tags: [ "@report", "@key_info", "@check_export" ] }, () => {
    it("Test body", () => {
        cy.stepInfo(`1. Create report while creating set the same Job number as report from SalesForce has (e.g. JOB-1764459005) 
            Make sure that there is no Inspection Date in the Salesforce job`);
        createReport(testData.reportCreationData);

        cy.stepInfo("2. Go to Report > Key Info > Definition of Market Value");
        _NavigationSection.navigateToReportInformation();
        Report._KeyInfo.clickYesButton();
        
        cy.stepInfo("3. Check that this sentence exports in the Introduction, replacing the boilerplate sentence currently exported there");
        Report._KeyInfo.Page.textBoxDefinitionOfMarketValue().should("include.text", testData.verifyText);

        cy.stepInfo("4. Check that there is a tooltip letting know where the text exports.");
        Report._KeyInfo.Page.iconDefinitionOfMarketValue().trigger("mouseover");
        Report._KeyInfo.Page.tooltipDefinitionOfMarketValue.should("include.text", testData.tooltipText);

        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);

        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Check export", () => {
        cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docx_html: "html" }).then(file => {
            cy.log(<string>file);
            cy.stepInfo("5. Check that this sentence exports in the Introduction, replacing the boilerplate sentence currently exported there");
            cy.visit(<string>file);

            cy.contains("Definition of Market Value").next().next().scrollIntoView().should("have.text", testData.verifyText);
        });
    }); 
});