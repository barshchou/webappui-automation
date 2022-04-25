export default class BasePage {
    open(url = "/") {
        cy.visit(url);
    }
    
    get Header(){
        return cy.xpath("//header");
    }

    get SaveAndContinueBtn(){
        return cy.get("[data-qa='form-submit-btn']");
    }

    get SaveBtn(){
        return cy.get("[data-qa='form-save-btn']");
    }

    get CloseIcon() {
        return cy.get("[aria-label=close]");
    }

    get formCancelBtn() {
        return cy.xpath("//*[contains(@role, 'dialog')]/descendant::*[contains(text(), 'Cancel')]");
    }

    get formYesRevertBtn() {
        return cy.xpath("//*[contains(@role, 'dialog')]/descendant::*[contains(text(), 'Yes, revert')]");
    }

    formEditBtn(index?: number){
        return cy.xpath('//*[@data-icon="pencil"]//ancestor::button')
        .eq((index !== 0) ? index : 0);
    }

    formSaveBtn(index?: number) {
        return cy.xpath("//button[.='Save']")
        .eq((index !== 0) ? index : 0);
    }

    formRevertToOriginalBtn(index?: number) {
        return cy.xpath("//button[.='Revert to Original']")
        .eq((index !== 0) ? index : 0);
    }

    formCancelButton(index?: number) {
        return cy.xpath("//button[.='Cancel']")
            .eq((index !== 0) ? index : 0);
    }
}