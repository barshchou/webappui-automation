export default class BasePage {
    open(url = "/") {
        cy.visit(url);
    }

    get Header() {
        return cy.xpath("//header");
    }

    get pageTitle() {
        return cy.get("h5");
    }

    get SaveAndContinueBtn() {
        return cy.get("[data-qa='form-submit-btn']");
    }

    get SaveBtn() {
        return cy.get("[data-qa='form-save-btn']");
    }

    get CloseIcon() {
        return cy.get("[aria-label=close]");
    }

    /**
     * Same as `CloseIcon` but inside shadow-dom
     */
    get CloseIconShadowDom() {
        return cy.get('[aria-label="Close"]');
    }

    get formYesRevertBtn() {
        return cy.xpath("//*[contains(@role, 'dialog')]/descendant::*[contains(text(), 'Yes, revert')]");
    }

    get tooltip() {
        return cy.get("[role=tooltip]");
    }

    get modalWindow() { return cy.get("[role='dialog']"); }

    get selectorDraggableElement() {
        return '[data-react-beautiful-dnd-drag-handle="0"]';
    } 

    get saveButtonGlobal() { return cy.xpath("//button[@type='submit']"); }

    get successModal() { return cy.xpath("//*[contains(text(), 'Success')]"); }

    formEditBtn(index = 0) {
        return cy.xpath('//*[@data-icon="pencil"]//ancestor::button')
            .eq((index !== 0) ? index : 0);
    }

    formSaveBtn(index = 0) {
        return cy.xpath("//button[.='Save']")
            .eq((index !== 0) ? index : 0);
    }

    formRevertToOriginalBtn(index = 0) {
        return cy.xpath("//button[.='Revert to Original']")
            .eq((index !== 0) ? index : 0);
    }

    formCancelButton(index = 0) {
        return cy.xpath("//button[.='Cancel']")
            .eq((index !== 0) ? index : 0);
    }

    formAddButton(index = 0) {
        return cy.xpath("//button[.='Add']")
            .eq((index !== 0) ? index : 0);
    }

    modifiedLabel(isExist = true, index = 0) {
        if (isExist) {
            return cy.xpath("//span[contains(text(), 'Modified')]").eq((index !== 0) ? index : 0);
        } else {
            return cy.xpath("//span[contains(text(), 'Modified')]");
        }
    }

    getSelectChipsWrapper(index = 0) { return cy.get("[data-qa='chips-wrapper']").eq(index); }
    
    formCommentTextBox(name: string) {
        return cy.xpath(`//*[.='${name}']//following::*[@data-slate-editor][1]`);
    }
}