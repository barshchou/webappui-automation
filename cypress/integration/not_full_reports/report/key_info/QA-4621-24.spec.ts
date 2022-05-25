import testData from "../../../../fixtures/not_full_reports/report/key_info/QA-4621-24.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Report } from "../../../../actions";

describe("The Letter of Engagement prefill from Dropbox to LoE filed in WebApp - 1 LoE PDF file",
    { tags: [ "@report", "@key_info", "@salesforce" ] }, () => {
    it("[QA-4621]", () => {
        cy.stepInfo(" 1. Create a new report on the WebApp (Note: the JOB # of that report corresponds with the JOB # of an open job on SalesForce)");
        createReport(testData.firstReportCreationData);

        cy.stepInfo("2. Navigate to the Report > Key Info > Engagement");
        _NavigationSection.navigateToReportInformation();
        
        cy.stepInfo("3. Verify that the Letter Of Engagement PDF from Dropbox is auto-filled.");
        Report._KeyInfo.Page.inputToCheckUpload.should("have.value", testData.verifyValue);

        deleteReport(testData.firstReportCreationData.reportNumber);
    });

    it("[QA-4622]", () => {
        cy.stepInfo(" 1. Create a new report on the WebApp (Note: the JOB # of that report corresponds with the JOB # of an open job on SalesForce)");
        createReport(testData.secondReportCreationData);

        cy.stepInfo("2. Navigate to the Report > Key Info > Engagement");
        _NavigationSection.navigateToReportInformation();
        
        cy.stepInfo("3. Verify that the Letter Of Engagement field is empty and nothing is auto-filled from Dropbox");
        Report._KeyInfo.Page.inputToCheckUpload.should("be.empty");

        deleteReport(testData.secondReportCreationData.reportNumber);
    });

    it("[QA-4623]", () => {
        cy.stepInfo(" 1. Create a new report on the WebApp (Note: the JOB # of that report corresponds with the JOB # of an open job on SalesForce)");
        createReport(testData.thirdReportCreationData);

        cy.stepInfo("2. Navigate to the Report > Key Info > Engagement");
        _NavigationSection.navigateToReportInformation();
        
        cy.stepInfo("3. Verify that the Letter Of Engagement field is empty and nothing is auto-filled from Dropbox");
        Report._KeyInfo.Page.inputToCheckUpload.should("be.empty");

        deleteReport(testData.thirdReportCreationData.reportNumber);
    });

    it("[QA-4624]", () => {
        cy.stepInfo(" 1. Create a new report on the WebApp (Note: the JOB # of that report corresponds with the JOB # of an open job on SalesForce)");
        createReport(testData.fourthReportCreationData);

        cy.stepInfo("2. Navigate to the Report > Key Info > Engagement");
        _NavigationSection.navigateToReportInformation();
        
        cy.stepInfo("3. Verify that the Letter Of Engagement field is empty and nothing is auto-filled from Dropbox");
        Report._KeyInfo.Page.inputToCheckUpload.should("be.empty");

        deleteReport(testData.fourthReportCreationData.reportNumber);
    });
});