import { PreviewEdit, Report, ReviewExport } from '../../../../actions';
import { _NavigationSection } from '../../../../actions/base';
import { createReport } from '../../../../actions/base/baseTest.actions';
import testData from "../../../../fixtures/not_full_reports/report/client/QA-6770_6816.fixture";

describe('Verify the display of the multiple clients on the Letter of Transmittal',
    { tags: [ "@report", "@client", "@check_export" ] }, () => {

        it("[QA-6770_6816]", () => {
            cy.stepInfo("1. Login, create a report with freddie mac");
            createReport(testData.reportFreddieMac);

            cy.stepInfo("2. Navigate to Report > Client page");
            _NavigationSection.navigateToClientPage();

            cy.stepInfo("3. Fill the Client field, Client File Number and NYCB Application Number three times");
            testData.inputValues.forEach((value, index) => {
                Report._Client.enterClientName(value.clientName, index)
                    .enterClientFileNumber(value.clientFileNumber, index)
                    .enterNycbApplicationNumber(value.nycbNumber, index)
                    .clickAddAdditionalClientBtn();
            });

            cy.stepInfo(`4. Verify the Client, Client 2, Client 3 and Client 4 organizations are displayed separated by
                        commas in the 'Client Guidelines Discussion' generated commentary`);
            testData.inputValues.forEach(value => {
                Report._Client.verifyFormCommentTextBoxText(testData.formCommentName, value.organization);
            });

            cy.stepInfo("5. Navigate to Report > Client page");
            _NavigationSection.navigateToLetterOfTransmittal();

            cy.stepInfo(`6. Client 1, Client 2, Client 3 and Client 4 are displayed and separated by a comma in the 1 
                        point before “Freddie Mac“`);
            testData.inputValues.forEach(value => {
                PreviewEdit._LetterOfTransmittal.verifyTextInFormContainer(value.clientName)
                    .verifyTextInFormContainer(value.clientFileNumber)
                    .verifyTextInFormContainer(value.organization);
                PreviewEdit._LetterOfTransmittal.Page.countList.should("include.text", value.organization);
            });

            cy.stepInfo("7. Export report");
            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportFreddieMac.reportNumber);
        });

        it('Check export', () => {
            cy.task("getFilePath", { _reportName: testData.reportFreddieMac.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);
                    cy.stepInfo("8. Verify values from step #6 in report");
                    testData.inputValues.forEach(value => {
                        cy.contains(testData.locatorContains).next().should("include.text", value.organization);
                        cy.contains(value.clientName).should('exist');
                        cy.contains(value.clientFileNumber).should('exist');
                        cy.contains(value.nycbNumber).should('exist');
                        cy.contains(value.organization).should('exist');
                    });
                });
        });
    });
