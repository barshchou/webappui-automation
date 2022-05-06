import BasePage from "../base/base.page";

class ReviewExportPage extends BasePage {
    get downloadBtn(){
        return cy.get('[data-qa="download-btn"]').should("be.visible");
    }

    get generateReportBtn(){
        return cy.get('[data-qa="generate-report-btn"]').should("be.visible");
    }

    get generateXmlBtn(){
        return cy.get('[data-qa="generate-xml-btn"]').should("be.visible");
    }
}
export default new ReviewExportPage();