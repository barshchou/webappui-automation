import { createReportData } from '../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4606.fixture';
import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4606.fixture";
import { Property, Sales } from "../../../../actions";
import { _NavigationSection as NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";

describe("[QA-4606] Check the reference 'Condition' line in the Sales Adjustment Grid", 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {
        testData.conclusionValue.forEach((conclusion, index) => {
            it(`Created ${conclusion} report`, () => {
                cy.stepInfo(`Login, create report`);
                cy.stepInfo(`1. Create Report #${index + 1}`);
                createReport(createReportData(conclusion));

                cy.stepInfo(`2. Add Comp`);
                NavigationSection.navigateToFindComps();
                Sales._FindComps.selectCompFromMap();

                cy.stepInfo(`3. Navigate Property > Property Description > Site Description and 
                verify As Is General Property Condition`);
                NavigationSection.navigateToPropertyDescription();
                if (conclusion === "AS_COMPLETE") {
                    Property._Description.selectAsStabilizedPropertyCondition(testData.propertyCondition);
                } else {
                    Property._Description.selectGeneralPropertyCondition(testData.propertyCondition);
                }

                cy.stepInfo(`4. Navigate to Sales > Adjust Comps > Sales Adjustment Grid`);
                NavigationSection.navigateToAdjustComps();

                cy.stepInfo(`5. Verify that the subject column displays the subject 
                property condition as set in Property > Property Description > Site Description`);
                Sales._AdjustComps.expandAdjustmentDetails(testData.adjustmentName)
                    .verifyExistValueInOtherAdjustmentDetails(testData.propertyCondition);
            }); 
        });
    });