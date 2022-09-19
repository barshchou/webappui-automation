import BasePage from "../base/base.page";

class CoverPage extends BasePage {

    getRequestedRow(name: string, index = 0) { return cy.get(`[data-qa='${name}']`).eq(index); }
}
export default new CoverPage();
