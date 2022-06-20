/* eslint-disable @typescript-eslint/ban-ts-comment */
import reviewExportPage from "../../pages/reviewExport/reviewExport.page";
import BaseActionsExt from "../base/base.actions.ext";
class ReviewExportActions extends BaseActionsExt<typeof reviewExportPage> {

    verifyPageIsOpened() {
        reviewExportPage.headerTitle.should("exist");
        return this;
    }

    waitForReportGenerated(): this {
        reviewExportPage.statusBar.should("contain.text", "Pending");
        reviewExportPage.statusBar.should("contain.text", "Complete");
        cy.get('[data-qa="download-btn"]', { timeout: 120000 }).should("be.visible");
        return this;
    }

    generateDocxReport(): this {
        reviewExportPage.generateReportBtn.click();
        return this;
    }

    generateXMLReport(): this {
        reviewExportPage.generateXmlBtn.click();
        return this;
    }

    verifyXMLReportID(reportName: string): this {
        let aliasXMLGeneration = "aliasXMLGeneration";
        cy.intercept({
            method: 'GET',
            url: '**api/xmlGeneration/?*'
        }).as(aliasXMLGeneration);
        this.generateXMLReport();
        cy.wait(`@${aliasXMLGeneration}`, { timeout: 20000 })
            .then(({ response }) => {
                const fileNamePart = `${Cypress._.snakeCase(reportName)}`;
                expect(response.statusCode).equal(200);
                expect(response.body.downloadUrl).contain(`/downloadXML/${fileNamePart}`);
            });
        return this;
    }

    verifyXMLReportOpens(reportName: string): this {
        let aliasOpenXML = "aliasOpenXML";
        const urlNamePart = `${Cypress._.snakeCase(reportName)}`;
        cy.intercept({
            method: 'GET',
            url: `**/downloadXML/${urlNamePart}*`
        }).as(aliasOpenXML);
        cy.wait(`@${aliasOpenXML}`, { timeout: 20000 })
            .then(({ response }) => {
                expect(response.statusCode).equal(200);
            });
        return this;
    }

    /**
     * Downloads and converts *.docx report into html
     * and renames it to *current_spec_name*.html
     */
    downloadAndConvertDocxReport(reportName: string): this {
        reviewExportPage.downloadBtn.click();
        cy.task("getFilePath", { _reportName: reportName, _docx_html: "docx" }).then(file => {
            cy.log(<string>file);
            cy.task("waitForFileExists", file);
            cy.task("convertDocxToHtml", file);
        });
        return this;
    }
}
export default new ReviewExportActions(reviewExportPage);