import BasePage from "../base/base.page";

class ReviewExportPage extends BasePage {
    get headerTitle() {return cy.get("[data-qa='reviewAndExport']");}

    get downloadBtn(){
        return cy.get('[data-qa="download-btn"]').should("be.visible");
    }

    get generateReportBtn(){
        return cy.get('[data-qa="generate-report-btn"]').should("be.visible");
    }

    get generateXmlBtn(){
        return cy.get('[data-qa="generate-xml-btn"]').should("be.visible");
    }

    get statusBar() {return cy.get("[data-qa=status]");}

    get reportStatus() {return cy.get("[data-qa='report-status']");}

    changeReportStatusButton(status: string) {return cy.get(`[data-qa='${status}-btn']`);}
}
export default new ReviewExportPage();