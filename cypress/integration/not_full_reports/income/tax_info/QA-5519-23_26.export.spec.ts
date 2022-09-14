import testData from "../../../../fixtures/not_full_reports/income/tax_info/QA-5519-23_26.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income, ReviewExport } from '../../../../actions';
import launchDarklyApi from "../../../../api/launchDarkly.api";

describe("Check that rows added in the app are displayed in Tax Info --> Tax Liability", 
    { tags: [ "@check_export", "@income", "@tax_info" ] }, () => {
    
        it("[QA-5519-23_26]", () => {
            cy.stepInfo("1. Set feature flag and create report");
            launchDarklyApi.setFeatureFlagForUser(testData.featureFlagKey, testData.onFeatureFlag);
            createReport(testData.reportCreationData);

            cy.stepInfo("2. Navigate to Income -> Tax Info");
            _NavigationSection.navigateToTaxInfo();

            cy.stepInfo("3. Click Add button on the Taxable Assessed Value card and verify added rows");
            Income._TaxInfo.clickAddAdditionalTaxRate()
                .clickAddSpecialAssessmentRate()
                .verifyRowTaxLiability(testData.rowNames.additional)
                .verifyRowTaxLiability(testData.rowNames.special);

            cy.stepInfo("4. Enter new name in added rows");
            Income._TaxInfo.enterRowTaxLiabilityItem(testData.rowNames.additional, testData.enterName)
                .enterRowTaxLiabilityItem(testData.rowNames.special, testData.enterName);

            cy.stepInfo("5. Enter row TaxLiability value");
            Income._TaxInfo.clickAddAdditionalTaxRate()
                .clickAddSpecialAssessmentRate()
                .enterRowTaxLiabilityValue(testData.rowNames.additional, testData.additionalTaxRateValue)
                .enterRowTaxLiabilityValue(testData.rowNames.special, testData.specialAssessmentRowValue)
                .verifyTotalTaxLiability();

            cy.stepInfo("6. Click 'Delete' from 'Action' column and verify row successfully deleted");
            Income._TaxInfo.deleteRowTaxLiability(testData.enterName)
                .deleteRowTaxLiability(testData.enterName);

            cy.stepInfo("7. Download and convert Docx Report");
            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it("[QA-5526] Check export", () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.stepInfo("8. Verify rows added in export export");
                    cy.visit(<string>file);
                    cy.contains(testData.rowNames.additional).should("exist");
                    cy.contains(testData.rowNames.special).should("exist");
                }); 
        });

        after(() => {
            launchDarklyApi.removeUserTarget(testData.featureFlagKey);
        });
    });