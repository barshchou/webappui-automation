import { _NavigationSection } from '../../../../actions/base';
import { createReport } from '../../../../actions/base/baseTest.actions';
import { Report, ReviewExport } from '../../../../actions';
import testData from "../../../../fixtures/not_full_reports/report/appraiser/QA-6126-27.fixture";
import Enums from '../../../../enums/enums';
import { normalizeText } from '../../../../../utils/string.utils';

// TODO: Export fails due to https://bowery.atlassian.net/browse/WEB-6739
describe("Generated Commentary is dynamically updated with relevant information (Freddie Mac report)", 
    { tags:[ "@report", "@appraiser", "@check_export" ] }, () => {

        it("[QA-6126-27]", () => {
            cy.stepInfo("Precondition: Create report");
            createReport(testData.reportCreationData);

            cy.stepInfo("1. Navigate to Report -> Appraiser page");
            _NavigationSection.navigateToReportAppraiser();

            cy.stepInfo("3. Add External Inspector");
            Report._Appraiser.searchAndAddExternalInspector(testData.inspectorName);
            
            cy.stepInfo(`4. Verify that Bowery Appraiser/Inspector and External Inspector were added to 
                        Appraisers table`);
            Report._Appraiser.verifySignCheckbox(testData.inspectorName, false);

            cy.stepInfo("5. Verify generated Certification Inspection comment");
            Report._Appraiser.Page.formCommentTextBox(Enums.PAGES_TEXTBOX_NAMES.certificationInspection).invoke('text')
                .then(text => {
                    expect(normalizeText(text)).to.be.eq(testData.certificationInspectionComment);
                });

            cy.stepInfo("6. Verify generated Certification Assistance comment");
            Report._Appraiser.Page.formCommentTextBox(Enums.PAGES_TEXTBOX_NAMES.certificationAssistance).invoke("text")
                .then(text => {
                    expect(normalizeText(text)).to.eq(testData.certificationAssistanceComment);
                });

            cy.stepInfo("7. Export report");
            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it('Check export', () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);
                    cy.stepInfo("7. Verify commentary text in exported report");
                    cy.xpath("//h1[contains(text(), 'Certification')]").next().next()
                        .should("include.text", testData.certificationInspectionComment)
                        .and("include.text", testData.certificationAssistanceComment);
                });
        });
    
    });