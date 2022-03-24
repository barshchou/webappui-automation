import BasePage from "../base/base.page";

class ClientPage extends BasePage{
    get clientNameField() {return cy.get("*[name=client]");}
    get clientFileNumberField() {return cy.get('[name="clientFileNumber"]');}
    get addClientButton() {return cy.xpath("//a[.='Add']");}
    get appraiserCommentary() {return cy.get("[name='clientGuidelinesDiscussion.additionalCommentary']");}
    get guidelinesTooltip() {return cy.get("[title='The following generated commentary will appear in the Letter " +
        "of Transmittal of your report.'] svg");}
    get clientGuidelinesCommentary() {return cy.get("[data-qa^='clientGuidelinesDiscussion.commentary']");}
    get guidelinesCommentaryEditButton() {return cy.get("[data-qa=generated-commentary-edit-btn]");}
    get guidelinesCommentaryInput() {return cy.get("[name='clientGuidelinesDiscussion.commentary']");}
    get revertToGeneratedButton() {return cy.get("[data-qa=generated-commentary-revert-btn]");}
    get EditIntendedUserBtn(){ 
        return cy.xpath('//*[contains(text(),"Edit")]').eq(0);
    }
    get EditIdentificationOfClientBtn(){
        return cy.xpath('//*[contains(text(),"Edit")]').eq(0);
    } 
    get IntendedUserTextBox(){
        return cy.get('[data-slate-editor="true"]').eq(0);
    }
    get IdentificationOfClientTextBox(){
        return cy.get('[data-slate-editor="true"]').eq(1);
    } 
}

export default new ClientPage();