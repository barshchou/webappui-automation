import BasePage from "../base/base.page";

class ClientPage extends BasePage {
    get clientTitle() { return cy.get("[data-qa=client]"); }

    get alertMessage() { return cy.get("[role='alert']"); }

    get warningAddBtn() { return cy.xpath("//*[contains(@data-qa, 'callout-btn')]"); }

    getClientNameField(index = 0) { 
        return cy.get('[placeholder="Search Clients"]').eq(index); 
    }

    getClientFileNumberField(index = 0) { return cy.get(`[name='reportClients[${index}].clientFileNumber']`); }

    getNYCBApplicationNumber(index = 0) { return cy.get(`[name='reportClients[${index}].applicationNumber']`); }

    get appraiserCommentary() { return cy.get("[name='clientGuidelinesDiscussion.additionalCommentary']"); }

    // TODO: [QA-6858] Add data-qa attribute for tooltip
    get guidelinesTooltip() {
        return cy.xpath(`//*[h6[.='Client Guidelines Discussion']]//following::` + 
        `span[.='The following generated commentary will appear in the Letter of Transmittal of your report.'][1]`); 
    }

    get guidelinesCommentaryEditButton() { return cy.get("[data-qa=generated-commentary-edit-btn]"); }

    get guidelinesCommentaryInput() { return cy.get("[name='clientGuidelinesDiscussion.commentary']"); }

    get revertToGeneratedButton() { return cy.get("[data-qa=generated-commentary-revert-btn]"); }
    
    get narrativeSuggestionsList() { return cy.get("[data-qa='narrative-suggestions-list'] > ul"); }

    chipModified(index?: number) { return cy.get('[ui="indicator"]').eq((index !== 0) ? index : 0); }

    get addNewClient() { return cy.xpath("//*[@data-qa='callout-btn']"); }

    get addAdditionalClientBtn() { return cy.get('[data-qa="addAdditionalClientBtn"]'); } 

    get maxClientMessage() { return cy.contains("Max of four clients allowed"); }

    get undoBtn() { return cy.contains("Undo"); }

    getClientListItem(name: string) { return cy.get(`[data-value='${name}']`); }

}

export default new ClientPage();