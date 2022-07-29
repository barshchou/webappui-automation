import { createReport } from './../../../../actions/base/baseTest.actions';
import { ReviewExport } from '../../../../actions/index';
import { _NavigationSection } from '../../../../actions/base/index';
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
                cy.xpath(`//h6[.='${testData.title}']/following::li`).eq(index)
                    .should("have.text", item)
                    .should("have.prop", "isContentEditable", false);
            });

            cy.stepInfo(`3. Export the report.`);
            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it('Check export', () => {
            Cypress.config().baseUrl = null;
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);

                    cy.stepInfo(`4. Verify that this section continues to export 
                                in the same place in the Introduction.`);
                    cy.visit(<string>file);
                    cy.contains(testData.title).scrollIntoView()
                        .next().next().next("ol").within(() => {
                            testData.definitionOfMarketValueList.forEach((item, index) => {
                                cy.get("li").eq(index).should("have.text", item);
                            });
                        });
                });
        });
    });