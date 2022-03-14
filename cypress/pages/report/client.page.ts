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
}

export default new ClientPage();