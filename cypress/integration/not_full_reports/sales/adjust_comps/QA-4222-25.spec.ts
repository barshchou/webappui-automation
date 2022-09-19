import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4222-25.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { Sales } from "../../../../actions";

describe(`Check Property Rights Discussion`, 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {
        beforeEach("Login, create report", () => {
            cy.stepInfo(`1. Create report`);
            createReport(testData.reportCreationData);
        });

        it("[QA-4222][QA-4223][QA-42224][QA-4225]", () => {
            cy.stepInfo(`2. Navigate to Find Comps and add sales comps`);
            _NavigationSection.navigateToFindComps();
            Sales._FindComps.AddressSearch.openAddressSearchTab()
                .addCompByParameter(1, testData.compProperty, testData.compStatusDate);

            cy.stepInfo(`3. Navigate to Adjust Comps and add appropriate Market Adjustments and
            verify generated commentary`);
            _NavigationSection.navigateToAdjustComps();
            Sales._AdjustComps.checkCalculationUnitsRadio(testData.calculationUnits)
                .expandDiscussionSection(testData.discussionSection);
            testData.comparablesAdjustments.forEach(marketAdjustments => {
                Sales._AdjustComps.enterMarketAdjustmentsGroup(Object.keys(marketAdjustments.adjustments), 
                    Object.values(marketAdjustments.adjustments))
                    .verifyDiscussionCommentary(testData.propertyRightsDiscussionTitle, 
                        marketAdjustments.propertyRightsDiscussionText)
                    .verifyDiscussionCommentary(testData.financingTermsDiscussionTitle, 
                        marketAdjustments.financingTermsDiscussion)
                    .verifyDiscussionCommentary(testData.conditionOfSaleDiscussionTitle, 
                        marketAdjustments.conditionsOfSaleDiscussion)
                    .verifyDiscussionCommentary(testData.marketConditionDiscussionTitle, 
                        marketAdjustments.marketConditionTimeDiscussion);
            });
        });
    });