import BasePage from "../base/base.page";

class KeyInfoPage extends BasePage{
    get purposeDropdown() {return cy.get("*[data-qa='intendedUse-form-control'] [role='button']");}

    getPurposeOptionByValue(value) {return cy.get(`li[role='option'][data-value='${value}']`);}

    get asIsMarketInterests() {return cy.get("*[name='interestAppraisedAsIsMarketValue']");}

    get asCompleteInterests() {return cy.get("*[name='interestAppraisedAsComplete']");}

    get asStabilizedInterests() {return cy.get("*[name='interestAppraisedAsStabilized']");}

    getDateInputByQA(dateType) {return cy.get(`*[data-qa='${dateType}-date-picker'] input[placeholder='MM-DD-YYYY']`);}

    get errorMessage() {return cy.get("#component-error-text");}

    get uploadFileInput() {return cy.get("*[data-qa='dropzone-container'] input");}

    get uploadButton() {return cy.get("*[data-qa='upload-btn']");}

    get insertButton() {return cy.get("*[data-qa='insert-btn']");}

    get inputToCheckUpload() {return cy.get("*[data-qa='file-selection-letterOfEngagement-input'] input");}

    get cloudButton() {return cy.get("*[data-qa='file-selection-letterOfEngagement-input'] svg");}

    get clickHereText() {return cy.contains("Click here or drag file to upload");}

    get textBoxPropertyRightsAppraised() {
        return cy.xpath('//*[@data-qa="letterOfTransmittalPurpose-generated-comment-wrapper"]/preceding-sibling::div//p');
    }

    get textBoxDefinitionOfMarketValue() {return cy.xpath("//*[contains(@data-qa, 'definition-of-market-value-tile')]//following::*[@data-slate-editor][1]");}

    get tooltipDefinitionOfMarketValue() {return cy.get("*[role='tooltip']");}

    get test() {return cy.xpath("//*[@id='mui-184']");}

    get iconDefinitionOfMarketValue() {return cy.xpath("//*[contains(@data-qa, 'definition-of-market-value-tile')]//following::*[@data-icon='info-circle'][1]");}

}

export default new KeyInfoPage();