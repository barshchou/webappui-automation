import { Property } from '../../../../actions/index';
import testData from "../../../../fixtures/not_full_reports/income/tax_info/QA-5905-08.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income } from '../../../../actions';
import launchDarklyApi from "../../../../api/launchDarkly.api";
import { numberWithCommas } from '../../../../../utils/numbers.utils';

describe(`Tax Liability (PSF) for Summary tab sections is calculated correctly according to selected Basis 
        for Square Foot Analysis`, { tags: [ "@income", "@tax_info" ] }, () => {
    beforeEach('Login, create report, navigate to Tax Info Projected tab', () => {
        cy.stepInfo(`1. Set feature flag and create report`);
        launchDarklyApi.setFeatureFlagForUser(testData.flexibleTaxesKey, testData.onFeatureFlag)
            .setFeatureFlagForUser(testData.flexibleGbaAnalysisKey, testData.onFeatureFlag);
        createReport(testData.reportCreationData);

        cy.stepInfo(`2. Basis for Square Foot Analysis should be selected and filled on Property > Summary form`);
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.selectBasisSquareFootAnalysis(testData.gbaAnalysisBasis)
            .fillBasisSquareFootAnalysis(testData.squareFootAnalysisArea);

        cy.stepInfo(`3. Navigate to Income -> Tax Info and select PSF radio button in Concluded Liability Basis`);
        _NavigationSection.navigateToTaxInfo();
        Income._TaxInfo.checkBasisByValue(testData.perSf);

        cy.stepInfo(`4. Go to Income > Tax Info > Projected tab`);
        Income._TaxInfo.clickProjectedTab();

        cy.stepInfo(`5. Click on the checkbox “Include in report” on Projected Tax Liability card, so it is checked`);
        Income._TaxInfo.checkProjectedIncludeCheckbox();

        cy.stepInfo(`6. Click on the checkbox “Include in report” on Opinion Provided card, so it is checked`);
        Income._TaxInfo.checkProjectedSectionCheckbox(testData.opinionProvidedSectionCheckbox);

        cy.stepInfo(`7. Fill in Taxable Assessed Value (Provided) field with valid numeric value`);
        Income._TaxInfo.enterItemValueOnProjectedTab(testData.taxableAssessedValueIdInput, 
            `$${numberWithCommas(testData.assessedValueProvided)}`);

        cy.stepInfo(`8. Click on the checkbox "Include in report" on Percent of Renovations card, so it is checked`);
        Income._TaxInfo.checkProjectedSectionCheckbox(testData.renovationSectionCheckbox);

        cy.stepInfo(`9. Fill in Net Renovations and Assessment Ratio fields with valid numeric value`);
        Income._TaxInfo.enterItemValueOnProjectedTab(testData.netRenovationInput, 
            `$${numberWithCommas(testData.netRenovation)}`)
            .enterItemValueOnProjectedTab(testData.assessmentRationInput, `${testData.assessmentRation.toFixed(2)}%`);

        cy.stepInfo(`10. Click on the checkbox "Include in report" on Percent of Income card, so it is checked`);
        Income._TaxInfo.checkProjectedSectionCheckbox(testData.percentOfIncomeSectionCheckbox);
    
        cy.stepInfo(`11. Fill in Income and Tax Liability Ratio fields with valid numeric value`);
        Income._TaxInfo.enterItemValueOnProjectedTab(testData.incomeInput, `$${numberWithCommas(testData.income)}`)
            .enterItemValueOnProjectedTab(testData.taxLiabilityRatioInput, `${testData.taxLiabilityRatio}%`);

        cy.stepInfo(`12. Click on the checkbox "Include in report" on Equalized Market Value card, so it is checked`);
        Income._TaxInfo.checkProjectedSectionCheckbox(testData.equalizedMarketValueCheckbox);

        cy.stepInfo(`13. Fill in Estimated Market Value and Equalization Ratio fields with valid numeric value`);
        Income._TaxInfo.enterItemValueOnProjectedTab(testData.estimatedMarketValueInput, 
            `$${numberWithCommas(testData.estimatedMarketValue)}`)
            .enterItemValueOnProjectedTab(testData.equalizationRatioInput, `${testData.equalizationRatio.toFixed(2)}%`);
    });

    it("[QA-5905][QA-5906][QA-5907][QA-5908]", () => {
        cy.stepInfo(`14. Go to Income > Tax Info>Summary tab`);
        Income._TaxInfo.clickSummaryTab();

        cy.stepInfo(`15. Verify Tax Liability (PSF) for Equalized Market Value is calculated with formula = 
                    Tax Liability (Total) / selected Basis for Square Foot Analysis`);
        Income._TaxInfo.verifyTaxLiabilityOnSummaryTab(testData.squareFootAnalysisArea, 
            testData.equalizedMarketValue);

        cy.stepInfo(`16. Verify Tax Liability (PSF) in  Percent of Income grid is calculated with formula = 
                    Tax Liability (Total) / selected Basis for Square Foot Analysis`);
        Income._TaxInfo.verifyTaxLiabilityOnSummaryTab(testData.squareFootAnalysisArea, 
            testData.percentOfIncome);

        cy.stepInfo(`17. Verify Tax Liability (PSF) in  Percent of Renovations grid is calculated with formula = 
                    Tax Liability (Total) / selected Basis for Square Foot Analysis`);
        Income._TaxInfo.verifyTaxLiabilityOnSummaryTab(testData.squareFootAnalysisArea, 
            testData.renovationSection);

        cy.stepInfo(`18. Verify Tax Liability (PSF) in Opinion Provided grid is calculated with formula = 
                    Tax Liability (Total) / selected Basis for Square Foot Analysis`);
        Income._TaxInfo.verifyTaxLiabilityOnSummaryTab(testData.squareFootAnalysisArea, 
            testData.opinionProvided);
    });

    after(() => {
        launchDarklyApi.removeUserTarget(testData.flexibleTaxesKey);
        launchDarklyApi.removeUserTarget(testData.flexibleGbaAnalysisKey);
    });
});