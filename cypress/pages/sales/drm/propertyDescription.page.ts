export default class PropertyDescriptionForm {
    get internalNotesTextArea() {return cy.xpath("//*[text()='Internal Notes']//following::*[@class='ant-input'][1]");}

    get appraiserCommentaryTextArea() {return cy.xpath("//*[text()='Appraiser Commentary']//following::*[contains(@class, 'ant-input')][1]");}

    get newCompSaveAndCloseButton() {return cy.xpath("//button[.='Save & Close']");}
}