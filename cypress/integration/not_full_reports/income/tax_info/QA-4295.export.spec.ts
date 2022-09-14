import testData from "../../../../fixtures/not_full_reports/income/tax_info/QA-4295.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { _TaxInfo } from "../../../../actions/income";
import { ReviewExport } from '../../../../actions';
import Enums from "../../../../enums/enums";

describe(`[Assessed Value & RE Taxes] Verify the 'Tax Calculation Discussion' generated commentary 
        is displayed on the Tax Info page.`, { tags: [ "@check_export", "@income", "@tax_info", "@fix" ] }, () => {

    it("Test body", () => {
        createReport(testData.reportCreationData);

        cy.stepInfo(`1. Navigate to Income -> Tax Info`);
        _NavigationSection.navigateToTaxInfo();

        cy.stepInfo(`2. Verify Tax Calculation discussion title and commentary is empty`);
        _TaxInfo.verifyTaxCalculationDiscussionTitle(testData.title)
            .verifyFormCommentTextBoxText(Enums.PAGES_TEXTBOX_NAMES.taxCalculationDiscussion, '');

        cy.stepInfo(`3. Verify that any text could be entered in the generated commentary field`);
        _TaxInfo.clearFormCommentTextBox(Enums.PAGES_TEXTBOX_NAMES.taxCalculationDiscussion)
            .enterFormCommentTextBox(Enums.PAGES_TEXTBOX_NAMES.taxCalculationDiscussion, testData.commentary)
            .verifyFormCommentTextBoxText(Enums.PAGES_TEXTBOX_NAMES.taxCalculationDiscussion,
                testData.commentary);

        cy.stepInfo(`4. Verify Tax Calculation discussion's tooltip content`);
        _TaxInfo.verifyTaxCalculationTooltip(testData.tooltip);

        cy.stepInfo(`5. Export the report`);
        _NavigationSection.Actions.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
    });

    it("Check export", () => {
        cy.task("getFilePath",
            { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" }
        ).then(file => {
            cy.log(<string>file);
            cy.visit(<string>file);

            cy.stepInfo(`6. Check that Tax Calculation Discussion commentary exports 
                        in the 'Assessed Value & RE Taxes' section of the report.`);
            cy.contains(testData.exportSectionName).scrollIntoView().next().next()
                .next().next().next().next().next().should("have.text", testData.commentary);
        });
    });
});