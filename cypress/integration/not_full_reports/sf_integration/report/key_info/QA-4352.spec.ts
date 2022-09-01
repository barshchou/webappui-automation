import testData from "../../../../../fixtures/not_full_reports/sf_integration/report/key_info/QA-4352.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Report } from "../../../../../actions";

describe("Pre-fill Inspection Date from Salesforce (there is no Inspection Date in the Salesforce)",
    { tags: [ "@report", "@key_info", "@salesforce" ] }, () => {
        beforeEach("Login, create report", () => {
            cy.stepInfo(`1. Create report while creating set the same Job number 
            as report from SalesForce has (e.g. JOB-1764459005) 
            Make sure that there is no Inspection Date in the Salesforce job`);
            createReport(testData.reportCreationData);
        });

        it("[QA-4352]", () => {
            cy.stepInfo(`2. Go to Report → Key Info → Engagement tab and verify the 
            values in the Inspection Date and the Date of Valuation are empty`);
            // TODO: [QA-6759] AQA - Remove duplicate navigation to KeyInfo page
            _NavigationSection.navigateToReportKeyInfo();
            testData.namesInputByQA.forEach(name => {
                Report._KeyInfo.Page.getDateInputByQA(name).should("be.empty");
            });
        
            cy.stepInfo(`3. Go to Report → Key Info → Engagement tab and verify 
            that check-box "My Date of Valuation (As Is) date is different from my Inspection Date" is unchecked`);
            Report._KeyInfo.Page.inputToCheckMyDateIsDifferent.should("not.be.checked");
        });
    });