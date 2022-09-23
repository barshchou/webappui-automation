import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/key_info/QA-4721_24-26.fixture';
import { _ReportTitles } from "../../../../enums/pages_titles";
import routesUtils from "../../../../utils/routes.utils";
import subjectPropertyDataRouts from "../../../../utils/subject_property_data_routs.utils";

describe(`Verify the Save and Save & Continue button functionality on the Report > Key Info page:`,
    { tags:[ "@report", "@key_info" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("[QA-4721]", () => {
            cy.stepInfo(`1. Fill in the editable fields with values and click on the Save button then reload page`);
            Report._KeyInfo
                .enterFormCommentTextBox(testData.propertyRightsAppraisedTitle, testData.enterValue, false)
                .clickNarrativeSuggestions(testData.listValue)
                .verifyFormCommentTextBoxText(testData.propertyRightsAppraisedTitle, testData.verifyTaxValue)
                .enterFormCommentTextBox(testData.definitionOfMarketValueTitle, testData.enterValue, false)
                .clickNarrativeSuggestions(testData.listValue, 2)
                .verifyFormCommentTextBoxText(testData.definitionOfMarketValueTitle, testData.verifyTaxValue)
                .clearFormCommentTextBox(testData.propertyRightsAppraisedTitle)
                .enterFormCommentTextBox(testData.propertyRightsAppraisedTitle, testData.enterValue, false)
                .clickNarrativeSuggestions(testData.listValue)
                .verifyFormCommentTextBoxText(testData.propertyRightsAppraisedTitle, testData.verifyTaxValue);
            cy.wait(1000);
            Report._KeyInfo.clickSaveButton()
                .verifyProgressBarNotExist();
            cy.reload();
       
            cy.stepInfo(`2. Verify that the changes are saved`);
            Report._KeyInfo.verifyFormCommentTextBoxText(testData.propertyRightsAppraisedTitle, testData.verifyTaxValue)
                .verifyFormCommentTextBoxText(testData.definitionOfMarketValueTitle, testData.verifyTaxValue);
        });

        it("[QA-4724]", () => {
            cy.stepInfo(`1. Fill in the editable fields with values and click on the Save & Continue button`);
            Report._KeyInfo.enterFormCommentTextBox(testData.propertyRightsAppraisedTitle, testData.enterValue, false)
                .clickNarrativeSuggestions(testData.listValue)
                .verifyFormCommentTextBoxText(testData.propertyRightsAppraisedTitle, testData.verifyTaxValue)
                .enterFormCommentTextBox(testData.definitionOfMarketValueTitle, testData.enterValue, false)
                .clickNarrativeSuggestions(testData.listValue, 2)
                .verifyFormCommentTextBoxText(testData.propertyRightsAppraisedTitle, testData.verifyTaxValue)
                .clearFormCommentTextBox(testData.propertyRightsAppraisedTitle)
                .enterFormCommentTextBox(testData.propertyRightsAppraisedTitle, testData.enterValue, false)
                .clickNarrativeSuggestions(testData.listValue)
                .verifyFormCommentTextBoxText(testData.propertyRightsAppraisedTitle, testData.verifyTaxValue);
            cy.wait(1000);
            Report._KeyInfo.clickSaveContinueButton();

            cy.stepInfo(`2. Verify that the changes are saved and the user is redirected 
            to the next page (Report > Appraiser)`);
            Report._Appraiser.verifyPageOpened();
            _NavigationSection.goBackWithSave();
            Report._KeyInfo.verifyOpenedPage(_ReportTitles.KEY_INFO)
                .verifyFormCommentTextBoxText(testData.propertyRightsAppraisedTitle, testData.verifyTaxValue)
                .verifyFormCommentTextBoxText(testData.definitionOfMarketValueTitle, testData.verifyTaxValue);
        });

        it("[QA-4725]", () => {
            cy.stepInfo(`1. Fill in the editable fields with values and do NOT click on the Save button`);
            Report._KeyInfo.enterFormCommentTextBox(testData.propertyRightsAppraisedTitle, testData.enterValue, false)
                .clickNarrativeSuggestions(testData.listValue)
                .verifyFormCommentTextBoxText(testData.propertyRightsAppraisedTitle, testData.verifyTaxValue)
                .enterFormCommentTextBox(testData.definitionOfMarketValueTitle, testData.enterValue, false)
                .clickNarrativeSuggestions(testData.listValue, 2)
                .verifyFormCommentTextBoxText(testData.definitionOfMarketValueTitle, testData.verifyTaxValue);
            cy.wait(1000);

            cy.stepInfo(`2. Try to proceed on any other page and verify that the Unsaved changes modal is displayed`);
            _NavigationSection.clickPreviewEditButton()
                .clickLetterOfTransmittal()
                .verifyUnsavedChangesModal()
                .clickYesButton()
                .verifyProgressBarNotExist()
                .waitForUrl(routesUtils.letterOfTransmittal)
                .navigateToReportKeyInfo();
            Report._KeyInfo.verifyFormCommentTextBoxText(testData.propertyRightsAppraisedTitle, testData.verifyTaxValue)
                .verifyFormCommentTextBoxText(testData.definitionOfMarketValueTitle, testData.verifyTaxValue);

            cy.stepInfo(`3. Try to proceed on any other page from the Key Info page and 
            verify that the Unsaved changes modal is displayed`);
            Report._KeyInfo
                .clearFormCommentTextBox(testData.propertyRightsAppraisedTitle)
                .enterFormCommentTextBox(testData.propertyRightsAppraisedTitle, testData.enterSecondValue, false)
                .clickNarrativeSuggestions(testData.secondListValue)
                .verifyFormCommentTextBoxText(testData.propertyRightsAppraisedTitle, testData.verifySecondTaxValue)
                .clearFormCommentTextBox(testData.definitionOfMarketValueTitle)
                .enterFormCommentTextBox(testData.definitionOfMarketValueTitle, testData.enterSecondValue, false)
                .clickNarrativeSuggestions(testData.secondListValue, 2)
                .verifyFormCommentTextBoxText(testData.definitionOfMarketValueTitle, testData.verifySecondTaxValue);

            cy.stepInfo(`4 Verify that the changes are NOT saved on the Key Info page`);
            _NavigationSection.clickPreviewEditButton()
                .clickLetterOfTransmittal()
                .verifyUnsavedChangesModal()
                .clickNoButton();
            cy.go("back");
            Report._KeyInfo.verifyFormCommentTextBoxText(testData.propertyRightsAppraisedTitle,
                testData.verifySecondTaxValue, "not.contain.text")
                .verifyFormCommentTextBoxText(testData.definitionOfMarketValueTitle, testData.verifySecondTaxValue,
                    "not.contain.text");
        });

        // Test QA-4726 will be updated. 
        it("[QA-4726]", () => {
            cy.stepInfo(`1. Click on the Back button and verify the user is redirected 
            to another page (Subject Property Data).`);
            Report._KeyInfo.clickBackButton();
            _NavigationSection.submitSaveChangesModal()
                .waitForUrl(subjectPropertyDataRouts.subjectProperty);        
        });
    });
