import { PreviewEdit, Report, ReviewExport } from '../../../../actions';
import { _NavigationSection } from '../../../../actions/base';
import { createReport } from '../../../../actions/base/baseTest.actions';
import testData from "../../../../fixtures/not_full_reports/review_edit/letter_of_transmittal/QA-6768.fixture";

describe('Verify the display of the multiple clients on the Letter of Transmittal',
    { tags: [ "@preview_edit", "@letter_of_transmittal", "@check_export" ] }, () => {

        it("[QA-6768]", () => {
            cy.stepInfo("1. Login, create a report");
            createReport(testData.reportCreationData);

            cy.stepInfo("2. Navigate to Report > Client page");
            _NavigationSection.navigateToClientPage();

            cy.stepInfo("3. Fill the Client field, Client File Number and NYCB Application Number three times");
            testData.inputValues.forEach((value, index) => {
                Report._Client.enterClientName(value.clientName, index)
                    .enterClientFileNumber(value.clientFileNumber, index)
                    .enterNycbApplicationNumber(value.nycbNumber, index)
                    .clickAddAdditionalClientBtn();
            });

            cy.stepInfo("4. Navigate to Report > Client page");
            _NavigationSection.navigateToLetterOfTransmittal();

            cy.stepInfo(`5. Client 1 with organization info, Client 2 with organization info, Client 3 with 
                        organization info and Client 4 with organization info are displayed. Client File Numbers 
                        are displayed as Project No and separated by a comma.
                        The Client Guidelines Discussion mirrors the Report > Client > Client Guidelines Discussion.`);
            testData.inputValues.forEach(value => {
                PreviewEdit._LetterOfTransmittal.verifyTextInFormContainer(value.clientName)
                    .verifyTextInFormContainer(value.clientFileNumber)
                    .verifyTextInFormContainer(value.organization);
            });

            cy.stepInfo("6. Export report");
            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it('Check export', () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);
                    cy.stepInfo("7. Verify values from step #4 in report");
                    testData.inputValues.forEach(value => {
                        cy.contains(value.clientName).should('exist');
                        cy.contains(value.clientFileNumber).should('exist');
                        cy.contains(value.nycbNumber).should('exist');
                        cy.contains(value.organization).should('exist');
                    });
                });
        });
    });
