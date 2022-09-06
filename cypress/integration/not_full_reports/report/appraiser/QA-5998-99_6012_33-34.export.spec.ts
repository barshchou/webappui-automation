import { _NavigationSection } from '../../../../actions/base';
import { createReport } from '../../../../actions/base/baseTest.actions';
import { Report, ReviewExport } from '../../../../actions';
import testData from "../../../../fixtures/not_full_reports/report/appraiser/QA-5998-99_6012_33-34.fixture";
import Enums from '../../../../enums/enums';
import { normalizeText } from '../../../../../utils/string.utils';

describe("Add Appraiser / Inspector button functionality", 
    { tags:[ "@report", "@appraiser", "@check_export", "@fix" ] }, () => {

        it("[QA-5998-99_6012_33-34]", () => {
            cy.stepInfo("Precondition: Create report");
            createReport(testData.reportCreationData);

            cy.stepInfo("1. Navigate to Report -> Appraiser page");
            _NavigationSection.navigateToReportAppraiser();

            cy.stepInfo("2. Try to add wrong Bowery Appraiser / Inspector");
            Report._Appraiser.tryToAddWrongAppraiser(testData.inspectorName);

            cy.stepInfo("3. Add Appraiser and External Inspector");
            Report._Appraiser.searchAndAddAppraiser(testData.appraiserName)
                .searchAndAddExternalInspector(testData.inspectorName);
            
            cy.stepInfo(`4. Verify that Bowery Appraiser/Inspector and External Inspector were added to 
                        Appraisers table`);
            Report._Appraiser.verifySignCheckbox(testData.appraiserName, true)
                .verifySignCheckbox(testData.inspectorName, false);

            cy.stepInfo("5. Verify generated Certification Inspection comment");
            Report._Appraiser.Page.certificationInspectionText.invoke("text")
                .then(text => {
                    expect(normalizeText(text)).to.eq(testData.certificationInspectionComment);
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
        // Export error https://bowery.atlassian.net/browse/WEB-6739
        it('Check export', () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);
                    cy.stepInfo("8. Verify commentary text in exported report");
                    cy.xpath("//h1[contains(text(), 'Certification')]").next().next()
                        .should("include.text", testData.certificationInspectionComment)
                        .and("include.text", testData.certificationAssistanceComment);
                });
        });
    
    });