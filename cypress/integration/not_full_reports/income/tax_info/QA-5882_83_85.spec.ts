import testData from "../../../../fixtures/not_full_reports/income/tax_info/QA-5882_83_85.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income, Property } from '../../../../actions/index';
import launchDarklyApi from "../../../../api/launchDarkly.api";

describe(`[QA-5882_83_85] Square Foot row in Tax Liability grid is displayed according to 
        selected Basis for Square Foot Analysis`, () => {

    it("Test body", { tags: [ "@income", "@tax_info", "@feature_flag" ] }, () => {
        cy.stepInfo("1. Create report");
        launchDarklyApi.setFeatureFlagForUser(testData.featureFlagKey, testData.onFeatureFlag);
        createReport(testData.reportCreationData);
        testData.squareFootAnalysisRadios.forEach((radio, index) => {
            let normalIndex = index + 1;
            cy.stepInfo(`2.${normalIndex}. Navigate to  Property -> Summary form`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.selectBasisSquareFootAnalysis(radio);
            if (radio !== "GBA") { Property._Summary.fillBasisSquareFootAnalysis(testData.enterValue); }
           
            cy.stepInfo(`3.${normalIndex}. Navigate to Income -> Tax Info`);
            _NavigationSection.navigateToTaxInfo();
    
            cy.stepInfo(`4.${normalIndex}. Verify Tax Liability Item And Value`);
            if (radio === "GBA") {
                Income._TaxInfo.verifyTaxLiabilityItemAndValue(radio, testData.commonValue)
                    .verifyPSFTaxLiability(radio);
            } else {
                Income._TaxInfo.verifyTaxLiabilityItemAndValue(radio, testData.enterValue)
                    .verifyPSFTaxLiability(radio);
            }            
        });
    });

    after(() => {
        launchDarklyApi.removeUserTarget(testData.featureFlagKey);
    });
});