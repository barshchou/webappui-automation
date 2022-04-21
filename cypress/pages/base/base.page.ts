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
}