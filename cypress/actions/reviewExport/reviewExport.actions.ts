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

    downloadDocxReport(): this {
        reviewExportPage.downloadBtn.click();
        cy.get(`@${ALIASE.reportId}`).then(val => {
            reportFile = {
                //@ts-ignore
                name: val,
                path: "cypress/downloads",
                extension:"docx"
            };
            cy.log(<any>val);
            cy.task("waitForFileExists",`${reportFile.path}/${reportFile.name}.${reportFile.extension}`);
            cy.task("convertDocxToHtml",reportFile).then(value => {
                cy.log(<any>value);
            });
            cy.task("renameHtmlReportFile",
            {path: reportFile.path,oldName: reportFile.name,newName: `QA-${Cypress.spec.specFilter}`});
        });
        return this;
    }

    convertReportToHtml(): this {
        /**
         * ernst: if we set reportFile obejct into SharedStore, 
         * we can extract it from there and pass to this task.
         */
        // cy.task("convertDocxToHtml",reportFile).then(value => {
        //     cy.log(<any>value);
        // });
        return this;
    }
}
export default new ReviewExportActions();