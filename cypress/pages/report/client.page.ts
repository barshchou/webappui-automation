import BasePage from "../base/base.page";

class ClientPage extends BasePage {
    get clientTitle() { return cy.get("[data-qa=client]"); }

    get warningMessage() { return cy.xpath("//*[contains(@data-qa, 'callout-btn')]/parent::*"); }

    getClientNameField(index = 0) { return cy.get("*[name=client]").eq(index); }

    getClientFileNumberField(index = 0) { return cy.get(`[name='reportClients[${index}].clientFileNumber']`); }

    getNYCBApplicationNumber(index = 0) { return cy.get(`[name='reportClients[${index}].applicationNumber']`); }

    get addClientButton() { return cy.xpath("//a[.='Add']"); }

    get appraiserCommentary() { return cy.get("[name='clientGuidelinesDiscussion.additionalCommentary']"); }

    get guidelinesTooltip() {
        return cy.get("[aria-label='The following generated commentary will appear in the Letter " +
        "of Transmittal of your report.'] svg"); 
    }

    get toCheckTooltipExist() { return cy.get("[role=tooltip]"); }

    get clientGuidelinesCommentary() { return cy.get("[data-qa^='clientGuidelinesDiscussion.commentary']"); }

    get guidelinesCommentaryEditButton() { return cy.get("[data-qa=generated-commentary-edit-btn]"); }

    get guidelinesCommentaryInput() { return cy.get("[name='clientGuidelinesDiscussion.commentary']"); }

    get revertToGeneratedButton() { return cy.get("[data-qa=generated-commentary-revert-btn]"); }

    get intendedUserTextBox() {
        return cy.xpath("//*[.='Intended User']//following::*[@data-slate-editor][1]");
    }

    get identificationOfClientTextBox() {
        return cy.xpath("//*[.='Identification of the Client']//following::*[@data-slate-editor][1]");
    }
    
    get narrativeSuggestionsList() { return cy.get("[data-qa='narrative-suggestions-list'] > ul"); }

    chipModified(index?: number) { return cy.get('[ui="indicator"]').eq((index !== 0) ? index : 0); }

    get addNewClient() { return cy.xpath("//*[@data-qa='callout-btn']"); }

    commentaryText(commentaryTitle: string) { 
        return cy.xpath(`//h6[.='${commentaryTitle}']//following::div[@data-slate-editor][1]`); 
    }

    get addAdditionalClientBtn() { return cy.contains("Add additional client"); } 

    get maxClientMessage() { return cy.contains("Max of four clients allowed"); }

    get undoBtn() { return cy.contains("Undo"); }

    getClientListItem(name: string) { return cy.get(`[data-value='${name}']`); }

}

export default new ClientPage();