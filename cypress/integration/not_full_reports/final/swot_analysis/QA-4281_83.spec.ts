import testData from "../../../../fixtures/not_full_reports/final/swot_analysis/QA-4281_83.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Final } from "../../../../actions";


describe("Verify the text in the Opportunities section on the SWOT Analysis page", 
    { tags:[ "@final", "@swot_analysis" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);

            cy.stepInfo("1. Navigate to Final > Swot Analysis page and verify the text in the Opportunities section");
            _NavigationSection.navigateToFinalSWOTAnalysis();
        });

        it("[QA-4281_83]", () => {
            cy.stepInfo(`2. The text in the Opportunities section is the following:
                        - All units are rent stabilized, and there is potential upside upon tenant turnover.
                        - There has been increased demand for similar assets as investors from prime New York 
                        Metro submarkets seek higher returns increasing pricing for similar assets.
            `);
            Final._SWOTAnalysis.Page.getSectionTexts(testData.opportunities).then($textarea => {
                const opportunitiesText = $textarea.toArray().map(el => el.innerHTML);
                expect(testData.opportunitiesTexts).to.deep.eq(opportunitiesText);
            });

            cy.stepInfo("3. Verify that the text can be changed and saved in the Opportunities section.");
            Final._SWOTAnalysis.Page.getSectionTexts(testData.opportunities).then($textarea => {
                $textarea.toArray().forEach(el => {
                    cy.wrap(el).type(testData.typeValue);
                });
                Final._SWOTAnalysis.clickSaveButton();
            });

            Final._SWOTAnalysis.Page.getSectionTexts(testData.opportunities).then($textarea => {
                const opportunitiesText = $textarea.toArray().map(el => el.innerHTML);
                opportunitiesText.forEach(el => {
                    expect(el).to.contain(testData.typeValue);
                });
            });
        });
    });