import { ALIASE } from "../../../utils/const.utils";
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

    downloadDocxReport(): this {
        reviewExportPage.downloadBtn.click();
        cy.get(`@${ALIASE.reportId}`).then(val => {
            cy.log(<any>val);
            cy.task("waitForFileExists",`cypress/downloads/${val}.docx`).then(isExist => {
                cy.wrap(isExist).as(`@${ALIASE.isReportDownloaded}`);
                cy.log(<any>isExist);
            });
        });
        return this;
    }

    convertReportToHtml(): this {
        throw new Error('Method not implemented.');
    }
}
export default new ReviewExportActions();