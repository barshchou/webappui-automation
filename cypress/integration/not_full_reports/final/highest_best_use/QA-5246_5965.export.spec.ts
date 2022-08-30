import { Final, Property, ReviewExport } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/final/highest_best_use/QA-5246_5965.fixture';

describe("Verify and change to support custom types on the Highest & Best Use page.",
    { tags: [ "@final", "@highest_best_use", "@check_export" ] }, () => {

        it("[QA-5965]", () => {
            cy.stepInfo("1. Login, create report");
            createReport(testData.reportCreationData);

            cy.stepInfo("2. Proceed to the Final > Highest & Best Use> Financially Feasible");
            _NavigationSection.navigateToHighestAndBestUse();
            Final._HighestBestUse.clickFinanciallyTab();

            cy.stepInfo(`3 Verify property types options available for selecting in "What are the most 
                        financially feasible property types for as improved?" drop-down`);
            Final._HighestBestUse.addFinanciallyFeasiblePropertyTypesAsVacant(testData.typesAs)
                .addFinanciallyFeasiblePropertyTypesAsImproved(testData.typesAs);
        });

        it("[QA-5246]", () => {
            cy.stepInfo("1. Login, create report");
            createReport(testData.reportCreationData);

            cy.stepInfo("2. Proceed to the Final > Highest & Best Use> Financially Feasible");
            _NavigationSection.navigateToHighestAndBestUse();
            Final._HighestBestUse.clickFinanciallyTab();

            cy.stepInfo(`3. Enter a name which is not included in the “What are the most financially feasible 
                        property types for as vacant?” and “What are the most financially feasible property 
                        types for as improved?” dropdowns (e.g.: TEST) and press the enter.`);
            Final._HighestBestUse.enterInSelectChipsWrapper(testData.textToType)
                .enterInSelectChipsWrapper(testData.textToType, 1);

            cy.stepInfo("4. Property> Zoning > Uses");
            _NavigationSection.navigateToPropertyZoning();
            Property._Zoning.clickUsesTab()
                .enterInSelectChipsWrapper(testData.textToType);

            cy.stepInfo("5. Export the report");
            _NavigationSection.Actions.openReviewAndExport();

            ReviewExport.selectSectionsToIncludeInExport(testData.sectionsToExport)
                .generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it("Check export", () => {
            cy.task("getFilePath",
                { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" }
            ).then(file => {
                cy.log(<string>file);
                cy.visit(<string>file);

                cy.stepInfo(`6. Proceed to the Highest & Best Use and Zoning section in the exported report 
                            and check that entered data is displayed`);
                cy.contains("Summary of Use and Bulk Regulations").next().next().scrollIntoView()
                    .invoke("text").should("include", testData.textToType);
                cy.xpath("//h2[contains(text(), 'As Vacant')]").next().scrollIntoView()
                    .invoke("text").should("include", testData.textToType);
                cy.xpath("//h2[contains(text(), 'As Improved')]").next().scrollIntoView()
                    .invoke("text").should("include", testData.textToType);
            });
        });
    });