import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4221.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { Sales } from "../../../../actions";

describe(`Check Unit Comparison Adjustment Discussion`, 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {
        beforeEach("Login, create report", () => {
            cy.stepInfo(`1. Create report`);
            createReport(testData.reportCreationData);
        });

        it("[QA-4221]", () => {
            cy.stepInfo(`2. Navigate to Find Comps and add sales comps`);
            _NavigationSection.navigateToFindComps();
            Sales._FindComps.AddressSearch.openAddressSearchTab()
                .addCompByParameter(1, testData.compProperty, testData.compStatusDate);

            cy.stepInfo(`3. Navigate to Adjust Comps and add appropriate Other Adjustments and
            verify generated commentary`);
            _NavigationSection.navigateToAdjustComps();
            Sales._AdjustComps.checkCalculationUnitsRadio(testData.calculationUnits)
                .expandDiscussionSection(testData.discussionSection);
            Sales._AdjustComps.verifyDiscussionCommentary(testData.unitOfComparisonDiscussionTitle, 
                testData.comparablesAdjustmentsText);
        });
    });