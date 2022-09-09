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
            cy.task("copyReportToArchive", file);
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

    /**
     * Select or deselect all sections for exporting in the report.
     * @param select Should all sections be included in the exported report or not
     */
    selectDeselectAllSectionsForExport(select = true): ReviewExportActions {
        reviewExportPage.loadingSectionsForm.should("not.exist");
        select ? reviewExportPage.selectAllButton.click() : reviewExportPage.deselectAllButton.click();
        return this;
    }

    /**
     * Select or deselect chosen section for exporting in the report.
     * @param sectionName Name of section with checkbox
     * @param isCheck Should section be included in the exported report or not
     */
    checkUncheckSectionToIncludeInExport(sectionName: BoweryReports.SectionsToIncludeInExport, isCheck = true): 
    ReviewExportActions {
        reviewExportPage.getIncludeSectionCheckbox(sectionName).invoke('attr', 'class').then(classAttr => {
            const checked = classAttr.includes("checked");
            if (checked != isCheck) {
                isCheck ? reviewExportPage.getIncludeSectionCheckbox(sectionName)
                    .check() : reviewExportPage.getIncludeSectionCheckbox(sectionName).uncheck();
            }
        });
        return this;
    }

    /**
     * Retrieve section checkbox  and verify its state.
     * @param sectionName Name of section with checkbox
     * @param isChecked Should section checkbox be checked at the moment or not
     */
    verifySectionToIncludeInExportCheckboxState(sectionName: BoweryReports.SectionsToIncludeInExport, isChecked = true):
    ReviewExportActions {
        const assertion = isChecked ? "be.checked" : "not.be.checked";
        reviewExportPage.getIncludeSectionCheckbox(sectionName).should(assertion);
        return this;
    }

    /**
     * Select specified section to include them in exported report.
     * @param sectionNames Name of sections to include in exported report
     */
    selectSectionsToIncludeInExport(sectionNames: Array<BoweryReports.SectionsToIncludeInExport>): ReviewExportActions {
        this.selectDeselectAllSectionsForExport(false);
        sectionNames.forEach(sectionName => {
            this.checkUncheckSectionToIncludeInExport(sectionName)
                .verifySectionToIncludeInExportCheckboxState(sectionName);
        });
        return this;
    }
}
export default new ReviewExportActions(reviewExportPage);