import BasePage from "../base/base.page";

class ClientPage extends BasePage{
    get clientNameField() {return cy.get("*[name=client]");}

    get clientFileNumberField() {return cy.get('[name="clientFileNumber"]');}

    get addClientButton() {return cy.xpath("//a[.='Add']");}

    get appraiserCommentary() {return cy.get("[name='clientGuidelinesDiscussion.additionalCommentary']");}

    get guidelinesTooltip() {return cy.get("[aria-label='The following generated commentary will appear in the Letter " +
        "of Transmittal of your report.'] svg");}

    get toCheckTooltipExist() {return cy.get("[role=tooltip]");}

    get clientGuidelinesCommentary() {return cy.get("[data-qa^='clientGuidelinesDiscussion.commentary']");}

    get guidelinesCommentaryEditButton() {return cy.get("[data-qa=generated-commentary-edit-btn]");}

    get guidelinesCommentaryInput() {return cy.get("[name='clientGuidelinesDiscussion.commentary']");}

    get revertToGeneratedButton() {return cy.get("[data-qa=generated-commentary-revert-btn]");}

    get IntendedUserTextBox(){
        return cy.xpath("//*[contains(text(), 'Intended User')]//ancestor::*//child::*[@data-slate-editor]");
    }
//*[contains(text(), 'Intended User')]//ancestor::*[contains(@class, 'css-106uh04')]//child::*[@data-slate-editor]
    get IdentificationOfClientTextBox(){
        return cy.xpath("//*[contains(text(), 'Identification of the Client')]//ancestor::*//child::*[@data-slate-editor]");
    }
    
    get narrativeSuggestionsList() {return cy.get("[data-qa='narrative-suggestions-list'] > ul");}

}

export default new ClientPage();