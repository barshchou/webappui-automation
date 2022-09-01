import { reportCreationData } from
    "../../../../../fixtures/not_full_reports/sf_integration/report/key_info/QA-4028.fixture";
import testData from "../../../../../fixtures/not_full_reports/sf_integration/report/key_info/QA-4028.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Report } from "../../../../../actions";

describe(`Verify that the Due Date field is pre-filled on the WebApp with 
the date corresponding to the Current Due Date value for that job in SalesForce`,
{ tags: [ "@report", "@key_info", "@salesforce" ] }, () => {
    it("[QA-4028]", () => {
        testData.conclusionValues.forEach(value => {
            cy.stepInfo(`1. Create a new report on the WebApp 
            (Note: the JOB # of that report corresponds with the JOB # of an open job on SalesForce)`);
            createReport(reportCreationData(value));
    
            // TODO: [QA-6759] AQA - Remove duplicate navigation to KeyInfo page
            cy.stepInfo(`2. Navigate to the Report > Key Info page`);
            _NavigationSection.navigateToReportKeyInfo();
        
            cy.stepInfo(`3. Verify what is displayed in the Due Date field`);
            Report._KeyInfo.Page.getDateInputByQA(testData.dateType).should("have.value", testData.verifyValue);
        });
    });
});