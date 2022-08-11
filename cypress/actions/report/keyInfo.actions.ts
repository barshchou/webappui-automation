import keyInfoPage from "../../pages/report/keyInfo.page";
import { isDateHasCorrectFormat } from "../../../utils/date.utils";
import { getUploadFixture } from "../../../utils/fixtures.utils";
import BaseActionsExt from "../base/base.actions.ext";
import { numberWithCommas } from "../../../utils/numbers.utils";
import { BoweryReports } from "../../types/boweryReports.type";

class KeyInfoActions extends BaseActionsExt<typeof keyInfoPage> {
    //TODO edit this method, because (save === true) condition is not relevant anymore QA-6543
    enterPropertyRightsAppraisedComment(textToType: string = null, edit = true, save = true, revert = false) {
        if (edit === true) { keyInfoPage.propertyRightsAppraisedFormEditButton.click(); }
        keyInfoPage.textBoxPropertyRightsAppraised.scrollIntoView().invoke("text")
            .then(text => {
                keyInfoPage.textBoxPropertyRightsAppraised.focus().type(textToType ?? text);
            });
        if (save === true) { keyInfoPage.formSaveBtn().click(); }
        if (revert === true) {
            keyInfoPage.formRevertToOriginalBtn().click();
            keyInfoPage.formYesRevertBtn.click();
        }
        return keyInfoPage.textBoxPropertyRightsAppraised.invoke("text");
    }

    enterDefinitionMarketValue(textToType: string = null, edit = true, save = true, revert = false) {
        if (edit === true) { keyInfoPage.definitionOfMarketValueFormEditButton.click(); }
        keyInfoPage.textBoxDefinitionOfMarketValue().scrollIntoView().invoke("text").then(text => {
            keyInfoPage.textBoxDefinitionOfMarketValue().focus().type(textToType ?? text);
        });
        if (save === true) { keyInfoPage.formSaveBtn().click(); }
        if (revert === true) {
            keyInfoPage.formRevertToOriginalBtn().click();
            keyInfoPage.formYesRevertBtn.click();
        }
        return keyInfoPage.textBoxDefinitionOfMarketValue().invoke("text");
    }

    choosePurpose(purposeValue: string): KeyInfoActions {
        keyInfoPage.purposeDropdown.click();
        keyInfoPage.getPurposeOptionByValue(purposeValue).click();
        return this;
    }

    checkAsIsMarketInterestByValue(value: string): KeyInfoActions {
        keyInfoPage.asIsMarketInterests.check(value);
        return this;
    }

    checkAsCompleteInterestByValue(value: string): KeyInfoActions {
        keyInfoPage.asCompleteInterests.check(value);
        return this;
    }


    checkAsStabilizedInterestByValue(value: string): KeyInfoActions {
        keyInfoPage.asStabilizedInterests.check(value);
        return this;
    }

    checkAllInterestAppraisedByValues(interestAppraisedData: Readonly<{asIsMarket: string, 
    asComplete?: string, asStabilized?: string}>): KeyInfoActions {
        this.checkAsIsMarketInterestByValue(interestAppraisedData.asIsMarket);

        if (interestAppraisedData.asStabilized != undefined ) { 
            this.checkAsStabilizedInterestByValue(interestAppraisedData.asStabilized); 
        }

        if (interestAppraisedData.asComplete != undefined) {
            this.checkAsCompleteInterestByValue(interestAppraisedData.asComplete);
        }
        return this;
    }

    enterDateByType(date: BoweryReports.KeyInfoDateType, sameInspectionDate = true): KeyInfoActions { 
        if (!sameInspectionDate) {
            keyInfoPage.inputToCheckMyDateIsDifferent.click();
        }

        keyInfoPage.getDateInputByQA(date.type).clear();
        if (isDateHasCorrectFormat(date.date)) {
            keyInfoPage.getDateInputByQA(date.type).type(date.date).should("have.value", date.date);
        } else {
            keyInfoPage.errorMessage.should("exist");
        }
        return this;
    }

    uploadFile(fileName: string): KeyInfoActions {
        keyInfoPage.cloudButton.should("exist").click();
        keyInfoPage.clickHereText.should("be.visible");
        keyInfoPage.uploadFileInput.should("exist").attachFile(getUploadFixture(fileName));
        keyInfoPage.modalUploadButton.should("be.visible").click();
        keyInfoPage.insertButton.should("not.be.disabled").click();
        const fileNameSplit = fileName.split("/");
        const fileNameToCheck = fileNameSplit[fileNameSplit.length - 1];
        keyInfoPage.inputToCheckUpload.should("have.value", fileNameToCheck);
        return this;
    }

    verifyElementIsVisible(element:  Cypress.Chainable<JQuery<HTMLElement>>): KeyInfoActions {
        element.should("be.visible");
        return this;
    }

    clickNarrativeSuggestions(verifyListValue: string, numberLists = 0): KeyInfoActions {
        keyInfoPage.narrativeSuggestionsList.eq(numberLists)
            .contains(verifyListValue).should("have.text", verifyListValue).click({ force: true });
        return this;
    }

    renterTextBoxPropertyRightsAppraised(value: string) {
        keyInfoPage.textBoxPropertyRightsAppraised.focus().clear().type(value);
        return this;
    }

    verifyTextBoxPropertyRightsAppraised(value: string, condition = "include.text") {
        keyInfoPage.textBoxPropertyRightsAppraised.should(condition, value);
        return this;
    }
    
    verifyTextBoxDefinitionOfMarketValue(value: string, condition = "include.text") {
        keyInfoPage.textBoxDefinitionOfMarketValue().should(condition, value);
        return this;
    }

    verifyCommentaryContainsText(verifyAreaValue: string | number, commentaryTitle: string): KeyInfoActions {
        let expectedText = typeof verifyAreaValue ===  "number" 
            ? `${numberWithCommas(verifyAreaValue)}`
            : verifyAreaValue;
        this.Page.commentaryText(commentaryTitle).should("include.text", `${expectedText}`);
        return this;
    }
}

export default new KeyInfoActions(keyInfoPage);