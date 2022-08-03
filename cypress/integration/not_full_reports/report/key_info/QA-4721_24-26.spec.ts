import { ReviewExport } from '../../../../actions';
import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/key_info/QA-4721_24-26.fixture';

describe(`Verify the Save and Save & Continue button functionality on the Report > Key Info page:`,
    { tags:[ "@report", "@key_info" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("[QA-4721]", () => {
            cy.stepInfo(`1. Proceed to the Report > Key Info page`);
            _NavigationSection.navigateToReportInformation();

            cy.stepInfo(`2. Fill in the editable fields with values and click on the Save button then reload page`);
            Report._KeyInfo.enterPropertyRightsAppraisedComment(testData.enterValue, true, false, false);
            Report._KeyInfo.clickNarrativeSuggestions(testData.listValue)
                .verifyTextBoxPropertyRightsAppraised(testData.verifyTaxValue);
            Report._KeyInfo.enterDefinitionMarketValue(testData.enterValue, true, false, false);
            Report._KeyInfo.clickNarrativeSuggestions(testData.listValue, 1)
                .verifyTextBoxPropertyRightsAppraised(testData.verifyTaxValue)
                .renterTextBoxPropertyRightsAppraised(testData.enterValue)
                .clickNarrativeSuggestions(testData.listValue)
                .verifyTextBoxPropertyRightsAppraised(testData.verifyTaxValue)
                .clickSaveButton();
            cy.reload();
       

            cy.stepInfo(`3. Verify that the changes are saved`);
            Report._KeyInfo.verifyTextBoxPropertyRightsAppraised(testData.verifyTaxValue);
            Report._KeyInfo.verifyTextBoxDefinitionOfMarketValue(testData.verifyTaxValue);
        });

        it("[QA-4724]", () => {
            cy.stepInfo(`1. Proceed to the Report > Key Info page`);
            _NavigationSection.navigateToReportInformation();

            cy.stepInfo(`2. Fill in the editable fields with values and click on the Save & Continue button`);
            Report._KeyInfo.enterPropertyRightsAppraisedComment(testData.enterValue, true, false, false);
            Report._KeyInfo.clickNarrativeSuggestions(testData.listValue)
                .verifyTextBoxPropertyRightsAppraised(testData.verifyTaxValue);
            Report._KeyInfo.enterDefinitionMarketValue(testData.enterValue, true, false, false);
            Report._KeyInfo.clickNarrativeSuggestions(testData.listValue, 1)
                .verifyTextBoxPropertyRightsAppraised(testData.verifyTaxValue)
                .renterTextBoxPropertyRightsAppraised(testData.enterValue)
                .clickNarrativeSuggestions(testData.listValue)
                .verifyTextBoxPropertyRightsAppraised(testData.verifyTaxValue)
                .clickSaveContinueButton();

            cy.stepInfo(`3. Verify that the changes are saved and the user is redirected 
            to the next page (Report > Appraiser)`);
            Report._Appraiser.verifyPageOpened();
            cy.go("back");
            Report._KeyInfo.clickYesButton();
            Report._KeyInfo.verifyTextBoxPropertyRightsAppraised(testData.verifyTaxValue)
                .verifyTextBoxDefinitionOfMarketValue(testData.verifyTaxValue);
        });

        it("[QA-4725]", () => {
            cy.stepInfo(`1. Proceed to the Report > Key Info page`);
            _NavigationSection.navigateToReportInformation();

            cy.stepInfo(`2. Fill in the editable fields with values and do NOT click on the Save button`);
            Report._KeyInfo.enterPropertyRightsAppraisedComment(testData.enterValue, true, false, false);
            Report._KeyInfo.clickNarrativeSuggestions(testData.listValue)
                .verifyTextBoxPropertyRightsAppraised(testData.verifyTaxValue);
            Report._KeyInfo.enterDefinitionMarketValue(testData.enterValue, true, false, false);
            Report._KeyInfo.clickNarrativeSuggestions(testData.listValue, 1)
                .verifyTextBoxDefinitionOfMarketValue(testData.verifyTaxValue);

            cy.stepInfo(`3. Try to proceed on any other page and verify that the Unsaved changes modal is displayed`);
            _NavigationSection.clickPreviewEditButton()
                .clickLetterOfTransmittal()
                .verifyUnsavedChangesModal()
                .clickYesButton()
                .navigateToReportInformation();
            Report._KeyInfo.verifyTextBoxPropertyRightsAppraised(testData.verifyTaxValue)
                .verifyTextBoxDefinitionOfMarketValue(testData.verifyTaxValue);

            cy.stepInfo(`4. Try to proceed on any other page from the Key Info page and 
            verify that the Unsaved changes modal is displayed`);
            _NavigationSection.navigateToReportInformation();
            Report._KeyInfo.enterPropertyRightsAppraisedComment(testData.enterSecondValue, true, false, false);
            Report._KeyInfo.clickNarrativeSuggestions(testData.secondListValue)
                .verifyTextBoxPropertyRightsAppraised(testData.verifySecondTaxValue);
            Report._KeyInfo.enterDefinitionMarketValue(testData.enterSecondValue, true, false, false);
            Report._KeyInfo.clickNarrativeSuggestions(testData.secondListValue, 1)
                .verifyTextBoxDefinitionOfMarketValue(testData.verifySecondTaxValue);

            cy.stepInfo(`5 Verify that the changes are NOT saved on the Key Info page`);
            _NavigationSection.clickPreviewEditButton()
                .clickLetterOfTransmittal()
                .verifyUnsavedChangesModal()
                .clickNoButton();
            cy.go("back");
            Report._KeyInfo.verifyTextBoxPropertyRightsAppraised(testData.verifySecondTaxValue, "not.include.text")
                .verifyTextBoxDefinitionOfMarketValue(testData.verifySecondTaxValue, "not.include.text");
        });

        it("[QA-4726]", () => {
            cy.stepInfo(`1. Proceed to the Report > Key Info page`);
            _NavigationSection.navigateToReportInformation();
       
            cy.stepInfo(`2. Click on the Back button and verify the user is redirected 
            to another page (Settings & Export > Review and Export).`);
            Report._KeyInfo.clickBackButton()
                .clickYesButton();
            ReviewExport.verifyPageIsOpened();
        });
    });