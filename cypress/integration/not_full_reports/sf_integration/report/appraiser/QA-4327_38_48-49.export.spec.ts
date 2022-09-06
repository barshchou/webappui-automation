import { ReviewExport } from '../../../../../actions';
import { _NavigationSection } from '../../../../../actions/base';
import { createReport } from '../../../../../actions/base/baseTest.actions';
import { Report } from '../../../../../actions';
import testData from
    "../../../../../fixtures/not_full_reports/sf_integration/report/appraiser/QA-4327_38_48-49.fixture";

describe(`Verify the Inspector's name is pre-filled in the Appraisers section on WebApp with the name 
        corresponding to the Inspector value for that job in SalesForce.`,
{ tags: [ "@check_export", "@report", "@appraiser", "@salesforce", "@fix" ] }, () => {
    
    it("[QA-4327_48-49]", () => {
        cy.stepInfo('1. Create a report with SF job');
        createReport(testData.reportCreationData);

        cy.stepInfo('2. Navigate to Report -> Appraiser page');
        _NavigationSection.navigateToReportAppraiser();

        cy.stepInfo(`3. Verify the internal Inspector appears in the table with the 'Personally Inspected' checkbox 
                    checked along with any other information (suffix, state cert, etc.) and 
                    corresponds to the Inspector's name in SF.`);
        testData.appraisers.forEach(appraiser => {
            Report._Appraiser.verifyPersonallyInspectedCheckbox(appraiser.name, appraiser.isPersonallyInspected);
        });

        cy.stepInfo(`4. not null with checked 'Personally Inspected' and 'Sign Report' checkboxes; 
                    not null with unchecked 'Personally Inspected' and 'Sign Report' checkboxes;`);
        Report._Appraiser.checkPersonallyInspected(testData.appraisers[0].name)
            .checkSignReport(testData.appraisers[1].name, false);

        cy.stepInfo(`5. Remove appraisers, save changes and add the same Inspector by entering his/her name in 
                    the Search Appraisers field.`);
        Report._Appraiser.removeAppraiser(testData.appraisers[2].name)
            .searchAndAddAppraiser(testData.appraisers[2].name);
            
        cy.stepInfo("6. Verify Certification Assistance commentary");
        Report._Appraiser.verifyCertificationAssistanceCommentary()
            .verifyCertificationInspectionCommentary();

        cy.stepInfo("7. Export the report");
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

            cy.stepInfo("8. Verify the export of the report with the pre-filled Inspector's name from SalesForce");
            testData.appraisers.forEach(appraiser => {
                cy.xpath(`//*[contains(text(), 'Prepared By')]` +
                        `//following::*[contains(text(), '${appraiser.name}')][1]`).should("exist");

                cy.xpath(`//h1[contains(text(), 'Certification')]` +
                        `//following::*[contains(text(), '${appraiser.name}')][1]`)
                    .should("exist");
            });
        });
    });
});