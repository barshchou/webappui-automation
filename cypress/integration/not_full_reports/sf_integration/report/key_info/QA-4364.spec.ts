import testData from "../../../../../fixtures/not_full_reports/sf_integration/report/key_info/QA-4364.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Report } from "../../../../../actions";

describe("Pre-fill Inspection Date from Salesforce - deletion of the Date of Valuation",
    { tags: [ "@report", "@key_info", "@salesforce" ] }, () => {
        beforeEach("Login, create report", () => {
            cy.stepInfo(`1. Create report while creating set the same Job number 
            as report from SalesForce has (e.g. JOB-1764459005) Make sure that there is 
            no Inspection Date in the Salesforce job`);
            createReport(testData.reportCreationData);
        });

        it("[QA-4364]", () => {
            cy.stepInfo("2. Go to Report → Key Info → Engagement tab and delete the Date of Valuation");
            // TODO: [QA-6759] AQA - Remove duplicate navigation to KeyInfo page
            _NavigationSection.navigateToReportKeyInfo();
            Report._KeyInfo.Page.getDateInputByQA(testData.nameInputByQA).clear().should("be.empty");
        });
    });