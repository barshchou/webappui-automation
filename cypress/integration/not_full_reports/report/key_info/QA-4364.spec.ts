import { Tag } from './../../../../utils/tags.utils';
import testData from "../../../../fixtures/not_full_reports/report/key_info/QA-4364.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Report } from "../../../../actions";


describe("[QA-4364] Prefill Inspection Date from Salesforce - deletion of the Date of Valuation",
    { tags: [ Tag.report, Tag.key_info, Tag.salesforce ] }, () => {

    before("Login, create report", () => {
        cy.stepInfo(`1. Create report while creating set the same Job number as report from SalesForce has (e.g. JOB-1764459005) 
            Make sure that there is no Inspection Date in the Salesforce job`);
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("2. Go to Report → Key Info → Engagement tab and delete the Date of Valuation");
        _NavigationSection.navigateToReportInformation();
        Report._KeyInfo.clickYesButton();
        Report._KeyInfo.Page.getDateInputByQA(testData.nameInputByQA).clear().should("be.empty");

        deleteReport(testData.reportCreationData.reportNumber);
    });
});