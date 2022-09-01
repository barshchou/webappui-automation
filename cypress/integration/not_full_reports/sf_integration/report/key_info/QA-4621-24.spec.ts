import testData from "../../../../../fixtures/not_full_reports/sf_integration/report/key_info/QA-4621-24.fixture";
import { reportCreationData } from
    "../../../../../fixtures/not_full_reports/sf_integration/report/key_info/QA-4621-24.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { Report } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";

describe("The Letter of Engagement pre-fill from Dropbox to LoE filed in WebApp - 1 LoE PDF file",
    { tags: [ "@report", "@key_info", "@salesforce" ] }, () => {
        it("[QA-4621]", () => {
            cy.stepInfo(`1. Create a new report on the WebApp 
            (Note: the JOB # of that report corresponds with the JOB # of an open job on SalesForce)`);
            createReport(reportCreationData(testData.numbersJobId[0]));
        
            cy.stepInfo(`2. Navigate to the Report > Key Info > Engagement and Verify that 
            the Letter Of Engagement field is empty and nothing 
                    is auto-filled from Dropbox`);
            // TODO: [QA-6759] AQA - Remove duplicate navigation to KeyInfo page
            _NavigationSection.navigateToReportKeyInfo();
            Report._KeyInfo.Page.inputToCheckUpload.should("have.value", testData.verifyValue);
        });

        it("[QA-4622]", () => {
            cy.stepInfo(`1. Create a new report on the WebApp 
            (Note: the JOB # of that report corresponds with the JOB # of an open job on SalesForce)`);
            createReport(reportCreationData(testData.numbersJobId[1]));
        
            cy.stepInfo(`2. Navigate to the Report > Key Info > Engagement and Verify that 
            the Letter Of Engagement field is empty and nothing 
                    is auto-filled from Dropbox`);
            // TODO: [QA-6759] AQA - Remove duplicate navigation to KeyInfo page
            _NavigationSection.navigateToReportKeyInfo();
            Report._KeyInfo.Page.inputToCheckUpload.should("be.empty");
        });

        it("[QA-4623]", () => {
            cy.stepInfo(`1. Create a new report on the WebApp 
            (Note: the JOB # of that report corresponds with the JOB # of an open job on SalesForce)`);
            createReport(reportCreationData(testData.numbersJobId[2]));
        
            cy.stepInfo(`2. Navigate to the Report > Key Info > Engagement and Verify that 
            the Letter Of Engagement field is empty and nothing 
                    is auto-filled from Dropbox`);
            // TODO: [QA-6759] AQA - Remove duplicate navigation to KeyInfo page
            _NavigationSection.navigateToReportKeyInfo();
            Report._KeyInfo.Page.inputToCheckUpload.should("be.empty");
        });

        it("[QA-4624]", () => {
            cy.stepInfo(`1. Create a new report on the WebApp 
            (Note: the JOB # of that report corresponds with the JOB # of an open job on SalesForce)`);
            createReport(reportCreationData(testData.numbersJobId[3]));
        
            cy.stepInfo(`2. Navigate to the Report > Key Info > Engagement and Verify that 
            the Letter Of Engagement field is empty and nothing 
                    is auto-filled from Dropbox`);
            // TODO: [QA-6759] AQA - Remove duplicate navigation to KeyInfo page
            _NavigationSection.navigateToReportKeyInfo();
            Report._KeyInfo.Page.inputToCheckUpload.should("be.empty");
        });
    });