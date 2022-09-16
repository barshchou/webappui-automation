import testData from "../../../../fixtures/not_full_reports/income/tax_info/QA-5182.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { ReviewExport, Income } from '../../../../actions';
import launchDarklyApi from "../../../../api/launchDarkly.api";

describe("Export column order both assessment psf and assessment per unit", 
    { tags: [ "@check_export", "@income", "@tax_info", "@feature_flag", "@fix" ] }, () => {
        it("[QA-5182]", () => {
            cy.stepInfo("1. Set feature flag and create report");
            launchDarklyApi.setFeatureFlagForUser(testData.featureFlagKey, testData.onFeatureFlag);
            createReport(testData.reportCreationData);

            cy.stepInfo("2. Navigate to Income -> Tax Info");
            _NavigationSection.navigateToTaxInfo();

            cy.stepInfo("3. Click Add button on the Taxable Assessed Value card");
            Income._TaxInfo.clickAddAdditionalTaxRate()
                .clickAddSpecialAssessmentRate();

            cy.stepInfo("4. Export the report");
            _NavigationSection.Actions.openReviewAndExport();
            ReviewExport
                .generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it("Check export", () => {
            cy.task("getFilePath",
                { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" }
            ).then(file => {
                cy.log(<string>file);
            
                cy.stepInfo(`Check that Tax Calculation Discussion commentary exports in the 
                        'Assessed Value & RE Taxes' section of the report.`);
            
                cy.visit(<string>file);
                cy.contains(testData.exportSectionName).scrollIntoView().next().next()
                    .next().next().next().next().next().should("have.text", testData.commentary);
            });
        });


        after(() => {
            launchDarklyApi.removeUserTarget(testData.featureFlagKey);
        });
    });