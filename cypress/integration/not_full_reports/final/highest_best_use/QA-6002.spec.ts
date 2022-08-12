import { Final } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/final/highest_best_use/QA-6002.fixture';

describe("Verify 'As Vacant Discussion' Generated Commentary",
    { tags: [ "@final", "@highest_best_use" ] }, () => {

        it("[QA-5965]", () => {
            cy.stepInfo("1. Login, create report");
            createReport(testData.reportCreationData);

            cy.stepInfo("2. Proceed to the Final > Highest & Best Use> Financially Feasible");
            _NavigationSection.navigateToHighestAndBestUse();
            Final._HighestBestUse.clickFinanciallyTab();

            cy.stepInfo(`3 Select any options in the "What are the most financially feasible property 
                        types for as vacant?" drop-down`);
            Final._HighestBestUse.checkSubjectMarketRadioValue(testData.checkValues.commercial)
                .checkAsVacantBestUsePropTypeRadioValue(testData.checkValues.residential)
                .addFinanciallyFeasiblePropertyTypesAsVacant(testData.typeAs)
                .verifyFinanciallyCommentary("Vacant", Object.values(testData.checkValues))
                .verifyFinanciallyCommentary("Vacant", Cypress._.kebabCase(testData.typeAs));

            cy.stepInfo(`4 Select any options in the "What are the most financially feasible property 
                        types for as improved?" drop-down`);
            Final._HighestBestUse.checkAsImprovedBestUseRadioValue(testData.checkValues.residential)
                .verifyFinanciallyCommentary("Improved", Object.values(testData.checkValues))
                .addFinanciallyFeasiblePropertyTypesAsImproved(testData.typeAs)
                .verifyFinanciallyCommentary("Improved", Cypress._.kebabCase(testData.typeAs));
        });
    });