import { ReviewExport } from './../../../../actions/index';
import { _NavigationSection } from '../../../../actions/base';
import { createReport } from '../../../../actions/base/baseTest.actions';
import { Report } from '../../../../actions';
import testData from "../../../../fixtures/not_full_reports/report/appraiser/QA-4327_38.fixture";

describe(`Verify the Inspector's name is pre-filled in the Appraisers section on WebApp with the name 
        corresponding to the Inspector value for that job in SalesForce.`,
{ tags: [ "@check_export", "@report", "@appraiser", "@salesforce" ] }, () => {
    
    it("[QA-4227]", () => {
        cy.stepInfo('1. Create a report with SF job');
        createReport(testData.reportCreationData);

        cy.stepInfo('2. Navigate to Report -> Appraiser page');
        _NavigationSection.navigateToReportAppraiser();

        cy.stepInfo(`3. Verify the internal Inspector appears in the table with the ‘Personally Inspected’ checkbox 
                    checked along with any other information (suffix, state cert, etc.) and 
                    corresponds to the Inspector’s name in SF.`);
        testData.appraisers.forEach(appraiser => {
            Report._Appraiser.verifyPersonallyInspectedCheckbox(appraiser.name, appraiser.isPersonallyInspected);
        });

        cy.stepInfo("4. Export the report");
        _NavigationSection.Actions.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(`JOB-${testData.reportCreationData.reportNumber}`);
    });

    it("Check export, [QA-4338]", () => {
        cy.task("getFilePath",
            { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" }
        ).then(file => {
            cy.log(<string>file);
            cy.visit(<string>file);

            cy.stepInfo("5. Verify the export of the report with the pre-filled Inspector's name from SalesForce");
            cy.xpath("//h4[.='Current Commercial Rent Roll']/following-sibling::table");
        });
    });
});