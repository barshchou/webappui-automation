import { Alias } from './../../utils/alias.utils';
/* eslint-disable @typescript-eslint/ban-ts-comment */
import reviewExportPage from "../../pages/reviewExport/reviewExport.page";
import BaseActionsExt from "../base/base.actions.ext";
import { BoweryReports } from '../../types/boweryReports.type';
import enums from '../../enums/enums';
class ReviewExportActions extends BaseActionsExt<typeof reviewExportPage> {

    verifyPageIsOpened() {
        reviewExportPage.headerTitle.should("exist");
        return this;
    }

    waitForReportGenerated(): ReviewExportActions {
        reviewExportPage.statusBar.should("contain.text", "Pending");
        reviewExportPage.statusBar.should("contain.text", "Complete");
        cy.get('[data-qa="download-btn"]', { timeout: 120000 }).should("be.visible");
        return this;
    }

    generateDocxReport(): ReviewExportActions {
        reviewExportPage.generateReportBtn.click();
        return this;
    }

    generateXMLReport(): ReviewExportActions {
        reviewExportPage.generateXmlBtn.click();
        return this;
    }

    verifyXMLReportName(reportName: string): ReviewExportActions {
        cy.intercept({
            method: 'GET',
            url: '**api/xmlGeneration/?*'
        }).as(Alias.aliasXMLGeneration);
        this.generateXMLReport();
        cy.wait(`@${Alias.aliasXMLGeneration}`, { timeout: 20000 })
            .then(({ response }) => {
                const fileNamePart = `${Cypress._.snakeCase(reportName)}`;
                expect(response.statusCode).equal(200);
                expect(response.body.downloadUrl).contain(`/downloadXML/${fileNamePart}`);
            });
        return this;
    }

    verifyXMLReportOpens(reportName: string): ReviewExportActions {
        const urlNamePart = `${Cypress._.snakeCase(reportName)}`;
        cy.intercept({
            method: 'GET',
            url: `**/downloadXML/${urlNamePart}*`
        }).as(Alias.aliasOpenXML);
        cy.wait(`@${Alias.aliasOpenXML}`, { timeout: 20000 })
            .then(({ response }) => {
                expect(response.statusCode).equal(200);
            });
        return this;
    }

    /**
     * Downloads and converts *.docx report into html
     * and renames it to *current_spec_name*.html
     */
    downloadAndConvertDocxReport(reportName: string): ReviewExportActions {
        reviewExportPage.downloadBtn.click();
        cy.task("getFilePath", { _reportName: reportName, _docx_html: "docx" }).then(file => {
            cy.log(<string>file);
            cy.task("waitForFileExists", file);
            cy.task("convertDocxToHtml", file);
        });
        return this;
    }

    changeReportStatus(statusToChange: BoweryReports.ReportStatus): ReviewExportActions {
        reviewExportPage.reportStatus.invoke('text').then(($status) => {
            switch ($status) {
                case enums.REPORT_STATUS.draft:
                    if (statusToChange != enums.REPORT_STATUS.approved 
                        && statusToChange !=  enums.REPORT_STATUS.submitted 
                        && statusToChange !=  enums.REPORT_STATUS.draft) {
                            reviewExportPage.changeReportStatusButton(statusToChange.toLowerCase()).click();
                    } else {
                        cy.log(`Status couldn't be changed from '${$status}' to '${statusToChange}!'`);
                    }
                    break;
                case "Review":
                    if (statusToChange != enums.REPORT_STATUS.submitted) {
                        reviewExportPage.changeReportStatusButton(statusToChange.toLowerCase()).click();
                    } else {
                        cy.log(`Status couldn't be changed from '${$status}' to '${statusToChange}!'`);
                    }
                    break;
                case "Approved":
                    if (statusToChange != enums.REPORT_STATUS.approved) {
                        reviewExportPage.changeReportStatusButton(statusToChange.toLowerCase()).click();
                    } else {
                        cy.log(`Status couldn't be changed from '${$status}' to '${statusToChange}!'`);
                    }
                    break;
                case "Submitted":
                    if (statusToChange != enums.REPORT_STATUS.approved 
                        && statusToChange !=  enums.REPORT_STATUS.draft) {
                            reviewExportPage.changeReportStatusButton(statusToChange.toLowerCase()).click();
                    } else {
                        cy.log(`Status couldn't be changed from '${$status}' to '${statusToChange}!'`);
                    }
                    break;
                default:
                    cy.log(`Status couldn't be changed from '${$status}' to '${statusToChange}!'`);
                    break;
            }
        });

        return this;
    }
}
export default new ReviewExportActions(reviewExportPage);