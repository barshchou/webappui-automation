import testData from "../../../../fixtures/not_full_reports/final/swot_analysis/QA-4959.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Final, ReviewExport } from "../../../../actions";

describe("Verify the text in the Opportunities section on the SWOT Analysis page", 
    { tags:[ "@final", "@swot_analysis", "@check_export" ] }, () => {

        it("[QA-4959]", () => {
            cy.stepInfo("Login, create report");
            createReport(testData.reportCreationData);

            cy.stepInfo("1. Navigate to Final > Swot Analysis page and verify the text in the Opportunities section");
            _NavigationSection.navigateToFinalSWOTAnalysis();

            cy.stepInfo(`2. Verify the following list of threats is displayed:
                        - Rent growth is limited by local rent control laws.
                        - On July 27th, 2022, the Federal Reserve Board increased their benchmark rate by 25 basis 
                        points in March and again by 50 basis points at their May meeting in an effort to curb 
                        inflation. The Fed announced that more rate hikes are expected this year.
                        - As the economy continues its recovery from the global pandemic, there remains 
                        uncertainty related to the speed and consistency of the recovery.
                        - Economic uncertainty and potential market instability related to the war in Ukraine.
                        `);
            Final._SWOTAnalysis.verifyTextSection(testData.threats, testData.threatsTexts);

            cy.stepInfo("3. Export the report");
            _NavigationSection.openReviewAndExport();
            ReviewExport.selectSectionsToIncludeInExport(testData.sectionToExport)
                .generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it("Check export", () => {
            cy.task("getFilePath",
                { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" }
            ).then(file => {
                cy.log(<string>file);
                cy.visit(<string>file);
            
                cy.stepInfo(`4. Verify that the same list of threats as in Step #2  is displayed 
                                in the exported report “Threats” section`);
                cy.contains(testData.exportSectionName).scrollIntoView().next().find("li").then($li => {
                    const reportTreatsText = $li.toArray().map(li => li.innerHTML);
                    expect(testData.threatsTexts).to.deep.eq(reportTreatsText); 
                });
               
            });
        });
    });