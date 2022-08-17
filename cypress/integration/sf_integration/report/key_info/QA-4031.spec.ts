import testData from "../../../../fixtures/sf_integration/report/key_info/QA-4031.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Report } from "../../../../actions";
import { reportCreationData } from "../../../../fixtures/sf_integration/report/key_info/QA-4031.fixture";

describe("[QA-4031] Verify the export of the report with the Pre-filled Report Due Date from SalesForce",
    { tags: [ "@report", "@key_info", "@salesforce" ] }, () => {
        it("Test body", () => {
            testData.jobNumbersAndValues.forEach((value, index) => {
                cy.stepInfo(`[REPORT #${index + 1}] 
                            1. Create a new report on the WebApp (Note: the JOB # of that report corresponds with 
                            the JOB # of an open job on SalesForce)`);
                createReport(reportCreationData(value.jobNumber));
    
                cy.stepInfo("2. Navigate to the Report > Key Info page");
                _NavigationSection.navigateToReportInformation();
        
                cy.stepInfo(`3. Verify the export of the report with the Pre-filled Report Due Date from SalesForce:
                            - null
                            - not null
                            - not matching
                            - changed value`);
                Report._KeyInfo.Page.getDateInputByQA(testData.dueDateFixture.type).should("have.value", value.yield);
                Report._KeyInfo.enterDateByType(testData.dueDateFixture);
            });
        });
    });
