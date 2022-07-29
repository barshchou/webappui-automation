import BasePage from "../base/base.page";

class ScopePage extends BasePage {
    get itemsTextAreas() { return cy.get("[name^=items]"); }
}

export default new ScopePage();