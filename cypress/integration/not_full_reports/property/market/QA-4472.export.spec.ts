import testData from "../../../../fixtures/not_full_reports/property/market/QA-4472.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property, ReviewExport } from "../../../../actions";

describe(`[QA-4472] [Property > Market] Summary of Rent Stabilization Laws`,
    { tags: [ "@property", "@market", "@check_export" ] }, () => {

        it(`[QA-4472]`, () => {
            cy.stepInfo(`1. Create a new report on the WebApp and navigate to Property > Market.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToPropertyMarket();

            cy.stepInfo(`2. Check all Market Analysis Use checkboxes.`);
            testData.marketAnalysisUses.forEach((use) => {
                Property._Market.checkUncheckMarketAnalysisUseCheckbox(use, true)
                    .verifyMarketAnalysisUseCheckboxState(use, true);
            });

            cy.stepInfo(`3. Upload files to Market/Submarket Analysis uses.`);
            testData.marketAnalysisUses.forEach((use) => {
                Property._Market.uploadMarketSubmarketByAnalysisUseFile(use, testData.fileName)
                    .uploadMarketSubmarketByAnalysisUseFile(use, testData.fileName, false);
            });

            cy.stepInfo(`4. Export the report.`);
            _NavigationSection.openReviewAndExport();
            ReviewExport.selectSectionsToIncludeInExport(testData.sectionsToExport)
                .generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it("Check export", () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);

                    cy.stepInfo(`5. Verify that when user saves the page and exports, those 
                                files appear in my Word doc in the corresponding locations.`);
                    cy.visit(<string>file);
                    for (let i = 0; i < testData.marketAnalysisUses.length; i++) {
                        cy.xpath(`//h1[.='${testData.sectionBeforeSubmarketFiles}']/following-sibling::p`)
                            .eq(i).scrollIntoView().should("have.text", testData.fileContent);
                    }

                    cy.xpath(`//h1[.='${testData.sectionBeforeSubmarketFiles}']/following-sibling::p`)
                        .eq(testData.marketAnalysisUses.length - 1).next().scrollIntoView()
                        .should("have.text", testData.sectionAfterSubmarketFiles);

                    for (let i = 0; i < testData.marketAnalysisUses.length; i++) {
                        cy.xpath(`//h2[.='${testData.sectionBeforeMarketFiles}']/following-sibling::p`)
                            .eq(i).scrollIntoView().should("have.text", testData.fileContent);
                    }

                    cy.xpath(`//h2[.='${testData.sectionBeforeMarketFiles}']/following-sibling::h2`)
                        .eq(0).scrollIntoView().should("have.text", testData.sectionAfterMarketFiles);
                });
        });

    });
