import testData from "../../../../fixtures/sf_integration/report/key_info/QA-4351.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Report } from "../../../../actions";

describe("[QA-4351] Pre-fill Inspection Date from Salesforce (Inspection Date is the same as Date of Valuation)",
    { tags: [ "@report", "@key_info", "@salesforce" ] }, () => {
        beforeEach("Login, create report", () => {
            cy.stepInfo(`1. Create report while creating set the same Job number 
            as report from SalesForce has (e.g. JOB-1764459005).
            Make sure that there is Inspection Date in the Salesforce job`);
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`2. Go to Report → Key Info → Engagement tab and compare the 
            values in the Inspection Date and the Date of Valuation
            with the value in the SalesForce job page → Inspection section → Inspection Date raw`);
            _NavigationSection.navigateToReportInformation();
            testData.namesInputByQA.forEach(name => {
                Report._KeyInfo.Page.getDateInputByQA(name).should("have.value", testData.verifyDate);
            });

            cy.stepInfo(`3. Go to Report → Key Info → Engagement tab and verify that check-box "My Date of Valuation 
            (As Is) date is different from my Inspection Date" is unchecked`);
            Report._KeyInfo.Page.inputToCheckMyDateIsDifferent.should("not.be.checked");
        });
    });