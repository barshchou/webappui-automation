import testData from "../../../../fixtures/not_full_reports/report/key_info/QA-4028.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Report } from "../../../../actions";
import reportDataCreator from '../../../../fixtures/data_creator/reportData.creator';
import Enums from '../../../../enums/enums';

const reportCreationData = conclusionValue => {
    return reportDataCreator.setAddress()
        .setReportNumber("1764459100", true)
        .setTemplateValue(Enums.TEMPLATE_TYPE.NOT_FREDDIE_MAC)
        .setIncomeValue(Enums.INCOME_TYPE.BOTH)
        .setConclusionValue(conclusionValue).build();
};

describe("[QA-4028] Verify that the Due Date field is pre-filled on the WebApp with the date corresponding to the Current Due Date value for that job in SalesForce",
    { tags: [ "@report", "@key_info", "@salesforce" ] }, () => {
    it("Test body", () => {
        
    testData.conclusionValues.forEach(value => {
        cy.stepInfo("1. Create a new report on the WebApp (Note: the JOB # of that report corresponds with the JOB # of an open job on SalesForce)");
        createReport(reportCreationData(value));
    
            cy.stepInfo("2. Navigate to the Report > Key Info page");
            _NavigationSection.navigateToReportInformation();
            
            cy.stepInfo("3. Verify what is displayed in the Due Date field");
            Report._KeyInfo.Page.getDateInputByQA(testData.dateType).should("have.value", testData.verifyValue);
    
            deleteReport(reportCreationData(value).reportNumber);
        });
    });
});