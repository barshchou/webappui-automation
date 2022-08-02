import testData from "../../../../fixtures/not_full_reports/final/swotAnalysis/QA-4281.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Final } from "../../../../actions";


describe("Verify the text in the Opportunities section on the SWOT Analysis page", 
    { tags:[ "@final", "@swot_analysis", ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("[QA-4281]", () => {
            cy.stepInfo("1. Navigate to Final > Swot Analysis page and verify the text in the Opportunities section");
            _NavigationSection.navigateToFinalSWOTAnalysis();

            cy.stepInfo(`2. The text in the Opportunities section is the following:
                        - All units are rent stabilized, and there is potential upside upon tenant turnover.
                        - There has been increased demand for similar assets as investors from prime New York 
                        Metro submarkets seek higher returns increasing pricing for similar assets.
            `);
            Final._SWOTAnalysis.Page.opportunitiesText.then($textarea => {
                const opportunitiesText = $textarea.toArray().map(el => el.innerHTML);
                expect(testData.opportunitiesText).to.deep.eq(opportunitiesText);
            });
        });
    });