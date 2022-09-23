import { DataCollections } from './../../../../actions/index';
import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4228.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { Sales } from "../../../../actions";

describe(`Check Other Adjustment Discussions`, 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {
        beforeEach("Login, create report", () => {
            cy.stepInfo(`1. Create report`);
            createReport(testData.reportCreationData);

            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterYearBuilt(testData.yearBuilt)
                .selectBuildingCondition(testData.valueConclusionAsIs, testData.buildingConditionAsIs)
                .selectBuildingCondition(testData.valueConclusionAsStabilized, testData.buildingConditionAsStabilized);
        });

        it("[QA-4228]", () => {
            cy.stepInfo(`2. Navigate to Find Comps and add sales comps`);
            _NavigationSection.navigateToFindComps();
            Sales._FindComps.AddressSearch.openAddressSearchTab()
                .addCompByParameter(testData.filter, 1);

            cy.stepInfo(`3. Navigate to Adjust Comps and add appropriate Other Adjustments and
            verify generated commentary`);
            _NavigationSection.navigateToAdjustComps();
            Sales._AdjustComps.checkCalculationUnitsRadio(testData.calculationUnits)
                .expandDiscussionSection(testData.discussionSection);
            testData.comparablesAdjustments.forEach(otherAdjustment => {
                Sales._AdjustComps.enterOtherAdjustmentGroup(Object.keys(otherAdjustment.adjustments), 
                    Object.values(otherAdjustment.adjustments))
                    .verifyDiscussionCommentary(testData.sizeDiscussionTitle, 
                        otherAdjustment.sizeDiscussionText)
                    .verifyDiscussionCommentary(testData.rentStabilizationDiscussionTitle, 
                        otherAdjustment.rentStabilizationDiscussionText)
                    .verifyDiscussionCommentary(testData.conditionDiscussionTitle, 
                        otherAdjustment.conditionDiscussionText);
            });
        });
    });