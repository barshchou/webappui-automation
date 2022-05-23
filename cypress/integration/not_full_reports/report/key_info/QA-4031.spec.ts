import { Tag } from './../../../../utils/tags.utils';
import testData from "../../../../fixtures/not_full_reports/report/key_info/QA-4031.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Report } from "../../../../actions";
import reportDataCreator from '../../../../fixtures/data_creator/reportData.creator';
import Enums from '../../../../enums/enums';

const reportCreationData = (reportNumber: string) => {
    return reportDataCreator.setAddress()
        .setReportNumber(reportNumber, true)
        .setTemplateValue(Enums.TEMPLATE_TYPE.NOT_FREDDIE_MAC)
        .setIncomeValue(Enums.INCOME_TYPE.BOTH)
        .setConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE).build();
};

describe("[QA-4031] Verify the export of the report with the Pre-filled Report Due Date from SalesForce",
    { tags: [ Tag.report, Tag.key_info, Tag.salesforce ] }, () => {
    it("Test body", () => { 
        testData.jobNumbersAndValues.forEach((value, index) => {
            cy.stepInfo(`[REPORT №${index + 1}] 1. Create a new report on the WebApp (Note: the JOB # of that report 
                corresponds with the JOB # of an open job on SalesForce)`);
            createReport(reportCreationData(value.jobNumber));
    
            cy.stepInfo("2. Navigate to the Report > Key Info page");
             _NavigationSection.navigateToReportInformation();
             _NavigationSection.clickYesButton();
        
            cy.stepInfo(`3. Verify the export of the report with the Pre-filled Report Due Date from SalesForce:
            - null
            - not null
            - not matching
            - changed value`);
            Report._KeyInfo.Page.getDateInputByQA(testData.dateType).should("have.value", value.yield);
            Report._KeyInfo.enterDateByType({ type: testData.dateType, date: testData.verifyDate });
        
            deleteReport(reportCreationData(value.jobNumber).reportNumber);
        });
    });

});