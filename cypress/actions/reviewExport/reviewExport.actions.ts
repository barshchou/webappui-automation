/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ALIASE } from "../../../utils/const.utils";
import reviewExportPage from "../../pages/reviewExport/reviewExport.page";
import BaseActions from "../base/base.actions";

let reportFile: BoweryReports.ReportFile;

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
    downloadAndConvertDocxReport(): this {
        reviewExportPage.downloadBtn.click();
        cy.get(`@${ALIASE.reportId}`).then(val => {
            reportFile = {
                //@ts-ignore
                name: val,
                path: "cypress/downloads",
                extension:"docx"
            };
            cy.log(<any>val);
            /**
             * ernst: if you wish to see "tasks" code - go to cypress/plugins/index.js to the section Cypress Tasks
             */
            const testIdReportName = `QA-${Cypress.spec.specFilter}`;
            cy.task("waitForFileExists",`${reportFile.path}/${reportFile.name}.${reportFile.extension}`);
            cy.task("convertDocxToHtml",reportFile);            
            cy.task("renameFile",{
                oldPath:`${reportFile.path}/${reportFile.name}.docx`,
                newPath:`${reportFile.path}/${testIdReportName}.docx`
            });
            cy.task("renameFile",{
                oldPath:`${reportFile.path}/${reportFile.name}.html`,
                newPath:`${reportFile.path}/${testIdReportName}.html`
            });
        });
        return this;
    }
}
export default new ReviewExportActions();