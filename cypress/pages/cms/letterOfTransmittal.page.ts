import BasePage from "../base/base.page";

class LetterOfTransmittalPage extends BasePage {
    get complianceParagraphDiscussion() { 
        return cy.xpath("//h6[.='Compliance Paragraph']//following::div[@data-slate-editor][1]"); 
    }

    get complianceParagraphModifiedLabel() { 
        return cy.xpath("//h6[.='Compliance Paragraph']/following::*[@ui='indicator'][1]"); 
    }

    get saveButtonGlobal() { return cy.xpath("//button[@type='submit']"); }

    get successModal() { return cy.xpath("//*[contains(text(), 'Success')]"); }
}

export default new LetterOfTransmittalPage();