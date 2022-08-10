import { Final } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/final/highest_best_use/QA-5246.fixture';

describe("Change to support custom types on the Highest & Best Use page.",
    { tags: [ "@final", "@highest_best_use" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo("1. Proceed to the Final > Highest & Best Use> Financially Feasible");
            _NavigationSection.navigateToHighestAndBestUse();
            Final._HighestBestUse.clickFinanciallyTab();

            cy.stepInfo(`2.Enter a name which is not included in the “What are the most financially feasible 
                        property types for as vacant?” and “What are the most financially feasible property 
                        types for as improved?” dropdowns (e.g.: TEST) and press the enter.`);
            Final._HighestBestUse.enterInSelectPropertyType(testData.textToType);
            cy.pause();
        });
    });