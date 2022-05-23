import { reportCreationFixture } from './../../../../fixtures/not_full_reports/report/key_info/QA-4718-19.fixture';
import { ReviewExport } from '../../../../actions/index';
import { Tag } from '../../../../utils/tags.utils';
import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/key_info/QA-4718-19.fixture';

describe(`[QA-4718-19] Verify the "Linked" chips dropdown in the new narrative component for Property Rights Appraised and Definition of Market Value sections`,
    { tags:[ Tag.report, Tag.key_info, Tag.check_export ] }, () => {
    it("Test body", () => {
        testData.typesReport.forEach((report, index) => {
            cy.stepInfo("Login, create report");
            createReport(reportCreationFixture(report, `_${index + 1}`));
    
            cy.stepInfo("1. Proceed to the Report > Key Info page.");
            _NavigationSection.navigateToReportInformation()
                .clickYesButton();
    
            cy.stepInfo(`2.Enter the “=“ and verify the "Linked" chips dropdown for both sections: options 'Gross Building Area', 'Building Name', 'Property Type', 
                'Residential Unit Count', 'Commercial Unit Count', 'Street Address', 'Street Name', 'Site Area', 'Year Built', 'Block', 'Lot', 'Concluded Cap Rate', 'Zones', 
                'Condition'.`);
            Report._KeyInfo.Page.formEditBtn(0).click();
            Report._KeyInfo.Page.formEditBtn(0).click();
            testData.chips.forEach(chip => {
                Report._KeyInfo.enterPropertyRightsAppraisedComment(`=${chip.typeSuggestValue}`, false, false, false);
                Report._KeyInfo.clickNarrativeSuggestions(chip.suggestionName);
                Report._KeyInfo.Page.textBoxPropertyRightsAppraised.should("include.text", chip.verifySuggest);
                Report._KeyInfo.enterDefinitionMarketValue(`=${chip.typeSuggestValue}`, false, false, false);
                Report._KeyInfo.clickNarrativeSuggestions(chip.suggestionName, 1);
                Report._KeyInfo.Page.textBoxPropertyRightsAppraised.should("include.text", chip.verifySuggest);
            });
            Report._KeyInfo.Page.formSaveBtn(0).click();
            Report._KeyInfo.Page.formSaveBtn(1).click();
    
            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(reportCreationFixture(report, `_${index + 1}`).reportNumber);
            deleteReport(reportCreationFixture(report, `_${index + 1}`).reportNumber);
        });
    });

    it("Check export", () => {
        testData.typesReport.forEach((report, index) => {
            cy.task("getFilePath", { _reportName: reportCreationFixture(report, `_${index + 1}`).reportNumber, _docx_html: "html" }).then(file => {
                cy.log(<string>file);
                cy.stepInfo("3. Verify the linked chips on export for both sections");
                cy.visit(<string>file);
    
                testData.chips.forEach(chip => {
                    cy.contains("Property Rights Appraised").next().scrollIntoView().should("include.text", chip.verifyExport);
                    cy.contains("Definition of Market Value").next().next().scrollIntoView().should("include.text", chip.verifySuggest);
                });
            }); 
        });
    });
});