import { Alias } from '../../utils/alias.utils';
/* eslint-disable @typescript-eslint/ban-ts-comment */
import reviewExportPage from "../../pages/reviewExport/reviewExport.page";
import BaseActionsExt from "../base/base.actions.ext";
import { BoweryReports } from '../../types/boweryReports.type';
import reportStatuses from '../../enums/reportParams/reportStatus.enum';
class ReviewExportActions extends BaseActionsExt<typeof reviewExportPage> {

    verifyPageIsOpened() {
        reviewExportPage.headerTitle.should("exist");
        return this;
    }

    waitForReportGenerated(): ReviewExportActions {
        reviewExportPage.statusBar.as("statusBar").should("contain.text", "Pending");
        cy.get("@statusBar", { timeout: 80000 }).should("contain.text", "Complete");
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
        cy.task("getFilePath", { _reportName: `Bowery Appraisal_${reportName}`, _docxHtml: "docx" }).then(file => {
            cy.log(<string>file);
            cy.task("waitForFileExists", file);
            cy.task("convertDocxToHtml", file);
        });
        return this;
    }

    private clickReportStatusButton(status: string, statusToChange: BoweryReports.ReportStatus): ReviewExportActions {
        cy.intercept({ method: 'PATCH', url: '*report/state/*' }).as('reportState');
        cy.log(`Changing status from '${status}' to '${statusToChange}...`);
        reviewExportPage.changeReportStatusButton(statusToChange.toLowerCase()).click();
        this.waitForStatusChange(statusToChange);
        return this;
    }

    private waitForStatusChange(statusToChange: BoweryReports.ReportStatus): ReviewExportActions {
        cy.wait(`@reportState`, { timeout: 10000 }).then(({ response }) => {
            expect(response.statusCode).equal(200);
        });
        this.verifyModal()
            .closeModal()
            .verifyReportStatusChanged(statusToChange);
        return this;
    }

    changeReportStatus(statusToChange: BoweryReports.ReportStatus): ReviewExportActions {
        reviewExportPage.reportStatus.invoke('text').then(($status) => {
            switch ($status) {
                case reportStatuses.draft:
                    statusToChange == reportStatuses.review 
                        ? this.clickReportStatusButton($status, statusToChange) 
                        : cy.log(`Error! Couldn't change status from '${$status}' to '${statusToChange}'!`);
                    break;
                case reportStatuses.review:
                    statusToChange != reportStatuses.submitted
                        ? this.clickReportStatusButton($status, statusToChange) 
                        : cy.log(`Error! Couldn't change status from '${$status}' to '${statusToChange}'!`);
                    break;
                case reportStatuses.approved:
                    statusToChange != reportStatuses.approved
                        ? this.clickReportStatusButton($status, statusToChange) 
                        : cy.log(`Error! Couldn't change status from '${$status}' to '${statusToChange}'!`);
                    break;
                case reportStatuses.submitted:
                    statusToChange != reportStatuses.approved && statusToChange !=  reportStatuses.draft
                        ? this.clickReportStatusButton($status, statusToChange) 
                        : cy.log(`Error! Couldn't change status from '${$status}' to '${statusToChange}'!`);
                    break;
                default:
                    cy.log(`Status couldn't be changed from '${$status}' to '${statusToChange}!'`);
                    break;
            }
        });

        return this;
    }

    verifyReportStatusChanged(statusToChange: BoweryReports.ReportStatus): ReviewExportActions {
        reviewExportPage.reportStatus.invoke('text').then(($status) => {
            expect($status).to.be
                .equals(statusToChange, `Report ${$status} status isn't equal to expected status: ${statusToChange}`);
        });
        return this;
    }

    verifyModal(success = true): ReviewExportActions {
        reviewExportPage.resultModal(success).should("be.visible"); 
        return this;
    }

    closeModal(success = true): ReviewExportActions {
        reviewExportPage.resultModalCloseButton(success).click();
        return this;
    }

    selectDeselectAllSectionsForExport(select = true): ReviewExportActions {
        reviewExportPage.loadingSectionsForm.should("not.exist");
        select ? 
            reviewExportPage.selectAllButton.click() 
            : reviewExportPage.deselectAllButton.click();
        return this;
    }

    checkUncheckSectionToIncludeInExport(
        sectionName: BoweryReports.SectionsToIncludeInExport, isCheck = true): ReviewExportActions {
        reviewExportPage.getIncludeSectionCheckbox(sectionName).invoke('attr', 'class').then(classAttr => {
            const checked = classAttr.includes("checked");
            checked != isCheck ? isCheck ?
                reviewExportPage.getIncludeSectionCheckbox(sectionName).check()
                : reviewExportPage.getIncludeSectionCheckbox(sectionName).uncheck()
                : null;
        });
        return this;
    }

    verifySectionToIncludeInExportCheckboxState(
        sectionName: BoweryReports.SectionsToIncludeInExport, state = true): ReviewExportActions {
        const assertion = state ? "be.checked" : "not.be.checked";
        reviewExportPage.getIncludeSectionCheckbox(sectionName).should(assertion);
        return this;
    }

    selectSectionsToIncludeInExport(
        sectionNames: BoweryReports.SectionsToIncludeInExport | 
        Array<BoweryReports.SectionsToIncludeInExport>): ReviewExportActions {
        let sections = Array.isArray(sectionNames) ? sectionNames : [ sectionNames ];
        this.selectDeselectAllSectionsForExport(false);
        sections.forEach(section => {
            this.checkUncheckSectionToIncludeInExport(section)
                .verifySectionToIncludeInExportCheckboxState(section);
        });
        return this;
    }
}
export default new ReviewExportActions(reviewExportPage);