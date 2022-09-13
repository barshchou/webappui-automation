import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4974.fixture";
import { Sales } from "../../../../actions";
import { _NavigationSection as NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";

describe("[QA-4974] Verify sections of Sales Adjustment Grid", 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {

        beforeEach("Login, create report", () => {
            cy.stepInfo("Login, create report with 'commercial only' income type");
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo("1. Add several comps in the Sales > Find Comps page");
            NavigationSection.navigateToFindComps();
            Sales._FindComps.zoomInAndResetFilters()
                .selectCompFromMap()
                .selectCompFromMap(-1);
        
            cy.stepInfo("2. Verify sections of Sales Adjustment Grid");
            NavigationSection.navigateToAdjustComps();
            testData.verifyColumns.forEach(val => {
                Sales._AdjustComps.verifyRowWithNameExists(val);
            });

            testData.verifyDiscussionHeaders.forEach(val => {
                Sales._AdjustComps.verifyDiscussionsFieldWithNameExists(val);
            });
        }); 
    });
