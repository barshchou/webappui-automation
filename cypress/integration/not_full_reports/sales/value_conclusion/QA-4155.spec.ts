import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4155.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Sales } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";

describe(`Concluded Value per SF "Amount" is editable`, 
    { tags: [ "@sales", "@value_conclusion" ] }, () => {

        it(`[QA-4155]`, () => {
            cy.stepInfo(`1. Create a report`);
            createReport(testData.reportCreationData);

            cy.stepInfo(`2. Go to Value Conclusion page`);
            _NavigationSection.navigateToSalesValueConclusion();

            cy.stepInfo(`3. Put cursor into the Concluded Value Per SF cell in the Amount column and input value`);
            Sales._ValueConclusion.enterSaleValueConclusion(testData.concludedValue)
                .verifySaleValueConclusion(testData.concludedValue);

            cy.stepInfo(`4. Click Save Button`);
            Sales._ValueConclusion.clickSaveButton();

            cy.stepInfo(`5. Put cursor into the Concluded Value Per SF cell in the Amount column and change the value`);
            Sales._ValueConclusion.enterSaleValueConclusion(testData.concludedValueUpdated)
                .verifySaleValueConclusion(testData.concludedValueUpdated);
        });
    });