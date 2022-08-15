import { Final } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/final/highest_best_use/QA-6002_13_15.fixture';

describe("Verify 'As Vacant Discussion' and 'As Improved' Generated Commentary",
    { tags: [ "@final", "@highest_best_use" ] }, () => {

        it("[QA-6002_13_15]", () => {
            cy.stepInfo("1. Login, create report");
            createReport(testData.reportCreationData);

            cy.stepInfo("2. Proceed to the Final > Highest & Best Use> Financially Feasible");
            _NavigationSection.navigateToHighestAndBestUse();
            Final._HighestBestUse.clickFinanciallyTab();

            cy.stepInfo(`3. Select any options in the "What are the most financially feasible property 
                        types for as vacant?" drop-down`);
            Final._HighestBestUse.checkSubjectMarketRadioValue(testData.checkValues.commercial)
                .checkAsVacantBestUsePropTypeRadioValue(testData.checkValues.residential)
                .addFinanciallyFeasiblePropertyTypesAsVacant(testData.typeAs)
                .verifyHighestAndBestUseCommentary(testData.commentNames.vacant, testData.asVacantDiscussionText);

            cy.stepInfo(`4. Select any options in the "What are the most financially feasible property 
                        types for as improved?" drop-down`);
            Final._HighestBestUse.checkAsImprovedBestUseRadioValue(testData.checkValues.residential)
                .verifyHighestAndBestUseCommentary(testData.commentNames.improved, 
                    testData.initialAsImprovedDiscussionText)
                .addFinanciallyFeasiblePropertyTypesAsImproved(testData.typeAs)
                .verifyHighestAndBestUseCommentary(testData.commentNames.improved, testData.asImprovedDiscussionText);

            cy.stepInfo(`5. Open Highest & Best Use tab and Verify 'As Vacant Maximally Productive Discussion'
                        Generated Commentary`);
            Final._HighestBestUse.clickHighestUseTab();
        });
    });