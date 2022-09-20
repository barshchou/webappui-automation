import { createReport } from '../../../../actions/base/baseTest.actions';
import { PreviewEdit, ReviewExport } from '../../../../actions';
import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/preview_edit/introduction/QA-4477.fixture";

describe("[QA-4477] Check the Definition of Market Value list", 
    { tags:[ "@preview_edit", "@introduction", "@check_export" ] }, () => {

        it('Test body', () => {
            cy.stepInfo(`1. Create a new report on the WebApp and navigate to Preview & Edit > Introduction.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToIntroduction();

            cy.stepInfo(`2. Verify that directly underneath the Definition of Market Value section 
                        there is static list with a proper content and this list is uneditable.`);
            testData.definitionOfMarketValueList.forEach((item, index) => {
                PreviewEdit._Introduction.verifyDefinitionOfMarketValueListItem(index, item);
            });

            cy.stepInfo(`3. Export the report.`);
            _NavigationSection.openReviewAndExport();
            ReviewExport.selectSectionsToIncludeInExport(testData.sectionToExport)
                .generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it('Check export', () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);

                    cy.stepInfo(`4. Verify that this section continues to export 
                                in the same place in the Introduction.`);
                    cy.visit(<string>file);
                    cy.contains(testData.exportSectionName).scrollIntoView()
                        .next().next().next("ol").within(() => {
                            testData.definitionOfMarketValueList.forEach((item, index) => {
                                cy.get("li").eq(index).should("have.text", item);
                            });
                        });
                });
        });
    });