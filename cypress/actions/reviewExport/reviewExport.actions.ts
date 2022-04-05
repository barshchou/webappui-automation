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
        return this;
    }
}
export default new ReviewExportActions();