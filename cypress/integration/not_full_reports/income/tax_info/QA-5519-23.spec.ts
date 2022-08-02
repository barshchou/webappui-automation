import testData from "../../../../fixtures/not_full_reports/income/tax_info/QA-5519-23.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income } from '../../../../actions/index';
import launchDarklyApi from "../../../../api/launchDarkly.api";

describe("[QA-5119-23] Check that user can add, delete, update additional tax rate rows", () => {

    beforeEach("Login and create report", () => {
        cy.stepInfo("1. Set feature flag and create report");
        launchDarklyApi.setFeatureFlagForUser(testData.featureFlagKey, testData.onFeatureFlag);
        createReport(testData.reportCreationData);
    });

    it("Test body", { tags: [ "@feature_flag", "@income", "@tax_info" ] }, () => {
        cy.stepInfo("2. Navigate to Income -> Tax Info");
        _NavigationSection.navigateToTaxInfo();

        cy.stepInfo("3. Click Add button on the Taxable Assessed Value card and verify added rows");
        Income._TaxInfo.clickAddNewRowButton()
            .clickAddNewRowButton(testData.buttonName)
            .verifyRowTaxLiability(testData.rowNames.additional)
            .verifyRowTaxLiability(testData.rowNames.special);

        cy.stepInfo("4. Enter new name in added rows");
        Income._TaxInfo.enterRowTaxLiabilityItem(testData.rowNames.additional, testData.enterName)
            .enterRowTaxLiabilityItem(testData.rowNames.special, testData.enterName);

        cy.stepInfo("5. Enter row TaxLiability value");
        Income._TaxInfo.clickAddNewRowButton()
            .clickAddNewRowButton(testData.buttonName)
            .enterRowTaxLiabilityValue(testData.rowNames.additional, testData.additionalTaxRateValue)
            .enterRowTaxLiabilityValue(testData.rowNames.special, testData.specialAssessmentRowValue)
            .verifyTotalTaxLiability();

        cy.stepInfo("6. Click 'Delete' from 'Action' column and verify row successfully deleted");
        Income._TaxInfo.deleteRowTaxLiability(testData.rowNames.additional)
            .deleteRowTaxLiability(testData.rowNames.special)
            .deleteRowTaxLiability(testData.enterName)
            .deleteRowTaxLiability(testData.enterName);
    });

    after(() => {
        launchDarklyApi.removeUserTarget(testData.featureFlagKey);
    });
});