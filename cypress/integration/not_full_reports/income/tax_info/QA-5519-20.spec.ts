import testData from "../../../../fixtures/not_full_reports/income/tax_info/QA-5519-20.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income } from '../../../../actions/index';
import launchDarklyApi from "../../../../api/launchDarkly.api";

describe("[QA-5183] Export column order both assessment psf and assessment per unit", () => {

    before("Login and create report", () => {
        cy.stepInfo("1. Set feature flag and create report");
        launchDarklyApi.setFeatureFlagForUser(testData.featureFlagKey, testData.onFeatureFlag);
        createReport(testData.reportCreationData);
    });

    it("Test body", { tags: [ "@check_export", "@income", "@tax_info" ] }, () => {
        cy.stepInfo("2. Navigate to Income -> Tax Info");
        _NavigationSection.navigateToTaxInfo();

        cy.stepInfo("3. Click Add button on the Taxable Assessed Value card");
        Income._TaxInfo.clickAddNewRowButton()
            .clickAddNewRowButton(testData.buttonName)
            .verifyRowTaxLiability(testData.rowNames.additional)
            .verifyRowTaxLiability(testData.rowNames.special)
            .enterRowTaxLiabilityName(testData.rowNames.additional, testData.enterName)
            .enterRowTaxLiabilityName(testData.rowNames.special, testData.enterName);

        deleteReport(testData.reportCreationData.reportNumber);
    });

    after(() => {
        launchDarklyApi.removeUserTarget(testData.featureFlagKey);
    });
});