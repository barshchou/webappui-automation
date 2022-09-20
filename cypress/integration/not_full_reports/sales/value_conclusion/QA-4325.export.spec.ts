import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4325.fixture";
import { _NavigationSection } from '../../../../actions/base';
import { createReport } from "../../../../actions/base/baseTest.actions";
import { ReviewExport, Sales } from "../../../../actions";

describe("Sales Value Conclusion Discussion -> Generated Commentary is editable", 
    { tags: [ "@sales", "@value_conclusion" ] }, () => {
        it("[QA-4325]", () => {
            cy.stepInfo(`1. Create report`);
            createReport(testData.reportCreationData);

            cy.stepInfo(`2. Navigate to Sales Value Conclusion`);
            _NavigationSection.navigateToSalesValueConclusion();

            cy.stepInfo(`3. Click the pencil icon in the Sales Value Conclusion Discussion and add some characters`);
            Sales._ValueConclusion.verifyGeneratedCommentary(testData.commentaryData.generatedCommentary)
                .enterNewCommentary(testData.textUpdate, false);

            cy.stepInfo('4. Export report');
            _NavigationSection.openReviewAndExport();
            ReviewExport.selectSectionsToIncludeInExport(testData.sectionToExport)
                .generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it(`Check export`, () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);
                    cy.stepInfo(`5. Open downloaded report and go to Sales Comparison Approach. Compare Generated 
                    Commentary from the downloaded report with the Generated Commentary from the App → Sales → 
                    Value Conclusion → Sales Value Conclusion Discussion → Generated Commentary`);
                    cy.contains(testData.commentaryData.newCommentary);
                });
        });
    });