import testData, { reportCreationData } from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4230.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Sales } from "../../../../actions";

describe("Check Condition Discussion", 
    { tags:[ "@sales", "@adjust_comps", ] }, () => {

        it("Test body", () => {
            testData.conclusionValues.forEach((val, index) => {
                cy.stepInfo(`Login, create report №${index + 1}`);
                createReport(reportCreationData(val));

                cy.stepInfo("1. Navigate to Find comps page and add a sales comps");
                _NavigationSection.navigateToFindComps();
                Sales._FindComps.selectCompFromMap();

                cy.stepInfo("2. Navigate to Adjust Comps");
                _NavigationSection.navigateToAdjustComps();

                cy.stepInfo("3. Show all Discussions and verify Other > Condition Discussion");
                if (val === "AS_STABILIZED") {
                    Sales._AdjustComps.clickDiscussionsShowAllButton()
                        .verifyConditionDiscussionCommentary(testData.initialCommentaryValues[0]);
                } else {
                    Sales._AdjustComps.clickDiscussionsShowAllButton()
                        .verifyConditionDiscussionCommentary(testData.initialCommentaryValues[1])
                        .verifyConditionDiscussionCommentary(testData.initialCommentaryValues[2]);
                }

                cy.stepInfo("4. Fill Adjustment input and verify Other > Condition Discussion");

                testData.generateCommentaryValues.forEach((val, index) => {
                    Sales._AdjustComps.enterConditionAdjustmentByColumn(testData.otherAdjustment[index])
                        .verifyConditionDiscussionCommentary(val);
                    cy.reload();
                });
            });
        });
    });