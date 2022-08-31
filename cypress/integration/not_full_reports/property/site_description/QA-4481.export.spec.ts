import testData from "../../../../fixtures/not_full_reports/property/site_description/QA-4481.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property, ReviewExport } from "../../../../actions";


// TODO: [QA-6605] Error pulling 'neighborhood' data into a comment 'Location Within Market'
describe(`[QA-4481] Check that generated text pulls in the first submarket`,
    { tags: [ "@property", "@site_description", "@check_export" ] }, () => {
        
        it("Test body", () => {
            cy.stepInfo(`1. Create a new report on the WebApp and navigate to Property > Market.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToPropertyMarket();
        
            cy.stepInfo(`2. Fill in Market research fields.`);
            Property._Market.enterNeighborhood(testData.neighborhood)
                .enterArea(testData.area)
                .enterMarketState(testData.state)
                .enterNeighborhoodYear(testData.neighborhoodYear)
                .enterMarketQuarter(testData.submarketAndMarketQuarter)
                .enterMarketYear(testData.submarketAndMarketYear);

            testData.marketAnalysisUses.forEach((use, index) => {
                Property._Market.checkUncheckMarketAnalysisUseCheckbox(use, true)
                    .enterMarket(testData.marketValues[index], use)
                    .enterSubmarket(testData.submarketValues[index], use);
            });

            cy.stepInfo(`3. Navigate to Property > Site Description and check that 
                        generated text pulls in the first submarket`);
            _NavigationSection.openSiteDescriptionInProperty();
            Property._SiteDescription.verifyGeneratedCommentary(testData.discussion, testData.commentary);
        
            cy.stepInfo(`4. Export the report`);
            _NavigationSection.openReviewAndExport();
            ReviewExport.selectSectionsToIncludeInExport(testData.sectionToExport)
                .generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it("Check export", () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);

                    cy.stepInfo(`5. Proceed to Site Description and verify that 
                                Location Description commentary has been exported correctly.`);
                    cy.visit(<string>file);
                    cy.contains(testData.exportSectionName).scrollIntoView().next("table").within(() => {
                        cy.get("tr").eq(0).find("td").eq(1).find("p")
                            .should("have.text", testData.commentary);
                    }); 
                });
        });
    });