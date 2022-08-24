import { Property } from './../../../../actions/index';
import testData from "../../../../fixtures/not_full_reports/income/tax_info/QA-5901.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income } from '../../../../actions';
import launchDarklyApi from "../../../../api/launchDarkly.api";

describe(`Tax Liability (PSF) for Opinion Provided is calculated correctly according to selected Basis 
for Square Foot Analysis`, { tags: [ "@income", "@tax_info" ] }, () => {
    
    it("[QA-5901]", () => {
        cy.stepInfo(`1. Set feature flag and create report`);
        launchDarklyApi.setFeatureFlagForUser(testData.flexibleTaxesKey, testData.onFeatureFlag)
            .setFeatureFlagForUser(testData.flexibleGbaAnalysisKey, testData.onFeatureFlag);
        createReport(testData.reportCreationData);

        //Remove after tests passes
        _NavigationSection.navigateToReportInformation();

        cy.stepInfo(`2. Basis for Square Foot Analysis should be selected and filled on Property > Summary form`);
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.selectBasisSquareFootAnalysis(testData.gbaAnalysisBasis)
            .fillBasisSquareFootAnalysis(testData.squareFootAnalysisArea);

        cy.stepInfo(`3. Navigate to Income -> Tax Info and select PSF radio button in Concluded Liability Basis`);
        _NavigationSection.navigateToTaxInfo();
        Income._TaxInfo.checkBasisByValue(testData.perSf);

        cy.stepInfo(`4. Go to Income > Tax Info > Projected tab`);
        Income._TaxInfo.clickProjectedTab()
            .checkProjectedIncludeCheckbox();

        cy.stepInfo(`4. Click on the checkbox “Include in report” on Projected Tax Liability card, so it is checked`);
        Income._TaxInfo.checkProjectedIncludeCheckbox();

        cy.stepInfo(`5. Click on the checkbox “Include in report” on Opinion Provided card, so it is checked`);
        Income._TaxInfo.checkProjectedOpinionProvidedCheckbox();

        cy.stepInfo(`6. Fill in Taxable Assessed Value (Provided) field with valid numeric value`);
        Income._TaxInfo.enterTaxAssessedValueProvided(testData.assessedValueProvided);

        cy.stepInfo(`7. Verify Tax Liability (PSF) in Opinion Provided grid is calculated with formula = 
                    Tax Liability (Total) / selected Basis for Square Foot Analysis`);
        Income._TaxInfo.verifyTaxLiabilityProvided(testData.squareFootAnalysisArea);
    });

    after(() => {
        launchDarklyApi.removeUserTarget(testData.flexibleTaxesKey);
        launchDarklyApi.removeUserTarget(testData.flexibleGbaAnalysisKey);
    });
});