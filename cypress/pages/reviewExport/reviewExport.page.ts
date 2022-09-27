import { BoweryReports } from "../../types/boweryReports.type";
import BasePage from "../base/base.page";

class ReviewExportPage extends BasePage {
    get headerTitle() { return cy.get("[data-qa='reviewAndExport']"); }

    get downloadBtn() {
        return cy.get('[data-qa="download-btn"]', { timeout: 100000 }).should("be.visible");
    }

    get generateReportBtn() {
        return cy.get('[data-qa="generate-report-btn"]').should("be.visible");
    }

    get generateXmlBtn() {
        return cy.get('[data-qa="generate-xml-btn"]').should("be.visible");
    }

    get statusBar() { return cy.get("[data-qa=status]", { timeout: 80000 }); }

    get reportStatus() { return cy.get("[data-qa='report-status']"); }

    changeReportStatusButton(status: string) { return cy.get(`[data-qa='${status}-btn']`); }

    resultModal(result = true) {
        let message = result ? "Success" : "Error";
        return cy.xpath(`//*[contains(text(), "${message}")]`);
    }

    resultModalCloseButton(result = true) {
        let message = result ? "Success" : "Error";
        return cy.xpath(`//*[contains(text(), "${message}")]//following::button[1]`);
    }

    get selectAllButton() { return cy.get("[data-qa=select-all-all-btn]"); }

    get deselectAllButton() { return cy.get("[data-qa=deselect-all-all-btn]"); }

    getIncludeSectionCheckbox(sectionName: BoweryReports.SectionsToIncludeInExport) {
        return cy.get(`[data-qa='${sectionName}'] input`);
    }

    get loadingSectionsForm() {
        return cy.get("[data-qa='loadingList']");
    }
}
export default new ReviewExportPage();