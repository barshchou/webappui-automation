import { Final } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/final/highest_best_use/QA-6002_13_15_20-22.fixture';

describe("Verify 'As Vacant Discussion' and 'As Improved' Generated Commentary",
    { tags: [ "@final", "@highest_best_use" ] }, () => {

        it("[QA-6002_13_15]", () => {
            cy.stepInfo("1. Login, create report");
            createReport(testData.reportCreationData);

            cy.stepInfo("2. Proceed to the Final > Highest & Best Use> Financially Feasible");
            _NavigationSection.navigateToHighestAndBestUse();
            Final._HighestBestUse.clickFinanciallyTab();

            cy.stepInfo("3. Check Subject Market Characteristics and Highest and Best Use Property Type for As Vacant");
            Final._HighestBestUse.checkSubjectMarketRadioValue(testData.checkValues.commercial)
                .checkAsVacantBestUsePropTypeRadioValue(testData.checkValues.residential);

            cy.stepInfo(`4. Open Highest & Best Use tab and Verify 'As Vacant Maximally Productive Discussion'
                        initial commentary`);
            Final._HighestBestUse.clickHighestUseTab()
                .verifyHighestAndBestUseCommentary(testData.commentNames.maximallyProductiveAsVacant,
                    testData.initialAsVacantMaximallyProductiveDiscussionText);

            cy.stepInfo(`5. Select any options in the "What are the most financially feasible property 
                        types for as vacant?" drop-down`);
            Final._HighestBestUse.clickFinanciallyTab()
                .addFinanciallyFeasiblePropertyTypesAsVacant(testData.typeAs)
                .verifyHighestAndBestUseCommentary(testData.commentNames.financiallyFeasibleAsVacant, 
                    testData.asVacantDiscussionText);

            cy.stepInfo(`6. Select any options in the "What are the most financially feasible property 
                        types for as improved?" drop-down`);
            Final._HighestBestUse.checkAsImprovedBestUseRadioValue(testData.checkValues.residential)
                .verifyHighestAndBestUseCommentary(testData.commentNames.financiallyFeasibleAsImproved, 
                    testData.initialAsImprovedDiscussionText)
                .addFinanciallyFeasiblePropertyTypesAsImproved(testData.typeAs)
                .verifyHighestAndBestUseCommentary(testData.commentNames.financiallyFeasibleAsImproved, 
                    testData.asImprovedDiscussionText);

            cy.stepInfo(`7. Open Highest & Best Use tab and Verify 'As Vacant Maximally Productive Discussion'
                        Generated Commentary`);
            Final._HighestBestUse.clickHighestUseTab()
                .verifyHighestAndBestUseCommentary(testData.commentNames.maximallyProductiveAsVacant,
                    testData.asVacantMaximallyProductiveDiscussionText);

            cy.stepInfo("8. Verify 'As Vacant Conclusion Discussion' Generated Commentary");   
            Final._HighestBestUse.verifyHighestAndBestUseCommentary(testData.commentNames.conclusionAsVacant,
                testData.asVacantConclusionDiscussionText);

            cy.stepInfo("9. Verify 'As Improved Maximally Productive Discussion' Generated Commentary");   
            Final._HighestBestUse.verifyHighestAndBestUseCommentary(testData.commentNames.maximallyProductiveAsImproved,
                testData.asImprovedMaximallyProductiveDiscussionText);

            cy.stepInfo("10. Verify 'As Improved Conclusion Discussion' Generated Commentary");   
            Final._HighestBestUse.verifyHighestAndBestUseCommentary(testData.commentNames.conclusionAsImproved,
                testData.asImprovedConclusionDiscussionText);
        });
    });