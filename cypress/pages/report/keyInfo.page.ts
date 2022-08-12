import BasePage from "../base/base.page";

class KeyInfoPage extends BasePage {
    get keyInfoTitle() { return cy.get("*[data-qa='keyInfo']"); }

    get purposeDropdown() { return cy.get("*[data-qa='intendedUse-form-control'] [role='button']"); }

    getPurposeOptionByValue(value: string) { return cy.get(`li[role='option'][data-value='${value}']`); }

    get asIsMarketInterestsGroup() { return cy.get("*[data-qa='interestAppraisedAsIsMarketValue-radio-group']"); }

    get asCompleteInterestsGroup() { return cy.get("*[data-qa='interestAppraisedAsComplete-radio-group']"); }

    get asStabilizedInterestsGroup() { return cy.get("*[data-qa='interestAppraisedAsStabilized-radio-group']"); }

    get asIsMarketInterests() { return cy.get("*[name='interestAppraisedAsIsMarketValue']"); }

    get asCompleteInterests() { return cy.get("*[name='interestAppraisedAsComplete']"); }

    get asStabilizedInterests() { return cy.get("*[name='interestAppraisedAsStabilized']"); }

    getDateInputByQA(dateType: string) { 
        return cy.get(`*[data-qa='${dateType}-date-picker'] input[placeholder='MM-DD-YYYY']`); 
    }

    get errorMessage() { return cy.get("#component-error-text"); }

    get uploadFileInput() { return cy.get("*[data-qa='dropzone-container'] input"); }

    get uploadButton() { return cy.get("[data-qa=upload-btn]"); }

    get insertButton() { return cy.get("*[data-qa='insert-btn']"); }

    get inputToCheckUpload() { return cy.get("*[data-qa='file-selection-letterOfEngagement-input'] input"); }

    get cloudButton() { return cy.get("*[data-qa='file-selection-letterOfEngagement-input'] svg"); }

    get clickHereText() { return cy.contains("Click here or drag file to upload"); }

    get modalUploadButton() { return cy.get("*[data-qa='upload-btn']"); }

    get textBoxPropertyRightsAppraised() {
        return cy.xpath("//*[contains(text(), 'Property Rights Appraised')]//following::*[@data-slate-editor][1]");
    }

    get wrapperLetterOfTransmittalPurpose() { 
        return cy.get("*[data-qa='letterOfTransmittalPurpose-generated-comment-wrapper']"); 
    }

    get jobNumberTextInput() { return cy.get("*[data-qa='job-number-text-input'] input"); }

    get wrapperDefinitionOfMarketValue() { return cy.get("*[data-qa='definition-of-market-value-tile']"); }
    
    textBoxDefinitionOfMarketValue(index = 1) { 
        return cy.xpath(`//*[contains(@data-qa, 'definition-of-market-value-tile')]` + 
        `//following::*[@data-slate-editor][${index}]`); 
    }

    get tooltipDefinitionOfMarketValue() { return cy.get("*[role='tooltip']"); }

    get uploadFilesButton() { return cy.xpath("//button[text() = 'Upload Files']"); }

    get narrativeSuggestionsList() { return cy.get("[data-qa='narrative-suggestions-list'] > ul"); }

    iconDefinitionOfMarketValue(index = 1) { 
        return cy.xpath(`//*[contains(@data-qa, 'definition-of-market-value-tile')]` + 
        `//following::*[@data-icon='info-circle'][${index}]`); 
    }

    get inputToCheckMyDateIsDifferent() { return cy.get("*[data-qa='isDifferentDateOfValuation']"); }

    get propertyRightsAppraisedFormEditButton() { 
        return cy.xpath("//h6[.='Property Rights Appraised']//following::button[1]"); 
    }

    get definitionOfMarketValueFormEditButton() { 
        return cy.xpath("//h6[.='Definition of Market Value']//following::button[1]"); 
    }
    
    commentaryText(commentaryTitle: string) { 
        return cy.xpath(`//h6[.='${commentaryTitle}']//following::div[@data-slate-editor][1]`); 
    }

    userPrompt () {
        return cy.xpath(`//span[.='Type = to quick select report data.']`);
    }
}

export default new KeyInfoPage();
