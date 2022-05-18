import { Tag } from './../../../../utils/tags.utils';
import testData from "../../../../fixtures/not_full_reports/report/key_info/QA-4031.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Report } from "../../../../actions";

describe("[QA-4031] Verify the export of the report with the Pre-filled Report Due Date from SalesForce",
    { tags: [ Tag.report, Tag.key_info, Tag.salesforce ] }, () => {
    it("Test body", () => { 
        cy.stepInfo("1. Create a new report on the WebApp (Note: the JOB # of that report corresponds with the JOB # of an open job on SalesForce)");
        createReport(testData.reportCreationData);
    
        cy.stepInfo("2. Navigate to the Report > Key Info page");
        _NavigationSection.navigateToReportInformation();
        
        cy.stepInfo(`3. Verify the export of the report with the Pre-filled Report Due Date from SalesForce:
            - null
            - not null
            - not matching
            - changed value`);

            // Report._KeyInfo.enterDateByType();

        deleteReport(testData.reportCreationData.reportNumber);
    });

});