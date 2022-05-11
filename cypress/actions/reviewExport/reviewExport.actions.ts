/* eslint-disable @typescript-eslint/ban-ts-comment */
import reviewExportPage from "../../pages/reviewExport/reviewExport.page";
import BaseActions from "../base/base.actions";

class ReviewExportActions extends BaseActions {
    get Page() {
        return reviewExportPage;
    }    
    
    waitForReportGenerated(): this {
        cy.get('[data-qa="download-btn"]', {timeout: 120000}).should("be.visible");
        return this;
    }

    generateDocxReport(): this {
        reviewExportPage.generateReportBtn.click();
        return this;
    }

    /**
     * Downloads and converts *.docx report into html
     * and renames it to *current_spec_name*.html
     */
    downloadAndConvertDocxReport(reportName:string): this {
        reviewExportPage.downloadBtn.click();
        cy.task("getFilePath",{_reportName: reportName, _docx_html: "docx"}).then(file => {
            cy.log(<string>file);
            cy.task("waitForFileExists",file);
            cy.task("convertDocxToHtml",file); 
        });
        return this;
    }
}
export default new ReviewExportActions();